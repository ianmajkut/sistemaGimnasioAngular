import { Component, EventEmitter, Input, OnInit , Output} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.css']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>()
  @Input('nombre') nombre! : string | undefined//Input así se lo podemos pasar como parametro a la inscripción
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter()
  @Output('canceloCliente') canceloCliente = new EventEmitter()
  constructor(private db : AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('clientes').get().subscribe((resultado)=>{
      this.clientes.length = 0
      resultado.docs.forEach((item)=>{
        let cliente: any = item.data()
        cliente.id = item.id
        cliente.ref = item.ref
        cliente.visible = false
        this.clientes.push(cliente)
      })
      //console.log(this.clientes)
    })
  }

  buscarCliente( event: any){
    let nombre: string = event.target.value
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(nombre.toLowerCase()))
      {
        cliente.visible = true
      }
      else{
        cliente.visible = false
      }
    })
  }

  seleccionarCliente(cliente: Cliente){
    this.nombre = cliente.nombre + '' + cliente.apellido
    this.clientes.forEach((cliente) => {
      cliente.visible = false
    });
    this.seleccionoCliente.emit(cliente)
  }

  cancelarCliente(){
    this.nombre = undefined 
    this.canceloCliente.emit()
  }


}
