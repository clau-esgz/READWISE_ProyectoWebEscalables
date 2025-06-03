import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { AutorService } from '../../services/autor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../interfaces/solicitud.interface';
import { SolicitudService } from '../../services/solicitud.service';
import { Autor } from '../../interfaces/autores.interface';
import { Categoria } from '../../interfaces/categoria.interface';
import { NewSolicitud } from '../../interfaces/solicitud.nuevo.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
  imports: [FormsModule, CommonModule]
})
export class Formulario implements OnInit {
  categorias: Categoria[] = [];
  autores: Autor[] = [];
  formData = {
    nombre: '',
    autor: '',
    categoria: '',
    editorial: ''
  };
  enviado = false;

  constructor(private categoriaService: CategoriaService, private autorService: AutorService, private solicitudService: SolicitudService) {}

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(cats => {
      this.categorias = cats;
    });
    this.autorService.getAutores().subscribe(autores => {
      this.autores = autores;
    });
  }

  esValido() {
    return (
      this.formData.nombre.trim() &&
      this.formData.autor.trim() &&
      this.formData.categoria.trim()
    );
  }

  onSubmit() {
    this.enviado = true;
    if (this.esValido()) {
      const nuevaSolicitud: NewSolicitud = {
        _id: "",
        titulo: this.formData.nombre,
        autor: this.formData.autor,
        categoria: this.formData.categoria,
        editorial: this.formData.editorial
      };
  
      this.solicitudService.agregarSolicitud(nuevaSolicitud).subscribe({
        next: (res) => {
          console.log('Solicitud enviada con éxito:', res);
          alert('Solicitud enviada correctamente');
          this.formData = { nombre: '', autor: '', categoria: '', editorial: '' };
          this.enviado = false;
        },
        error: (err) => {
          console.error('Error al enviar solicitud:', err);
          alert('Error al enviar la solicitud');
        }
      });
    }
  }
  
}
