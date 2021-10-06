import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente!: FormGroup
  porcentajeSubida: number = 0
  urlImagen: string = ""
  constructor( private fb: FormBuilder, private storage: AngularFireStorage, private db : AngularFirestore) { }

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
      imgUrl: ["", Validators.required],
    })
  }

  agregar(){
    this.formularioCliente.value.imgUrl = this.urlImagen
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    //console.log(this.formularioCliente.value)
    this.db.collection("clientes").add(this.formularioCliente.value).then((finalizo)=>{
      console.log("Registro Creado")
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
