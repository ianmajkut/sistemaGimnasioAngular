import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogin!: FormGroup
  datosCorrectos: boolean = true
  textoError: string = ""
  constructor(private formBuilder: FormBuilder, public auth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin = this.formBuilder.group({
      email: ["", Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ["", Validators.required],

    })
  }

  ingresar()
  { 
    
    if(this.formularioLogin.valid){
      this.datosCorrectos = true
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password)
      .then((usuario)=>{
      //console.log(usuario)
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
      }
      )
      .catch((error)=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.datosCorrectos = false
          this.textoError = error.message
        }, 2000);
        
        
      })
    }else{
      this.datosCorrectos = false
      this.textoError = "Revisa que los datos estén correctos"
    }
    
  }

  ingresarGoogle(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((usuario)=>{
      //console.log(usuario)
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
      }
      )
      .catch((error)=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          
          this.textoError = error.message
        }, 2000);
      })
      
  }

}
