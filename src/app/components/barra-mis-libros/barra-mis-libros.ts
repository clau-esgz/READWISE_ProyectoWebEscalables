import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra-mis-libros',
  standalone: true,
  templateUrl: './barra-mis-libros.html',
  styleUrls: ['./barra-mis-libros.css']
})
export class BarraMisLibrosComponent {
  @Input() tabActivo: string = 'quiero-leer';
  @Output() cambiarTab = new EventEmitter<string>();

  cambiar(tab: string) {
    this.cambiarTab.emit(tab);
  }
}
