import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  clientes: any = new Array<any>()

  constructor(  db: AngularFirestore) { 
    
    this.clientes = db.collection("clientes").valueChanges().subscribe((resultado) => this.clientes = resultado )
  }

  ngOnInit(): void {

  }

}
