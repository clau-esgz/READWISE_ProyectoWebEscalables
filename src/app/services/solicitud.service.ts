import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../interfaces/solicitud.interface';
import { NewSolicitud } from '../interfaces/solicitud.nuevo.interface';

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private apiUrl = 'http://localhost:8081/api/solicitudes';

  constructor(private http: HttpClient) {}

  agregarSolicitud(solicitud: Partial<NewSolicitud>): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, solicitud);
  }

  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }

  obtenerSolicitudPorId(id: string): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
  }

  eliminarSolicitud(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 