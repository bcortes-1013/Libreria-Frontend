import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatebookComponent } from './create-book.component';
import { BooksService } from 'src/app/services/books.service';
import { LoadingService } from 'src/app/services/loading.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreatebookComponent', () => {
  let component: CreatebookComponent;
  let fixture: ComponentFixture<CreatebookComponent>;
  let booksServiceMock: any;
  let loadingServiceMock: any;

  beforeEach(() => {
    booksServiceMock = {
      create: jasmine.createSpy('create').and.returnValue(of({ title: 'Libro Test' }))
    };

    loadingServiceMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide')
    };

    TestBed.configureTestingModule({
      imports: [CreatebookComponent, RouterTestingModule],
      providers: [
        { provide: BooksService, useValue: booksServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock }
      ]
    });

    fixture = TestBed.createComponent(CreatebookComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit debería manejar formulario inválido', () => {
    component.form.setErrors({ invalid: true });

    component.onSubmit();

    expect(component.mensajeError).toBe('Completa los campos requeridos');
    expect(loadingServiceMock.hide).toHaveBeenCalled();
  });

  it('onSubmit debería crear libro exitosamente', () => {
    spyOn(console, 'error');

    component.form.setValue({
      title: 'Libro Test',
      author: 'Autor Test',
      genre: 'Genero Test',
      publication: 2023
    });

    component.onSubmit();

    expect(loadingServiceMock.show).toHaveBeenCalled();
    expect(booksServiceMock.create).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Libro Test',
      author: 'Autor Test',
      genre: 'Genero Test',
      publication: 2023
    }));
    expect(component.mensajeOk).toBe('Se ha registrado el libro Libro Test exitosamente');
    expect(loadingServiceMock.hide).toHaveBeenCalled();
  });

  it('onSubmit debería manejar error en creación', () => {
    booksServiceMock.create.and.returnValue(throwError(() => new Error('Error')));
    spyOn(console, 'error');

    component.form.setValue({
      title: 'Libro Test',
      author: 'Autor Test',
      genre: 'Genero Test',
      publication: 2023
    });

    component.onSubmit();

    expect(component.mensajeError).toBe('No fue posible registrar el usuario. Verifique el email (no repetido)');
    expect(console.error).toHaveBeenCalled();
    expect(loadingServiceMock.hide).toHaveBeenCalled();
  });
});