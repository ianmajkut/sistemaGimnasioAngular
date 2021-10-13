import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { empty } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Precio } from '../models/precio';
import { MensajesServiceService } from '../services/mensajes-service.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion= new Inscripcion() 
  clienteSeleccionado : Cliente = new Cliente()
  idPrecio: string = ""
  precios: Precio[] = new Array<Precio>()
  precioSeleccionado: Precio | undefined = new Precio()
  constructor(private db : AngularFirestore, private msg: MensajesServiceService) { }

  ngOnInit(): void {
    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let precio : any = item.data() as Precio
        precio.id = item.id
        precio.ref = item.ref
        this.precios.push(precio)
      })
    })
  }

  asignarCliente(cliente: Cliente){
    this.inscripcion.cliente = cliente.ref
    this.clienteSeleccionado = cliente
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Cliente()
    this.inscripcion.cliente  = undefined as unknown as DocumentReference<any> 
    /* Aparecía este error "Conversion of type 'undefined' to type 'DocumentReference<any>' may be a mistake 
    because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first."
    y para poder definirlo como undefiend habia que definirlo como unknown y despues como DocumentReference<any> 
    */
  }

  guardar(){
    //console.log(this.inscripcion) 
    if(this.inscripcion.validar().esValido){
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha, 
        fechaFinal: this.inscripcion.fechaFinal,
        precios: this.inscripcion.precios,
        cliente: this.inscripcion.cliente,
        subtotal: this.inscripcion.subtotal,
        impuesto: this.inscripcion.impuesto,
        total: this.inscripcion.total,
      }
      this.db.collection('inscripciones').add(inscripcionAgregar).then((resultado)=>{
        this.inscripcion = new Inscripcion()
        this.clienteSeleccionado = new Cliente()
        this.precioSeleccionado = new Precio()
        this.idPrecio = ""
        //console.log("Guardando..")
        this.msg.mensajeCorrecto("Inscripción guardada correctamente")
      })
    }
    else{
      //console.log(this.inscripcion.validar().mensaje)
      this.msg.mensajeAdvertencia("Advertencia",this.inscripcion.validar().mensaje)
    }
  }

  seleccionarPrecio(event : any){

    let valorEvento : string = event.target.value

    if(valorEvento != "null"){
      
      this.precioSeleccionado = this.precios.find((x)=> x.id == valorEvento)
      this.inscripcion.precios = this.precioSeleccionado?.ref as DocumentReference<any> 

      this.inscripcion.subtotal = this.precioSeleccionado?.costo as number
      this.inscripcion.impuesto = this.inscripcion.subtotal * 0.21 // Porcentaje IVA en caso de Argentina
      this.inscripcion.total = this.inscripcion.impuesto + this.inscripcion.subtotal
      //console.log(this.precioSeleccionado)
      this.inscripcion.fecha = new Date()
      /*
        1: Dia, 2: Semana, 3: Quincena, 4: Mes, 5: Año
      */
      if(this.precioSeleccionado?.tipoDuracion == 1){
        
        let dias: number = this.precioSeleccionado.duracion 
        let fechaFinal = 
        new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias )
        this.inscripcion.fechaFinal = fechaFinal
        
      }
      if(this.precioSeleccionado?.tipoDuracion == 2){
        
        let dias: number = this.precioSeleccionado.duracion * 7
        let fechaFinal = 
        new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias )
        this.inscripcion.fechaFinal = fechaFinal
        
      }
      if(this.precioSeleccionado?.tipoDuracion == 3){
        
        let dias: number = this.precioSeleccionado.duracion * 15
        let fechaFinal = 
        new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias )
        this.inscripcion.fechaFinal = fechaFinal
        
      }
      if(this.precioSeleccionado?.tipoDuracion == 4){
        let meses = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth()
        let anio: number = this.inscripcion.fecha.getFullYear()
        let dia: number = this.inscripcion.fecha.getDate()
        let fechaFinal = 
        new Date(anio, meses, dia)
        this.inscripcion.fechaFinal = fechaFinal
        
      }
      if(this.precioSeleccionado?.tipoDuracion == 5){
        
        let meses = this.inscripcion.fecha.getMonth()
        let anio: number = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion
        let dia: number = this.inscripcion.fecha.getDate()
        let fechaFinal = 
        new Date(anio, meses, dia)
        this.inscripcion.fechaFinal = fechaFinal
        
      }

    }else{

      this.precioSeleccionado = new Precio()
      this.inscripcion.fecha = null as unknown as Date
      this.inscripcion.fechaFinal = null as unknown as Date
      this.inscripcion.precios = null as unknown as DocumentReference<any> 
      this.inscripcion.subtotal = 0
      this.inscripcion.impuesto = 0
      this.inscripcion.total = 0


    }

  }

}
