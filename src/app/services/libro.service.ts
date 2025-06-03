import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Libro {
  _id: string;
  ISBN: string;
  autor: string;
  editorial: string;
  genero: string;
  titulo: string;
  sinopsis: string;
  portada: string;
  promedio_calificaciones: number;
  fecha_publicacion: string;
  numero_paginas: number;
  resenas: string[];
  nombrea?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:8081/api/libros';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  getLibroPorId(id: string): Observable<Libro | undefined> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  getLibrosPorCategoria(categoriaId: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/categoria/${categoriaId}`);
  }

  createLibro(libro: Partial<Libro>): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }
}
