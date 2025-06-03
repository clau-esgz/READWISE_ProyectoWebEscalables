import { Component } from '@angular/core';
import { Libro } from '../../services/libro.service';
import { Router } from '@angular/router';
import { ResenaService } from '../../services/resena.service';
import { CommonModule } from '@angular/common';
import { Resena } from '../../interfaces/resena.interface';

@Component({
  selector: 'app-resenados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resenados.html',
  styleUrls: ['./resenados.css']
})
export class ResenadosComponent {
  resenas: Resena[] = [];

  constructor(private router: Router, private resenaService: ResenaService) {}

  ngOnInit() {
    this.resenaService.getResenasPorUsuario().subscribe(resenas => {
      this.resenas = resenas;
      console.log(resenas);
    });
  }

  navigateToLibro(id: string) {
    this.router.navigate(['/api/libro', id]);
  }

  getStars(calificacion: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= calificacion ? '★' : '☆');
    }
    return stars;
  }
}
