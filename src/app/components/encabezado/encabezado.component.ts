import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaService } from '../../services/busqueda.service';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  mensaje: string = '';
  mensajeTipo: 'success' | 'error' | '' = '';
  termino: string = '';

  get logueado(): boolean {
    return !!localStorage.getItem('token');
  }

  constructor(private router: Router, private busquedaService: BusquedaService) {}

  cerrarSesion() {
    localStorage.removeItem('token');
    this.mensaje = 'Sesión cerrada correctamente';
    this.mensajeTipo = 'success';
    setTimeout(() => {
      window.location.href = '/home';
    }, 1500);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToMisLibros() {
    this.router.navigate(['/mis-libros']);
  }

  navigateToCategorias() {
    this.router.navigate(['/categorias']);
  }

  navigateToSolicitud() {
    this.router.navigate(['/solicitar-libro']);
  }

  navigateToAdminSolicitudes() {
    this.router.navigate(['/admin-solicitudes']);
  }

  navigateToIniciarSesion() {
    this.router.navigate(['/iniciar-sesion']);
  }

  onBuscar() {
    this.busquedaService.setBusqueda(this.termino);
  }
}
