import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-autor',
  standalone: true,
  templateUrl: './tarjeta-autor.html',
  styleUrls: ['./tarjeta-autor.css']
})
export class TarjetaAutorComponent {
  @Input() autor: any;
}
