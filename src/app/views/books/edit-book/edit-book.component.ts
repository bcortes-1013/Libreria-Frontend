import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/services/loading.service';
import { BooksService } from 'src/app/services/books.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditbookComponent {
  book?: Book;
  loading = true;
  mensajeError: string | null = null;
  mensajeOk: string | null = null;
  cargando = false;
  bookId?: number; 
  currentYear = new Date().getFullYear();

  private fb = inject(FormBuilder);
  private booksService = inject(BooksService);
  private loadingService = inject(LoadingService);
  private authService = inject(AuthService);


  constructor(
    private route: ActivatedRoute,
    private router: Router
    // private usersService: UsersService
  ) {}

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    author: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    genre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    publication: [0, [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
  });

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.bookId) {
      this.mensajeError = 'ID de usuario inválido';
      this.loading = false;
      return;
    }

    this.booksService.getById(this.bookId).subscribe({
      next: (data) => { 
        this.book = data; 
        this.loading = false; 

        this.form.patchValue({
          title: data.title,
          author: data.author,
          genre: data.genre,
          publication: Number(data.publication),
        });
      },
      error: (err) => {
        this.mensajeError = 'No se pudo obtener el libro';
        this.loading = false;
        console.error('❌ Error al obtener libro por ID:', err);
      }
    });
  }

  onSubmit(): void {
    this.loadingService.show();
    this.mensajeError = null;
    this.mensajeOk = null;

    const payload: Partial<Book> = {
      title: this.form.value.title ?? undefined,
      author: this.form.value.author ?? undefined,
      genre: this.form.value.genre ?? undefined,
      publication: this.form.value.publication ?? undefined
    };

    if (this.form.invalid) {
      this.mensajeError = 'Completa los campos requeridos';
      this.form.markAllAsTouched();
      this.loadingService.hide();
      return;
    }

    // const { name, description } = this.form.value;
    // if (!name || !description) {
    //   this.mensajeError = 'Nombre, email y contraseña son obligatorios';
    //   this.loadingService.hide();
    //   return;
    // }

    this.cargando = true;

    this.booksService.update(this.bookId!, payload).subscribe({
      next: () => {
        this.mensajeOk = 'Libro actualizado correctamente';
        alert("Libro actualizado correctamente");
        this.isAdmin ? this.router.navigate(['/books']) : this.router.navigate(['/']);
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('❌ Error al actualizar libro:', err);
        this.mensajeError = 'Error al actualizar libro';
        this.loadingService.hide();
      }
    });
  }
}
