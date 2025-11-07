// ===================================================================
// Semana 3 - LibroFormComponent (Create + Update)
// ===================================================================
// - Formulario reactivo para crear o editar un libro.
// - Si la ruta trae :id → modo edición (PUT). De lo contrario → creación (POST).
// - Reutilizamos un solo componente para ambos casos.
// ===================================================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.scss']
})
export class LibroFormComponent implements OnInit {

  // ------------------ Estado del formulario ------------------
  form!: FormGroup;     // Estructura del form (campos + validaciones)
  editMode = false;     // true → estamos editando
  libroId?: number;     // id del libro a editar (si aplica)
  loading = false;      // para indicar carga mientras trae un libro por id
  error = '';           // manejo simple de errores

  constructor(
    private fb: FormBuilder,
    private librosSrv: LibrosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // (Semana 3) 1) Construcción del formulario reactivo
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      autor: ['', [Validators.required, Validators.minLength(3)]],
      genero: ['', [Validators.required, Validators.minLength(3)]],
      // ⚠️ sin ñ → anioPublicacion para compatibilidad JSON/TS
      anioPublicacion: [
        '',
        [Validators.required, Validators.min(1900), Validators.max(2100)]
      ]
    });

    // (Semana 3) 2) Detectar si la ruta trae :id (modo edición)
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.libroId = +params['id'];
        this.loading = true;

        this.librosSrv.getById(this.libroId).subscribe({
          next: (libro: Libro) => {
            this.form.patchValue(libro); // precarga valores
            this.loading = false;
          },
          error: (err) => {
            this.error = 'No se pudo cargar el libro.';
            this.loading = false;
            console.error('❌ (Semana 3) Error getById:', err);
          }
        });
      }
    });
  }

  // (Semana 3) 3) Guardar: decide POST o PUT
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // muestra errores
      return;
    }

    const payload: Libro = this.form.value;

    if (this.editMode && this.libroId) {
      // PUT
      this.librosSrv.update(this.libroId, payload).subscribe({
        next: () => {
          alert('✅ Libro actualizado correctamente');
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          console.error('❌ Error al actualizar:', err);
          alert('No se pudo actualizar el libro');
        }
      });
    } else {
      // POST
      this.librosSrv.create(payload).subscribe({
        next: () => {
          alert('✅ Libro creado correctamente');
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          console.error('❌ Error al crear:', err);
          alert('No se pudo crear el libro');
        }
      });
    }
  }

  // Helpers para mostrar rápidamente errores en la vista
  // --------------------------------------------------------------
  // (Semana 3) Helper universal de validación
  // Permite usar hasError('campo') o hasError('campo','tipoError')
  // --------------------------------------------------------------
  hasError(ctrl: string, error?: string): boolean {
    const c = this.form.get(ctrl);
    if (!c) return false;

    // Si no se especifica el tipo de error, devuelve true si el control es inválido
    if (!error) {
      return !!(c.invalid && (c.dirty || c.touched));
    }

    // Si se especifica error → chequea ese tipo concreto
    return !!(c.touched && c.hasError(error));
  }

}

