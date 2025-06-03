import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../interfaces/autores.interface';

@Injectable({ providedIn: 'root' })
export class AutorService {
    private apiUrl = 'http://localhost:8081/api/autores';

    constructor(private http: HttpClient) { }

    getAutorPorNombre(nombre: string): Observable<Autor> {
        return this.http.get<Autor>(`${this.apiUrl}/${encodeURIComponent(nombre)}`);
    }

    getAutorPorId(id: string): Observable<Autor> {
        return this.http.get<Autor>(`${this.apiUrl}/id/${id}`);
    }

    getAutores(): Observable<Autor[]> {
        return this.http.get<Autor[]>(this.apiUrl);
    }
}

