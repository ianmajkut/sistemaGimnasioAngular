import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesServiceService {

  constructor() { }

  mensajeError(titulo: string, mensaje: string){
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    })
  }

  mensajeCorrecto(titulo: string){
    Swal.fire({
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 2000
    })
  }

  mensajeAdvertencia(titulo: string, mensaje: string){
    Swal.fire({
      icon: 'warning',
      title: titulo,
      text: mensaje,
    })
  }
}
