import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../interfaces/solicitud.interface';

@Component({
  selector: 'app-tarjeta-soli',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-soli.html',
  styleUrl: './tarjeta-soli.css'
})
export class TarjetaSoli {
  @Input() solicitud!: Solicitud;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.solicitud);
  }

  navigateToConfirmarSolicitud() {
    this.router.navigate(['/confirmar-solicitud', this.solicitud._id]);
  }
}
