// ===================================================================
// Semana 3 - LibroDetalleComponent (GET por ID)
// ===================================================================
// Muestra los datos de un libro específico en modo solo lectura.
// Refuerza el requisito "GET por ID" con navegación visible.
// ===================================================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-libro-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.scss']
})
export class LibroDetalleComponent implements OnInit {

  libro?: Libro;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private librosSrv: LibrosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID inválido';
      this.loading = false;
      return;
    }

    this.librosSrv.getById(id).subscribe({
      next: (data) => { this.libro = data; this.loading = false; },
      error: (err) => {
        this.error = 'No se pudo obtener el libro.';
        this.loading = false;
        console.error('❌ Error GET por ID:', err);
      }
    });
  }
}
