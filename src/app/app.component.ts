import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mastergym';
  usuario!: firebase.User|null; 
  cargando: boolean = true;
  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe((usuario)=>{
      setTimeout(() => {
        this.cargando = false;
        this.usuario = usuario;}, 2000)
    })
  }
  
  
}
