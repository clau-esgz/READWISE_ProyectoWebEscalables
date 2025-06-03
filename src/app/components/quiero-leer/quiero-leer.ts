import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Libro } from '../../services/libro.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-quiero-leer',
  standalone: true,
  templateUrl: './quiero-leer.html',
  styleUrls: ['./quiero-leer.css'],
  imports: [CommonModule]
})

export class QuieroLeerComponent {

  libros : Libro[] = [];

  constructor(private router: Router, private userService: UserService) {}
  ngOnInit() {
    this.userService.getLibrosQuiereLeer().subscribe(libros =>{
      console.log(libros);
      this.libros = libros;
    });

  }

  navigateToLibro(id: string) {
    this.router.navigate(['/api/libro', id]);
  }

  marcarLeido(id: string) {
    this.userService.agregarLibroLeido(id).subscribe({
      next: (usuario) => {
        alert('✅ Libro marcado como leído');
        window.location.reload();
      },
      error: (error) => {
        alert('❌ Ocurrió un error al marcar el libro como leído');
      }
    });

  }


}
