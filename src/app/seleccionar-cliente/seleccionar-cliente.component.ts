import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.css']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>()
  constructor(private db : AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('clientes').get().subscribe((resultado)=>{
      this.clientes.length = 0
      resultado.docs.forEach((item)=>{
        let cliente: any = item.data()
        cliente.id = item.id
        cliente.ref = item.ref
        this.clientes.push(cliente)
      })
      console.log(this.clientes)
    })
  }

}