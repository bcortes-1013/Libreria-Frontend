// ===================================================================
// Semana 3 - AppComponent base (con soporte para Router y servicio)
// ===================================================================
//
// Este componente es standalone, por lo tanto debemos IMPORTAR
// explícitamente lo que usamos en su template (por ejemplo RouterOutlet).
//
// 🔹 Además, desde Angular 17, los componentes standalone NO se registran
// automáticamente en un módulo global (porque ya no existe app.module.ts).
//
// 🔹 Por eso, cuando usamos un componente hijo —como LibrosListaComponent—
// debemos IMPORTARLO explícitamente en la propiedad "imports".
// ===================================================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';     // 👈 Necesario para *ngIf, *ngFor
import { RouterOutlet } from '@angular/router';      // 👈 Necesario para <router-outlet>
import { LibrosService} from './services/libros.service';  // Servicio que consume el backend
import { LibrosListaComponent } from './components/libros-lista/libros-lista.component'; // ✅ Nuevo componente hijo (standalone)
import { Libro } from './models/libro';             // ✅ Modelo desde /models

// ===================================================================
// Decorador principal del componente raíz de Angular
// ===================================================================
@Component({
  selector: 'app-root',
  standalone: true,                                 // ✅ Angular 17: standalone components
  // 👇 En Angular 17, los componentes standalone deben importar explícitamente
  // todo lo que usan en su template (router, directivas, y otros componentes).
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'biblioteca-angular';
  // ===================================================================
  // Variables de estado (Semana 3 - Smoke test y manejo básico de errores)
  // ===================================================================
  libros: Libro[] = [];
  loading = true;
  error = '';

  // ===================================================================
  // Inyectamos el servicio LibrosService
  // ===================================================================
  constructor(private librosSrv: LibrosService) {}

  // ===================================================================
  // Ciclo de vida del componente (OnInit)
  // ===================================================================
  ngOnInit(): void {
    // Llamamos al backend apenas se inicia la aplicación (Semana 3)
    this.librosSrv.getAll().subscribe({
      next: (data) => {
        this.libros = data;
        this.loading = false;
        console.log('✅ (Semana 3) Libros desde backend:', this.libros);
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los libros.';
        this.loading = false;
        console.error('❌ (Semana 3) Error al obtener libros:', err);
      }
    });
  }
}
