// ======================================================================
// Semana 3 - Configuración inicial de rutas (app.routes.ts)
// ======================================================================
//
// Angular 17 usa arquitectura standalone, así que las rutas se definen
// en este arreglo sin necesidad de NgModules.
// se conectan en app.config.ts
// con provideRouter(routes).
//
// Cada entrada indica:
//   path: URL relativa (por ejemplo 'libros')
//   component: componente standalone a mostrar
//
// El sistema SPA (Single Page Application) de Angular usará <router-outlet>
// para cargar estos componentes dinámicamente.
// Rutas definidas:
//   /libros           → Listado (GET todos)
//   /libros/nuevo     → Crear (POST)
//   /libros/editar/:id→ Editar (PUT) usando el mismo form
//   /libros/:id       → Detalle (GET por ID) para visibilidad del requisito
//   '' → redirección inicial a /libros
// ======================================================================

import { Routes } from '@angular/router';
import { LibrosListaComponent } from './components/libros-lista/libros-lista.component'; // 👈 Importamos nuestro componente

import { LibroFormComponent } from './components/libro-form/libro-form.component';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';


export const routes: Routes = [
    {
        path: '', // Ruta raíz (http://localhost:4200)
        redirectTo: 'libros', // Redirige automáticamente
        pathMatch: 'full'
    },
    {
        path: 'libros', // Ruta principal
        component: LibrosListaComponent // El componente que se muestra
    },
    { path: 'libros/nuevo', component: LibroFormComponent },
    { path: 'libros/editar/:id', component: LibroFormComponent },
    { path: 'libros/:id', component: LibroDetalleComponent },   // GET por ID visible
    { path: '**', redirectTo: 'libros' }


];
