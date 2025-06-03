import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraMisLibrosComponent } from '../../components/barra-mis-libros/barra-mis-libros';
import { QuieroLeerComponent } from '../../components/quiero-leer/quiero-leer';
import { LeidosComponent } from '../../components/leidos/leidos';
import { ResenadosComponent } from '../../components/resenados/resenados';
import { EncabezadoComponent } from '../../components/encabezado/encabezado.component';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';

@Component({
  selector: 'app-mis-libros',
  standalone: true,
  templateUrl: './mis-libros.html',
  styleUrls: ['./mis-libros.css'],
  imports: [
    CommonModule,
    BarraMisLibrosComponent,
    QuieroLeerComponent,
    LeidosComponent,
    ResenadosComponent,
    EncabezadoComponent,
    PiePagComponent
  ]
})

export class MisLibros {
  tabActivo = 'quiero-leer';
}
