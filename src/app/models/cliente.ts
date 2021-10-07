import { DocumentReference } from "@angular/fire/compat/firestore"

export class Cliente{
          id!: string
          nombre!: string
          apellido!: string
          correo!: string
          fechaNacimiento!: Date
          imgUrl!: string
          telefono!: number
          cedula!: string
          ref!: DocumentReference
          visible!: boolean
}
