import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resena, ResenaUsuario } from '../interfaces/resena.interface';
import { NewResena } from '../interfaces/resena.new.interface';

@Injectable({ providedIn: 'root' })
export class ResenaService {
  private apiUrl = 'http://localhost:8081/api/resenas';

  constructor(private http: HttpClient) {}

  agregarResena(resena: Partial<NewResena>): Observable<Resena> {
    return this.http.post<Resena>(this.apiUrl, resena);
  }

  obtenerResenasPorLibro(libroId: string): Observable<ResenaUsuario[]> {
    return this.http.get<ResenaUsuario[]>(`${this.apiUrl}/libro/${libroId}`);
  }

  actualizarResena(resenaId: string, resena: Partial<Resena>): Observable<Resena> {
    return this.http.put<Resena>(`${this.apiUrl}/${resenaId}`, resena);
  }

  getResenasPorUsuario(): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/usuario`);
  }
} 