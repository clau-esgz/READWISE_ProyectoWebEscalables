import { Component } from '@angular/core';
import { FormInicia } from '../../components/form-inicia/form-inicia';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';

@Component({
  selector: 'app-sesion-ini',
  imports: [FormInicia, PiePagComponent],
  templateUrl: './sesion-ini.html',
  styleUrl: './sesion-ini.css'
})
export class SesionIni {

}
