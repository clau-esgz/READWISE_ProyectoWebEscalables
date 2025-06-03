import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from '../../components/encabezado/encabezado.component';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';
import { TarjetaSoli } from '../../components/tarjeta-soli/tarjeta-soli';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../interfaces/solicitud.interface';

@Component({
  selector: 'app-admin-soli',
  standalone: true,
  imports: [CommonModule, EncabezadoComponent, PiePagComponent, TarjetaSoli],
  templateUrl: './admin-soli.html',
  styleUrl: './admin-soli.css'
})
export class AdminSoli implements OnInit {
  solicitudes: Solicitud[] = [];
  isLoading: boolean = true;

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.isLoading = true;
    this.solicitudService.obtenerSolicitudes().subscribe({
      next: (solicitudes) => {
        console.log(solicitudes);
        this.solicitudes = solicitudes;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar las solicitudes:', error);
        this.isLoading = false;
      }
    });
  }
}
