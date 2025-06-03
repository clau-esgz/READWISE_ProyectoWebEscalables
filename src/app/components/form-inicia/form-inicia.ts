import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-inicia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-inicia.html',
  styleUrl: './form-inicia.css'
})
export class FormInicia {
  email = '';
  password = '';
  mensaje: string = '';
  mensajeTipo: 'success' | 'error' | '' = '';

  constructor(private router: Router, private http: HttpClient) {}

  navigateToCreaCuenta() {
    this.router.navigate(['/crear-cuenta']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.http.post<any>('http://localhost:8081/api/auth/iniciar-sesion', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.mensaje = '¡Inicio de sesión exitoso!';
        this.mensajeTipo = 'success';
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        console.log(res.token);
        setTimeout(() => {
          window.location.href = '/home';
        }, 1500);
      },
      error: (err) => {
        this.mensaje = err.error?.msg || 'Error al iniciar sesión';
        this.mensajeTipo = 'error';
      }
    });
  }
}
