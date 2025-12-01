import { Injectable } from '@angular/core';                   // Para declarar un servicio inyectable
import { HttpClient } from '@angular/common/http';            // Cliente HTTP nativo de Angular
import { Observable } from 'rxjs';                            // Mecanismo reactivo para respuestas asíncronas
import { environment } from '../../environments/environment'; // Donde está la URL base del backend
import { Book } from '../models/book';     // ✅ importar modelo desde /models

@Injectable({
  providedIn: 'root' // (Semana 3) Disponible en toda la app sin declararlo en un módulo
})
export class BooksService {

  private readonly apiUrl = `${environment.apiBaseUrl}/books`;

  // Angular "inyecta" HttpClient para poder hacer solicitudes HTTP
  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  create(data: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
