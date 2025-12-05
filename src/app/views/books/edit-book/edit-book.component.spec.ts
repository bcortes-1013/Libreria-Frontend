import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditbookComponent } from './edit-book.component';
import { BooksService } from 'src/app/services/books.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('EditbookComponent', () => {
  let component: EditbookComponent;
  let fixture: ComponentFixture<EditbookComponent>;
  let booksServiceMock: any;
  let loadingServiceMock: any;
  let authServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(() => {
    booksServiceMock = {
      getById: jasmine.createSpy('getById').and.returnValue(of({
        id: 1,
        title: 'Libro 1',
        author: 'Autor',
        genre: 'Genero',
        publication: 2020
      })),
      update: jasmine.createSpy('update').and.returnValue(of({}))
    };

    loadingServiceMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide')
    };

    authServiceMock = {
      isAdmin: jasmine.createSpy('isAdmin').and.returnValue(true)
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    activatedRouteMock = {
      snapshot: { paramMap: new Map([['id', '1']]) }
    };

    TestBed.configureTestingModule({
      imports: [EditbookComponent],
      providers: [
        { provide: BooksService, useValue: booksServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });

    fixture = TestBed.createComponent(EditbookComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debería cargar libro correctamente', () => {
    component.ngOnInit();
    expect(booksServiceMock.getById).toHaveBeenCalledWith(1);
    expect(component.book?.title).toBe('Libro 1');
    expect(component.loading).toBeFalse();
    expect(component.form.value.title).toBe('Libro 1');
  });

  it('ngOnInit debería manejar error al cargar libro', () => {
    booksServiceMock.getById.and.returnValue(throwError(() => new Error('Error')));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(component.book).toBeUndefined();
    expect(component.loading).toBeFalse();
    expect(component.mensajeError).toBe('No se pudo obtener el libro');
    expect(console.error).toHaveBeenCalled();
  });

  it('onSubmit debería actualizar libro y navegar', () => {
    spyOn(window, 'alert');

    component.bookId = 1;
    component.form.setValue({
      title: 'Nuevo',
      author: 'Autor',
      genre: 'Genero',
      publication: 2021
    });

    component.onSubmit();

    expect(loadingServiceMock.show).toHaveBeenCalled();
    expect(booksServiceMock.update).toHaveBeenCalledWith(1, jasmine.objectContaining({
      title: 'Nuevo',
      author: 'Autor',
      genre: 'Genero',
      publication: 2021
    }));
    expect(component.mensajeOk).toBe('Libro actualizado correctamente');
    expect(window.alert).toHaveBeenCalledWith('Libro actualizado correctamente');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/books']);
    expect(loadingServiceMock.hide).toHaveBeenCalled();
  });

  it('onSubmit debería manejar formulario inválido', () => {
    component.bookId = 1;
    component.form.setErrors({ invalid: true });

    component.onSubmit();

    expect(component.mensajeError).toBe('Completa los campos requeridos');
    expect(loadingServiceMock.hide).toHaveBeenCalled();
  });

  it('onSubmit debería manejar error en update', () => {
    spyOn(window, 'alert');
    booksServiceMock.update.and.returnValue(throwError(() => new Error('Error')));

    component.bookId = 1;
    component.form.setValue({
      title: 'Nuevo',
      author: 'Autor',
      genre: 'Genero',
      publication: 2021
    });

    spyOn(console, 'error');
    component.onSubmit();

    expect(component.mensajeError).toBe('Error al actualizar libro');
    expect(console.error).toHaveBeenCalled();
    expect(loadingServiceMock.hide).toHaveBeenCalled();
  });
});