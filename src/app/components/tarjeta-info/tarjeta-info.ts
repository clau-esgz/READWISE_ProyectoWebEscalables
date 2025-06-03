import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Libro } from '../../services/libro.service';
import { ResenaService } from '../../services/resena.service';
import { forkJoin } from 'rxjs';
import { Resena, ResenaUsuario } from '../../interfaces/resena.interface';

@Component({
  selector: 'app-tarjeta-info',
  standalone: true,
  templateUrl: './tarjeta-info.html',
  styleUrls: ['./tarjeta-info.css'],
  imports: [CommonModule]
})
export class TarjetaInfoComponent {
  @Input() libro: any;
  estado: 'leido' | 'quiero-leer' | null = null;
  leidos: Libro[] = [];
  quiero: Libro[] = [];
  resenas: ResenaUsuario[] = [];
  promedioCalificacion: number = 0;

  constructor(
    private userService: UserService,
    private resenaService: ResenaService
  ) {}
  
  ngOnInit(): void {
    forkJoin({
      leidos: this.userService.getLibrosLeidos(),
      quiero: this.userService.getLibrosQuiereLeer(),
      resenas: this.resenaService.obtenerResenasPorLibro(this.libro._id)
    }).subscribe(({ leidos, quiero, resenas }) => {
      this.leidos = leidos ?? [];
      this.quiero = quiero ?? [];
      this.resenas = resenas ?? [];
  
      const idActual = this.libro._id;
  
      if (this.leidos.some(libro => libro._id === idActual)) {
        this.estado = 'leido';
      } else if (this.quiero.some(libro => libro._id === idActual)) {
        this.estado = 'quiero-leer';
      } else {
        this.estado = null;
      }

      // Calcular el promedio de calificaciones
      if (this.resenas.length > 0) {
        const sumaCalificaciones = this.resenas.reduce((sum, resena) => sum + resena.calificacion, 0);
        this.promedioCalificacion = Math.round(sumaCalificaciones / this.resenas.length);
      }
    });
  }

  marcarLeido() {
    this.estado = 'leido';
    this.userService.agregarLibroLeido(this.libro._id).subscribe({
      next: (usuario) => {
        alert('✅ Libro marcado como leído');
      },
      error: (error) => {
        alert('❌ Ocurrió un error al marcar el libro como leído');
      }
    });

  }

  marcarQuieroLeer() {
    this.estado = 'quiero-leer';
    this.userService.agregarLibroQuiereLeer(this.libro._id).subscribe({
      next: (usuario) => {
        alert('✅ Libro marcado como quiero leer');
      },
      error: (error) => {
        alert('❌ Ocurrió un error al marcar el libro como quiero leer');
      }
    });

  }
}
