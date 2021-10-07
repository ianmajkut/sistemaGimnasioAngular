import { DocumentReference } from "@angular/fire/compat/firestore"

export class Precio{
          id! : string
          nombre! : string
          costo! : number
          duracion! : number
          tipoDuracion! : number
          ref!: DocumentReference
}