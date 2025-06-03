
import { Component } from '@angular/core';
import { Libro } from '../../services/libro.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leidos.html',
  styleUrls: ['./leidos.css'],
})
export class LeidosComponent {
  
  libros : Libro[] = [];

  constructor(private router: Router, private userService: UserService) {}
  ngOnInit() {
    this.userService.getLibrosLeidos().subscribe(libros =>{
      console.log(libros);
      this.libros = libros;
    });

  }

  navigateToLibro(id: string) {
    this.router.navigate(['/api/libro', id]);
  }

}