// ======================================================================
// Semana 3 - LibrosService (Angular → Backend)
// ======================================================================
// Objetivo de Semana 3:
// - Desarrollar un FRONT Angular que consuma el microservicio real
//   (Semana 2) por medio de APIs REST (GET/POST/PUT/DELETE).
//
// Este servicio es el "puente" entre la UI (componentes) y la API.
// Aquí usamos HttpClient para llamar a la URL del backend que
// definimos en environment.ts (http://localhost:8080/api).
// ======================================================================

// 1) Importaciones esenciales
import { Injectable } from '@angular/core';                   // Para declarar un servicio inyectable
import { HttpClient } from '@angular/common/http';            // Cliente HTTP nativo de Angular
import { Observable } from 'rxjs';                            // Mecanismo reactivo para respuestas asíncronas
import { environment } from '../../environments/environment'; // Donde está la URL base del backend
import { Libro } from '../models/libro';     // ✅ importar modelo desde /models



// 2) (Semana 3) Modelo mínimo para tipar los datos de Libros
//    - En cursos/empresas solemos mover esto a: src/app/models/libro.model.ts
//    - Lo dejamos aquí para empezar rápido; luego lo extraemos a "models/".
//export interface Libro {
 // id?: number;            // Opcional al crear un libro (el backend lo genera)
 // titulo: string;
//  autor: string;
 // genero: string;
 // anioPublicacion: number; // Si prefieres evitar tildes en código: anioPublicacion:number
//}


// 3) Decorador que registra el servicio a nivel global
@Injectable({
  providedIn: 'root' // (Semana 3) Disponible en toda la app sin declararlo en un módulo
})
export class LibrosService {

  // 4) (Semana 3) Construimos la URL base usando environment:
  //    - environment.apiBaseUrl = 'http://localhost:8080/api'
  //    - base final para libros -> 'http://localhost:8080/api/libros'
  private readonly apiUrl = `${environment.apiBaseUrl}/libros`;

  // 5) Angular nos "inyecta" HttpClient para poder hacer solicitudes HTTP
  constructor(private http: HttpClient) {}

  // ======================================================================
  // MÉTODOS CRUD (Semana 3)
  // ======================================================================

  // [GET] Obtiene todos los libros desde el backend
  // UI → LibrosService.getAll() → GET /api/libros → JSON[] de libros
  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  // [GET] Obtiene un libro por su ID
  // UI → LibrosService.getById(7) → GET /api/libros/7 → JSON libro
  getById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  // [POST] Crea un nuevo libro
  // UI → LibrosService.create(libroSinId) → POST /api/libros → libro creado
  create(data: Omit<Libro, 'id'>): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, data);
  }

  // [PUT] Actualiza un libro
  // UI → LibrosService.update(7, cambiosParciales) → PUT /api/libros/7
  update(id: number, data: Partial<Libro>): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, data);
  }

  // [DELETE] Elimina un libro
  // UI → LibrosService.delete(7) → DELETE /api/libros/7
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
// ======================================================================
// FIN del servicio (Semana 3).
// Próximo paso: probarlo con un "smoke test" simple desde AppComponent
// y luego crear componentes (listar/crear/editar/detalle) con rutas.
// ======================================================================

