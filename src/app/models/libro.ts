// ===================================================================
// Semana 3 - Modelo de datos "Libro"
// ===================================================================
//
// Este modelo representa la estructura de datos que viaja entre
// el frontend (Angular) y el backend (Spring Boot).
//
// El patrón de diseño Model-Service-Component nos sugiere:
//   🔹 Model: Define la forma de los datos (Libro.ts)
//   🔹 Service: Lógica de conexión al backend (libros.service.ts)
//   🔹 Component: Interfaz y manejo visual de los datos
//
// ===================================================================

export interface Libro {
  id?: number;            // Identificador único del libro (puede ser opcional al crear uno nuevo)
  titulo: string;         // Título del libro
  autor: string;          // Autor del libro
  genero: string;         // Categoría o género literario
  anioPublicacion: number; // Año de publicación (sin "ñ" por compatibilidad JSON/TS)
}
