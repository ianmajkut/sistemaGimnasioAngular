import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  clientes: any = new Array<any>()
  
  constructor( db: AngularFirestore) { 
    
    this.clientes.length = 0
    
    db.collection("clientes").get().subscribe((resultado) => {
      for(let item of resultado.docs){
        
        let cliente: any = item.data()
        cliente.id = item.id
        cliente.ref = item.ref
        this.clientes.push(cliente)
      } 
      }
    )
  }
  

  ngOnInit() {
  
  }

}
