import { Resena } from "./resena.interface";


export interface libro {
    _id: string,
    isbn: number,
    autor: string,
    editorial: string,
    genero: string,
    titulo: string,
    sinopsis: string,
    portada: string,
    promedio_calificaciones: number,
    fecha_publicacion: string,
    numero_paginas: number,
}
