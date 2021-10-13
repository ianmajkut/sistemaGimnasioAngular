import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { MensajesServiceService } from '../services/mensajes-service.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente!: FormGroup
  porcentajeSubida: number = 0
  urlImagen: string = ""
  esEditable : boolean = false
  id! : string
  constructor( private fb: FormBuilder, private storage: AngularFireStorage, private db : AngularFirestore, private activeRoute: ActivatedRoute, private msg: MensajesServiceService) { }

  ngOnInit(): void {
    
    this.formularioCliente = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      correo: ["", Validators.compose([
        Validators.required, Validators.email
      ])],
      dni: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
      telefono: ["", Validators.required],
      imgUrl: [""],
    })

    this.id = this.activeRoute.snapshot.params.clienteID
    if(this.id != undefined){
      this.esEditable = true
      this.db.doc<any>('clientes/'+ this.id).valueChanges().subscribe((clientes)=>{
        //console.log(clientes)
        this.formularioCliente.setValue({
        nombre: clientes.nombre ,
        apellido: clientes.apellido ,
        correo: clientes.correo ,
        dni: clientes.dni ,
        fechaNacimiento: new Date(clientes.fechaNacimiento.seconds * 1000).toISOString().substr(0, 10),
        telefono: clientes.telefono ,
        imgUrl: "" ,
        })
        this.urlImagen = clientes.imgUrl
      })
    }

  }

  agregar(){
    this.formularioCliente.value.imgUrl = this.urlImagen
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    //console.log(this.formularioCliente.value)
    this.db.collection("clientes").add(this.formularioCliente.value).then((finalizo)=>{
      this.msg.mensajeCorrecto("Cliente agregado correctamente")
    })
  }
  
  editar(){
    this.formularioCliente.value.imgUrl = this.urlImagen
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    this.db.doc('clientes/'+ this.id).update(this.formularioCliente.value).then((resultado) =>{
      this.msg.mensajeCorrecto("Cliente editado correctamente")
    }).catch((err) => {
      this.msg.mensajeError("Error", "Ocurrió un error al editar el usuario")
    })
  }

  subirImagen(event: any){

    if(event.target.files.length>0){

      let nombre = new Date().getTime().toString()
      const file = event.target.files[0];
      let extension = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
      const filePath = 'clientes/' + nombre + extension;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.then((objeto)=>{
        console.log('imagen subida')
        ref.getDownloadURL().subscribe((url)=>{
          this.urlImagen = url
        }) 
      })
      task.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeSubida = porcentaje as number
      })

    }

  }

}
