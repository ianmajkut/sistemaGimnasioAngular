import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { empty } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion= new Inscripcion() 
  clienteSeleccionado : Cliente = new Cliente()
  constructor() { }

  ngOnInit(): void {
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
    console.log(this.inscripcion)
  }

}
