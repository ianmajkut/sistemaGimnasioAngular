import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { empty } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion= new Inscripcion() 
  clienteSeleccionado : Cliente = new Cliente()
  precios: Precio[] = new Array<Precio>()
  precioSeleccionado: Precio | undefined = new Precio()
  constructor(private db : AngularFirestore) { }

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
    console.log(this.inscripcion)
  }

  seleccionarPrecio(event : any){
    let valorEvento : string = event.target.value
    this.precioSeleccionado = this.precios.find((x)=> x.id == valorEvento)
    this.inscripcion.precios = this.precioSeleccionado?.ref as DocumentReference<any> 
    //console.log(this.precioSeleccionado)
  }

}
