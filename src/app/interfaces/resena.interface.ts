import { Libro } from "../services/libro.service"
import { User } from "./user.interface"
export interface Resena {
    _id: string,
    libro: Libro
    usuario: string,
    contenido: string,
    calificacion: number,
    fecha: string
}

export interface ResenaUsuario {
    _id: string,
    libro: Libro,
    usuario: User,
    contenido: string,
    calificacion: number,
    fecha: string
}
