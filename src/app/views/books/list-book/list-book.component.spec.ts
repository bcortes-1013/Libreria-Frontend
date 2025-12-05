import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListbookComponent } from './list-book.component';
import { BooksService } from 'src/app/services/books.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ListbookComponent', () => {
  let component: ListbookComponent;
  let fixture: ComponentFixture<ListbookComponent>;
  let booksServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    booksServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
      delete: jasmine.createSpy('delete').and.returnValue(of({}))
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [ListbookComponent],
      providers: [
        { provide: BooksService, useValue: booksServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    fixture = TestBed.createComponent(ListbookComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debería cargar libros correctamente', () => {
    const books = [{ id: 1, title: 'Libro 1', author: 'Autor', genre : 'Género', publication: 2020 }];
    booksServiceMock.getAll.and.returnValue(of(books));

    component.ngOnInit();

    expect(booksServiceMock.getAll).toHaveBeenCalled();
    expect(component.books).toEqual(books);
    expect(component.loading).toBeFalse();
  });

  it('ngOnInit debería manejar error al cargar libros', () => {
    booksServiceMock.getAll.and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(component.books).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('No se pudieron cargar los libros');
  });

  it('deleteBook debería eliminar un libro si confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');

    component.books = [{ id: 1, title: 'Libro 1', author: 'Autor', genre : 'Género', publication: 2020 }];
    booksServiceMock.delete.and.returnValue(of({}));

    component.deleteBook(1);

    expect(booksServiceMock.delete).toHaveBeenCalledWith(1);
    expect(component.books.length).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('Libro eliminado correctamente');
  });

  it('deleteBook no hace nada si no confirma', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(window, 'alert');

    component.books = [{ id: 1, title: 'Libro 1', author: 'Autor', genre : 'Género', publication: 2020 }];

    component.deleteBook(1);

    expect(booksServiceMock.delete).not.toHaveBeenCalled();
    expect(component.books.length).toBe(1);
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('deleteBook maneja error en borrado', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');

    booksServiceMock.delete.and.returnValue(throwError(() => new Error('Error')));
    component.books = [{ id: 1, title: 'Libro 1', author: 'Autor', genre : 'Género', publication: 2020 }];

    component.deleteBook(1);

    expect(window.alert).toHaveBeenCalledWith('No se pudo eliminar el libro');
  });

  it('editBook debería navegar si id existe', () => {
    component.editBook(5);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/books/edit', 5]);
  });

  it('editBook no debería navegar si id es undefined', () => {
    spyOn(console, 'warn');
    component.editBook(undefined);
    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith('No hay ID para navegar');
  });

  it('createBook debería navegar a /books/create', () => {
    component.createBook();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/books/create']);
  });
});