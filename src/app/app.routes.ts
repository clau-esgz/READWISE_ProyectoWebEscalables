import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MisLibros } from './pages/mis-libros/mis-libros';
import { CategoriasComponent } from './pages/categorias/categorias';
import { SolicitudPage } from './pages/solicitud/solicitud';
import { ConfirmaReg } from './pages/confirma-reg/confirma-reg';
import { SesionIni } from './pages/sesion-ini/sesion-ini';
import { SesionCrea } from './pages/sesion-crea/sesion-crea';
import { VerLibroComponent } from './pages/ver-libro/ver-libro';
import { AdminSoli } from './pages/admin-soli/admin-soli';
import { VerCategoriaComponent } from './pages/ver-categoria/ver-categoria';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';


export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
   
    {
        path: 'mis-libros',
        component: MisLibros,
        canActivate: [AuthGuard]
    },
    {
        path: 'categorias',
        component: CategoriasComponent,
    },
    { //SOLO USUARIO REGISTRADO
        path: 'solicitar-libro',
        component: SolicitudPage,
        canActivate: [AuthGuard]
    },
    { //SOLO ADMIN
        path: 'admin-solicitudes',
        component: AdminSoli,
        canActivate: [AdminGuard]
    },
    {//igual solo admin
        path: 'confirmar-solicitud/:id',
        component: ConfirmaReg,
        canActivate: [AdminGuard]
    },
    {
        path: 'iniciar-sesion',
        component: SesionIni
    },
    {
        path: 'crear-cuenta',
        component: SesionCrea
    },
    {
        path: 'api/libro/:id',
        component: VerLibroComponent
    },
    {
        path: 'ver-categoria/:genero',
        component: VerCategoriaComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
