import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-catalog-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-book.component.html',
  styleUrls: ['./catalog-book.component.scss']
})
export class CatalogBookComponent {
books: Book[] = [];
  loading = true;
  error = '';

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.getAll().subscribe({
      next: (data) => {
        this.books = data;
        console.log(this.books);
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los libros';
        this.loading = false;
      }
    });
  }
}
