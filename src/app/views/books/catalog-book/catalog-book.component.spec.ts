import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogBookComponent } from './catalog-book.component';
import { BooksService } from 'src/app/services/books.service';
import { of, throwError } from 'rxjs';

describe('CatalogBookComponent', () => {
  let component: CatalogBookComponent;
  let fixture: ComponentFixture<CatalogBookComponent>;
  let booksServiceMock: any;

  beforeEach(() => {
    booksServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of([]))
    };

    TestBed.configureTestingModule({
      imports: [CatalogBookComponent],
      providers: [
        { provide: BooksService, useValue: booksServiceMock }
      ]
    });

    fixture = TestBed.createComponent(CatalogBookComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debería cargar libros exitosamente', () => {
    const fakeBooks = [{ id: 1, title: 'Libro Test', author: 'Autor Test', genre: 'Genero Test', publication: 2023 }, { id: 2, title: 'Libro Test', author: 'Autor Test', genre: 'Genero Test', publication: 2024 }];
    booksServiceMock.getAll.and.returnValue(of(fakeBooks));

    component.ngOnInit();

    expect(booksServiceMock.getAll).toHaveBeenCalled();
    expect(component.books).toEqual(fakeBooks);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
  });

  it('ngOnInit debería manejar error al cargar libros', () => {
    booksServiceMock.getAll.and.returnValue(throwError(() => new Error('Error')));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(booksServiceMock.getAll).toHaveBeenCalled();
    expect(component.books).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('No se pudieron cargar los libros');
  });
});