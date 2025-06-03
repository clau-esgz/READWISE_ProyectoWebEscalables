import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarjeta-libro',
  standalone: true,
  templateUrl: './tarjeta-libro.component.html',
  styleUrls: ['./tarjeta-libro.component.css'],
  imports: [RouterModule]
})
export class TarjetaLibroComponent {
  @Input() libro: any;
  constructor(private router: Router) {}

  navigateToLibro(id: number) {
    this.router.navigate(['/api/libro', id]);
  }
}
