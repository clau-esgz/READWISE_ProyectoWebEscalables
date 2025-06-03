import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../components/encabezado/encabezado.component';
import { Formulario } from '../../components/formulario/formulario';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';

@Component({
  selector: 'app-solicitud',
  imports: [EncabezadoComponent, Formulario, PiePagComponent],
  templateUrl: './solicitud.html',
  styleUrl: './solicitud.css'
})
export class SolicitudPage {

}
