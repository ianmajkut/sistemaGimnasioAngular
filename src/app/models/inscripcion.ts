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
}