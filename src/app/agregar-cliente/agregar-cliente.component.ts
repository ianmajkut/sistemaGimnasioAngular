import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente!: FormGroup
  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      correo: ["", Validators.compose([
        Validators.required, Validators.email
      ])],
      dni: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
      telefono: ["", Validators.required],
      imgUrl: ["", Validators.required],
    })
  }

  agregar(){
    console.log(this.formularioCliente.value)
  }

}
