import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroService, Libro } from '../../services/libro.service';
import { TarjetaInfoComponent } from '../../components/tarjeta-info/tarjeta-info';
import { TarjetaAutorComponent } from '../../components/tarjeta-autor/tarjeta-autor';
import { TarjetaResenaComponent } from '../../components/tarjeta-resena/tarjeta-resena';
import { EncabezadoComponent } from '../../components/encabezado/encabezado.component';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';
import { AutorService } from '../../services/autor.service';
import { CommonModule } from '@angular/common';
import { Autor } from '../../interfaces/autores.interface';

@Component({
  selector: 'app-ver-libro',
  standalone: true,
  templateUrl: './ver-libro.html',
  styleUrls: ['./ver-libro.css'],
  imports: [
    TarjetaInfoComponent,
    TarjetaAutorComponent,
    TarjetaResenaComponent,
    EncabezadoComponent,
    PiePagComponent,
    CommonModule
  ]
})
export class VerLibroComponent implements OnInit {
  libro: Libro | undefined;
  autor: Autor | undefined;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService,
    private autorService: AutorService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.libroService.getLibroPorId(id).subscribe(libro => {
        console.log('Libro recibido:', libro);
        this.libro = libro;
        console.log(this.libro);
        if (libro?.autor) {
          this.autorService.getAutorPorId(libro.autor).subscribe(autor => {
            this.autor = autor;
          });
        }
      });
    }
  }
}
