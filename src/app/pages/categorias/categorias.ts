import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from '../../components/encabezado/encabezado.component';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';
import { TarjetaCategoriaComponent } from '../../components/tarjeta-categoria/tarjeta-categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-categorias',
  standalone: true,
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css'],
  imports: [
    CommonModule,
    EncabezadoComponent,
    PiePagComponent,
    TarjetaCategoriaComponent
  ]
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }
}
