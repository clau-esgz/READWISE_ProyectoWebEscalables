
import { Autor } from "./autores.interface"
import { Categoria } from "./categoria.interface"

export interface Solicitud {
    _id: string,
    titulo: string,
    autor: Autor, 
    editorial: string, 
    categoria: Categoria
} 