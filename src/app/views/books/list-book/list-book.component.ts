import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListbookComponent {
  books: Book[] = [];
  loading = true;
  error = '';

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.getAll().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los libros';
        this.loading = false;
      }
    });
  }

  deleteBook(id?: number): void {
    if (!id) return;
    const ok = confirm('¿Seguro que deseas eliminar este libro?');
    if (!ok) return;

    this.booksService.delete(id).subscribe({
      next: () => {
        this.books = this.books.filter(l => l.id !== id);
        alert('Libro eliminado correctamente');
      },
      error: () => {
        alert('No se pudo eliminar el libro');
      }
    });
  }

  editBook(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/books/edit', id]);
    } else {
      console.warn('No hay ID para navegar');
    }
  }

  createBook(): void {
    this.router.navigate(['/books/create']);
  }
}
