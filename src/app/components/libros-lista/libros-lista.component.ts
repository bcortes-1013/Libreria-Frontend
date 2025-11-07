// ===================================================================
// Semana 3 - Componente: LibrosListaComponent
// ===================================================================
// Objetivo: Mostrar todos los libros obtenidos desde el backend
// usando el servicio LibrosService y la directiva *ngFor.
//
// Angular (Frontend) ←→ Spring Boot (Backend)
// ===================================================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 necesario para *ngFor, *ngIf
import { LibrosService} from '../../services/libros.service';
import { Libro } from '../../models/libro';   // ✅ modelo desde /models
import { RouterLink } from '@angular/router';       // necesario para routerLink

@Component({
  selector: 'app-libros-lista',
  standalone: true,             // Angular 17: componente independiente
  imports: [CommonModule, RouterLink],      // Importamos directivas básicas (ngIf, ngFor) , agregado RouterLink
  templateUrl: './libros-lista.component.html',
  styleUrls: ['./libros-lista.component.scss']
})
export class LibrosListaComponent implements OnInit {

  libros: Libro[] = [];
  loading = true;
  error = '';

  constructor(private librosSrv: LibrosService) {}

  ngOnInit(): void {
    // (Semana 3) Consumimos el servicio apenas se carga el componente
    this.librosSrv.getAll().subscribe({
      next: (data) => {
        this.libros = data;
        this.loading = false;
        console.log('✅ (Semana 3) Libros obtenidos:', this.libros);
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los libros.';
        this.loading = false;
        console.error('❌ (Semana 3) Error al obtener libros:', err);
      }
    });
  }
  // ===================================================================
  // Semana 3 - Funcionalidad DELETE (Eliminar libro por ID)
  // ===================================================================
  eliminar(id?: number): void {
    if (!id) return;
    const ok = confirm('¿Seguro que deseas eliminar este libro?');
    if (!ok) return;

    this.librosSrv.delete(id).subscribe({
      next: () => {
        // quitamos el libro del array sin recargar
        this.libros = this.libros.filter(l => l.id !== id);
        alert('✅ Libro eliminado correctamente');
      },
      error: (err) => {
        console.error('❌ Error al eliminar:', err);
        alert('No se pudo eliminar el libro');
      }
    });
  }

}

