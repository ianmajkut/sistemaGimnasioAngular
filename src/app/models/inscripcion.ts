import { DocumentReference } from "@angular/fire/compat/firestore"

export class Inscripcion{
          fecha!: Date 
          fechaFinal!: Date
          precios!: DocumentReference
          cliente!: DocumentReference
          subtotal!: number
          impuesto!: number
          total!: number
          constructor(){
          }

          validar(): any{
                    let respuesta = {
                              esValido: false,
                              mensaje: ""
                    }
                    if (this.cliente == null || this.cliente == undefined){
                              respuesta.esValido = false,
                              respuesta.mensaje = "No seleccionó un cliente"
                              return respuesta
                    }
                    if (this.precios == null || this.precios == undefined){
                              respuesta.esValido = false,
                              respuesta.mensaje = "No seleccionó un precio"
                              return respuesta
                    }
                    if (this.fecha == null || this.fecha == undefined){
                              respuesta.esValido = false,
                              respuesta.mensaje = "No tiene fecha de inicio"
                              return respuesta
                    }
                    if (this.fechaFinal == null || this.fechaFinal == undefined){
                              respuesta.esValido = false,
                              respuesta.mensaje = "No tiene fecha final"
                              return respuesta
                    }
                    if (this.subtotal <= 0 || this.subtotal == undefined){
                              respuesta.esValido = false,
                              respuesta.mensaje = "No se calculó el subtotal"
                              return respuesta
                    }
                    if (this.impuesto <= 0 || this.impuesto == undefined){
                              respuesta.esValido = false,
                              respuesta.mensaje = "No se calculó el impuesto"
                              return respuesta
                    }
                    if (this.total <= 0 || this.total == undefined){
                              respuesta.esValido = false,
                              respuesta.mensaje = "No se calculó el total"
                              return respuesta
                    }

                    respuesta.esValido = true 
                    return respuesta
          }
}