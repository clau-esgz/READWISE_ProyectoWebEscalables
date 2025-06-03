import { Component, OnInit } from '@angular/core';
import { EncabezadoComponent } from '../../components/encabezado/encabezado.component';
import { PiePagComponent } from '../../components/pie-pag/pie-pag.component';
import { FormLibro } from '../../components/form-libro/form-libro';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../interfaces/solicitud.interface';

@Component({
  selector: 'app-confirma-reg',
  imports: [EncabezadoComponent, PiePagComponent, FormLibro, CommonModule],
  templateUrl: './confirma-reg.html',
  styleUrl: './confirma-reg.css'
})
export class ConfirmaReg implements OnInit {
  libroData: any = {};
  solicitud: Solicitud | null = null;

  constructor(private route: ActivatedRoute, private solicitudService: SolicitudService) {}

  ngOnInit() {
    this.solicitudService.obtenerSolicitudPorId(this.route.snapshot.params['id']).subscribe(solicitud => {
      console.log(solicitud);
      this.solicitud = solicitud;
      this.libroData = {
        isbn: '',
        autor: solicitud.autor._id || '',
        categoria: solicitud.categoria._id || '',
        titulo: solicitud.titulo || '',
        editorial: solicitud.editorial || '',
        paginas: '',
        sinopsis: '',
        portada: '',
        fecha: ''
      };
    });
  }
}
