  import { Component, Input, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { Router } from '@angular/router';
  import { FormsModule } from '@angular/forms';
  import { ResenaService } from '../../services/resena.service';
  import { Resena, ResenaUsuario } from '../../interfaces/resena.interface';

  @Component({
    selector: 'app-tarjeta-resena',
    standalone: true,
    templateUrl: './tarjeta-resena.html',
    styleUrls: ['./tarjeta-resena.css'],
    imports: [CommonModule, FormsModule]
  })
  export class TarjetaResenaComponent implements OnInit {
    @Input() libroId: string = '';
    resenas: ResenaUsuario[] = [];
    
    resenaExistente: Resena | null = null;
    calificacion = 0;
    contenido = '';
    isEditing = false;

    constructor(
      private router: Router,
      private resenaService: ResenaService
    ) {}

    ngOnInit() {
      this.verificarResenaExistente();
      console.log("Libro tarjeta reseña",this.libroId);
      this.resenaService.obtenerResenasPorLibro(this.libroId).subscribe(resenas =>{
        console.log(resenas);
        this.resenaService.getResenasPorUsuario().subscribe(misResenas => {
          const miResena = misResenas.find(r => r.libro._id === this.libroId);
          if (miResena) {
            this.resenas = resenas.filter(r => r._id !== miResena._id);
          } else {
            this.resenas = resenas;
          }
        });
      });
    }

    verificarResenaExistente() {
      this.resenaService.getResenasPorUsuario().subscribe(resenas => {
        const resena = resenas.find(r => r.libro._id === this.libroId);
        if (resena) {
          this.resenaExistente = resena;
          this.calificacion = resena.calificacion;
          this.contenido = resena.contenido;
        }
      });
    }

    setCalificacion(valor: number) {
      this.calificacion = valor;
    }

    toggleEdicion() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        // Restaurar valores originales si se cancela la edición
        if (this.resenaExistente) {
          this.calificacion = this.resenaExistente.calificacion;
          this.contenido = this.resenaExistente.contenido;
        }
      }
    }

    guardarResena() {
      if (!this.calificacion || !this.contenido.trim()) {
        alert('Por favor, completa todos los campos');
        return;
      }

      if (this.resenaExistente) {
        // Actualizar reseña existente
        this.resenaService.actualizarResena(
          this.resenaExistente._id,
          {
            calificacion: this.calificacion,
            contenido: this.contenido
          }
        ).subscribe({
          next: (resena) => {
            console.log(resena);
            this.resenaExistente = resena;
            this.isEditing = false;
            alert('Reseña actualizada con éxito');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al actualizar la reseña:', error);
            alert('Error al actualizar la reseña');
          }
        });
      } else {
        // Crear nueva reseña
        this.resenaService.agregarResena({
          libro: this.libroId,
          calificacion: this.calificacion,
          contenido: this.contenido,
          fecha: new Date().toISOString()  // formato string ISO
        }).subscribe({
          next: (resena) => {
            this.resenaExistente = resena;
            this.isEditing = false;
            alert('Reseña creada con éxito');
          },
          error: (error) => {
            console.error('Error al crear la reseña:', error);
            alert('Error al crear la reseña');
          }
        });
      }
    }

    getStars(calificacion: number): string[] {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(i <= calificacion ? '★' : '☆');
      }
      return stars;
    }
  }
