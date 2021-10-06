import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente!: FormGroup
  porcentajeSubida: number = 0
  constructor( private fb: FormBuilder, private storage: AngularFireStorage) { }

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

  subirImagen(event: any){
    let nombre = new Date().getTime().toString()
    const file = event.target.files[0];
    let extension = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
    const filePath = 'clientes/' + nombre + extension;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.then((objeto)=>{
      console.log('imagen subida')
      ref.getDownloadURL().subscribe((url)=>{
        console.log(url)
      })
    })
    task.percentageChanges().subscribe((porcentaje)=>{
      this.porcentajeSubida = porcentaje as number
    })
    
  }

}
