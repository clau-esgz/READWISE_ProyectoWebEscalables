import { Component } from '@angular/core';
import { FormCrea } from '../../components/form-crea/form-crea';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';

@Component({
  selector: 'app-sesion-crea',
  imports: [FormCrea, PiePagComponent],
  templateUrl: './sesion-crea.html',
  styleUrl: './sesion-crea.css'
})
export class SesionCrea {

}
