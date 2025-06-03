import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { AutorService } from '../../services/autor.service';
import { LibroService, Libro } from '../../services/libro.service';
import { SolicitudService } from '../../services/solicitud.service';
import { Categoria } from '../../interfaces/categoria.interface';
import { Autor } from '../../interfaces/autores.interface';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form-libro',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-libro.html',
  styleUrl: './form-libro.css'
})
export class FormLibro implements OnInit, OnChanges {
  @Input() libroData: any = {};
  @Input() solicitudId: string = '';
  categorias: Categoria[] = [];
  autores: Autor[] = [];
  enviado = false;
  errorMensaje: string = '';
  formData = {
    ISBN: '',
    autor: '',
    editorial: '',
    genero: '',
    titulo: '',
    sinopsis: '',
    portada: '',
    fecha_publicacion: '',
    numero_paginas: '',
    promedio_calificaciones: 0,
    resenas: []
  };

  constructor(
    private categoriaService: CategoriaService, 
    private autorService: AutorService,
    private libroService: LibroService,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("Form",this.libroData);
      this.categoriaService.getCategorias().subscribe(cats => {
      this.categorias = cats;
    });
    this.autorService.getAutores().subscribe(autores => {
      this.autores = autores;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['libroData'] && changes['libroData'].currentValue) {
      // Mapear los datos de la solicitud al formulario
      this.formData = {
        ...this.formData,
        autor: this.libroData.autor || '',
        editorial: this.libroData.editorial || '',
        genero: this.libroData.categoria || '',
        titulo: this.libroData.titulo || ''
      };
    }
  }

  esValido() {
    return (
      this.formData.ISBN.trim() &&
      this.formData.autor &&
      this.formData.editorial.trim() &&
      this.formData.genero.trim() &&
      this.formData.titulo.trim() &&
      this.formData.numero_paginas &&
      this.formData.sinopsis.trim() &&
      this.formData.portada.trim() &&
      this.formData.fecha_publicacion
    );
  }

  onSubmit() {
    this.enviado = true;
    this.errorMensaje = '';

    if (this.esValido()) {
      const libroNuevo: Partial<Libro> = {
        ...this.formData,
        numero_paginas: parseInt(this.formData.numero_paginas),
        promedio_calificaciones: 0,
        resenas: []
      };

      this.libroService.createLibro(libroNuevo).pipe(
        switchMap(libroCreado => {
          console.log('Libro creado exitosamente:', libroCreado);
          // Después de crear el libro, eliminar la solicitud
          return this.solicitudService.eliminarSolicitud(this.solicitudId);
        })
      ).subscribe({
        next: () => {
          alert('Libro creado y solicitud eliminada exitosamente');
          this.router.navigate(['/admin-solicitudes']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMensaje = 'Hubo un error al procesar la solicitud. Por favor, intente nuevamente.';
        }
      });
    } else {
      this.errorMensaje = 'Por favor, complete todos los campos requeridos.';
    }
  }
}
