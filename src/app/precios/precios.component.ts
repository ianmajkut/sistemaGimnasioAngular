import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '../models/precio';
import { MensajesServiceService } from '../services/mensajes-service.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {
  formularioPrecio!: FormGroup
  precios: Precio[] = new Array<Precio>()
  esEditar: boolean = false
  id: string = ''
  constructor(private fb: FormBuilder, private db : AngularFirestore, private msg: MensajesServiceService) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ["", Validators.required],
      costo: ["", Validators.required],
      duracion: ["", Validators.required],
      tipoDuracion: ["", Validators.required]
    })
    this.mostrarPrecio()
    
  }

  mostrarPrecio(){
    this.db.collection<Precio>("precios").get().subscribe((resultado)=>{
      this.precios.length = 0
      resultado.docs.forEach((dato)=>{
        let precio = dato.data() as Precio
        precio.id = dato.id
        precio.ref = dato.ref
        this.precios.push(precio)
      })
    })
  }

  agregar(){
    this.db.collection<Precio>("precios").add(this.formularioPrecio.value).then(()=>{
      this.msg.mensajeCorrecto("Se agregó correctamente el precio")
      this.formularioPrecio.reset()
      this.mostrarPrecio()
    }).catch(()=>this.msg.mensajeError("Error","Error al agregar el precio"))
  }

  editarPrecio(precio: Precio){
    this.esEditar = true
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion,

    })
    this.id = precio.id
  }

  editar(){
    this.db.doc("precios/" + this.id).update(this.formularioPrecio.value).then(()=>{
      this.msg.mensajeCorrecto("Precio editado correctamente")
      this.formularioPrecio.reset()
      this.esEditar = false
      this.mostrarPrecio()
    }).catch(()=>{
      this.msg.mensajeError("Error","Error al editar el precio")
    })
  }

  cancelar(){
    this.esEditar = false
    this.formularioPrecio.reset()
  }

}
