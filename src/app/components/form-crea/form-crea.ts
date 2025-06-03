import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-form-crea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-crea.html',
  styleUrl: './form-crea.css'
})
export class FormCrea {
  email = '';
  password = '';
  confirmPassword = '';
 
  mensaje: string = '';
  mensajeTipo: 'success' | 'error' | '' = '';
 
  constructor(private router: Router, private http: HttpClient) {}
 
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      this.mensajeTipo = 'error';
      return;
    }
 
    this.http.post<any>('http://localhost:8081/api/auth/registro', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.mensaje = '¡Registro exitoso!';
        this.router.navigate(['/iniciar-sesion']);
      },
      error: (err) => {
        this.mensaje = err.error?.msg || 'Error al registrar';
        this.mensajeTipo = 'error';
      }
    });
  }
}
 