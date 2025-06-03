import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8081/api/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarioActual(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/actual`);
  }

  agregarLibroLeido(libroId: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/leidos`, { libroId });
  }

  agregarLibroQuiereLeer(libroId: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/quiereleer`, { libroId });
  }

  getLibrosLeidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leidos`);
  }

  getLibrosQuiereLeer(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quiereleer`);
  }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
