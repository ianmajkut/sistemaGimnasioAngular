import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesServiceService } from '../services/mensajes-service.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {
  formularioPrecio!: FormGroup
  precios: any[] = new Array<any>()
  constructor(private fb: FormBuilder, private db : AngularFirestore, private msg: MensajesServiceService) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ["", Validators.required],
      costo: ["", Validators.required],
      duracion: ["", Validators.required],
      tipoDuracion: ["", Validators.required]
    })
    this.db.collection("precios").get().subscribe((resultado)=>{
      resultado.docs.forEach((dato)=>{
        let precio : any = dato.data()
        precio.id = dato.id
        precio.ref = dato.ref
        this.precios.push(precio)
      })
    })
  }

  agregar(){
    this.db.collection("precios").add(this.formularioPrecio.value).then(()=>{
      this.msg.mensajeCorrecto("Se agregó correctamente el precio")
      this.formularioPrecio.reset()
    }).catch(()=>this.msg.mensajeError("Error","Error al agregar el precio"))
  }

}
