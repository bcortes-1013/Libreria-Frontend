import { LoginComponent } from './views/users/login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/users/register/register.component';
import { ProfileComponent } from './views/users/profile/profile.component';
import { RecoverComponent } from './views/users/recover/recover.component';
import { AdminComponent } from './views/users/admin/admin.component';
import { CreatebookComponent } from './views/books/create-book/create-book.component';
import { ListbookComponent } from './views/books/list-book/list-book.component';
import { EditbookComponent } from './views/books/edit-book/edit-book.component';
import { CatalogBookComponent } from './views/books/catalog-book/catalog-book.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },

  // ============================================================
  // LIBROS - CATÁLOGO PÚBLICO
  // ============================================================
  { path: 'books-list', component: CatalogBookComponent },

  // ============================================================
  // RUTAS DE AUTENTICACIÓN
  // ============================================================
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverComponent },

  // ============================================================
  // PERFIL DEL USUARIO (Edición)
  // ============================================================
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]      // requiere sesión activa
  },

  // ============================================================
  // LISTA DE USUARIOS (Solo ADMIN)
  // ============================================================
  {
    path: 'users',
    component: AdminComponent,
    canActivate: [AdminGuard]     // requiere ser ADMIN
  },

  // ============================================================
  // CRUD LIBROS (Solo ADMIN)
  // ============================================================
  {
    path: 'books',
    component: ListbookComponent,
    canActivate: [AdminGuard]      // ambos roles pueden ver libros
  },

  {
    path: 'books/create',
    component: CreatebookComponent,
    canActivate: [AdminGuard]     // solo ADMIN puede crear
  },

  {
    path: 'books/edit/:id',
    component: EditbookComponent,
    canActivate: [AdminGuard]     // solo ADMIN puede editar
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];