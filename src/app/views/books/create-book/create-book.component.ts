import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { LoadingService } from 'src/app/services/loading.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreatebookComponent {
  private fb = inject(FormBuilder);
  private booksService = inject(BooksService);
  private loadingService = inject(LoadingService);
  // private authService = inject(AuthService);

  mensajeError: string | null = null;
  mensajeOk: string | null = null;
  cargando = false;
  currentYear = new Date().getFullYear();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    author: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    genre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    publication: [2000, [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
  });

  // get isAdmin(): boolean {
  //   return this.authService.isAdmin();
  // }

  onSubmit(): void {
    this.loadingService.show();
    this.mensajeError = null;
    this.mensajeOk = null;
    const title = this.form.value.title ?? '';
    const author = this.form.value.author ?? '';
    const genre = this.form.value.genre ?? '';
    const publication = this.form.value.publication ?? 0;

    if (this.form.invalid) {
      this.mensajeError = 'Completa los campos requeridos';
      this.form.markAllAsTouched();
      this.loadingService.hide();
      return;
    }

    this.cargando = true;

    this.booksService.create({
      title,
      author,
      genre,
      publication
    }).subscribe({
      next: book => {
        this.cargando = false;
        this.mensajeOk = `Se ha registrado el libro ${book.title} exitosamente`;
        this.loadingService.hide();
      },
      error: err => {
        this.cargando = false;
        console.error('Error en registro', err);
        this.mensajeError = 'No fue posible registrar el usuario. Verifique el email (no repetido)';
        this.loadingService.hide();
      }
    });
  }
}
