import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-categoria',
  standalone: true,
  templateUrl: './tarjeta-categoria.html',
  styleUrls: ['./tarjeta-categoria.css']
})
export class TarjetaCategoriaComponent {
  @Input() categoria: any;

  constructor(private router: Router) {}

  verCategoria() {
    this.router.navigate(['/ver-categoria', this.categoria.genero]);
  }
}