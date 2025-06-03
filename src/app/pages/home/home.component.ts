import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from '../../components/encabezado/encabezado.component';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';
import { TarjetaLibroComponent } from '../../components/tarjeta-libro/tarjeta-libro.component';
import { LibroService, Libro } from '../../services/libro.service';
import { BusquedaService } from '../../services/busqueda.service';
import { AutorService } from '../../services/autor.service';
import { Autor } from '../../interfaces/autores.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    EncabezadoComponent,
    PiePagComponent,
    TarjetaLibroComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  libros: Libro[] = [];
  librosFiltrados: Libro[] = [];
  autores: Autor[] = [];

  constructor(
    private libroService: LibroService,
    private busquedaService: BusquedaService,
    private autorService: AutorService
  ) {}

  ngOnInit() {
    this.libroService.getLibros().subscribe(libros => {
      console.log(libros);
      this.libros = libros;
      this.librosFiltrados = libros;
    });

    this.autorService.getAutores().subscribe(autores => {
      this.autores = autores;
    });

    // Función para normalizar (quitar tildes y pasar a minúsculas)
    const normaliza = (str: string) =>
      str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

    this.busquedaService.terminoBusqueda$.subscribe(termino => {
      const t = normaliza(termino);

      // 1. Encuentra los autores cuyo nombre coincida con el término de búsqueda
      const autoresCoincidentes = this.autores.filter(a =>
        normaliza(a.nombre).includes(t)
      );
      const idsAutoresCoincidentes = autoresCoincidentes.map(a => a._id);

      this.librosFiltrados = this.libros.filter(libro => {
        // 2. Si el libro tiene autor por ID, verifica si está en la lista de autores coincidentes
        const coincideAutor = idsAutoresCoincidentes.includes(libro.autor);

        // 3. También permite buscar por los otros campos, incluyendo 'nombrea'
        return (
          normaliza(libro.titulo).includes(t) ||
          coincideAutor ||
          (libro.nombrea && normaliza(libro.nombrea).includes(t)) ||
          (libro.genero && normaliza(libro.genero).includes(t)) ||
          (libro.ISBN && normaliza(libro.ISBN).includes(t)) ||
          (libro.editorial && normaliza(libro.editorial).includes(t))
        );
      });
    });
  }
}
