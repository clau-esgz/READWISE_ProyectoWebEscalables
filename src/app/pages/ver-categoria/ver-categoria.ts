import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroService, Libro } from '../../services/libro.service';
import { EncabezadoComponent } from '../../components/encabezado/encabezado.component';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';
import { TarjetaLibroComponent } from '../../components/tarjeta-libro/tarjeta-libro.component';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-ver-categoria',
  standalone: true,
  templateUrl: './ver-categoria.html',
  styleUrls: ['./ver-categoria.css'],
  imports: [
    EncabezadoComponent,
    PiePagComponent,
    TarjetaLibroComponent,
    CommonModule
  ]
})
export class VerCategoriaComponent implements OnInit {
  @Input() categoria: any;
  libros: Libro[] = [];
  genero: string = '';
  categoriaDetalle: Categoria | undefined;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.genero = this.route.snapshot.paramMap.get('genero') || '';
    if (this.genero) {
      this.categoriaService.getCategoriaPorNombre(this.genero).subscribe(categoria => {
        this.categoriaDetalle = categoria;
        if(this.categoriaDetalle){
          console.log(this.categoriaDetalle._id);
          this.libroService.getLibrosPorCategoria(this.categoriaDetalle._id).subscribe(libros => {
            console.log(libros);
            this.libros = libros;
          });
        }

      });
    }
  }
}
