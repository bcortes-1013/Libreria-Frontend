// =========================================================
// Semana 3 – Configuración base de Angular
// =========================================================
//
// Este archivo reemplaza al antiguo app.module.ts.
// Aquí registramos los servicios globales que usará
// toda la aplicación.
//
// Objetivos de la Semana 3:
// 1️⃣ Activar el sistema de rutas (SPA).
// 2️⃣ Habilitar el HttpClient para conectarnos
//     con el microservicio Spring Boot.
// =========================================================

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';              // Rutas (las crearemos después)
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),   // Habilita navegación entre vistas
    provideHttpClient()      // Habilita comunicación HTTP con el backend
  ]
};

// =========================================================
// Con esto, Angular queda listo para:
// ✅ Manejar rutas
// ✅ Consumir APIs REST
// =========================================================
