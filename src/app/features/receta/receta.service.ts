import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthRestService } from '../auth/services/auth-rest.service';

export interface Nutrientes {
  calorias: number;
  proteinas: number;
  grasasTotales: number;
  carbohidratos: number;
  fibra: number;
}

export interface Receta {
  id: {
    timestamp: number;
    date: string;
  };
  nombre: string;
  cocina: string;
  dificultad: string;
  tiempoPreparacion: string;
  pasos: string[];
  ingredientes: {
    timestamp: number;
    date: string;
  }[];
  nutrientes: Nutrientes;
  img: string;
  puntuacion: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private baseUrl = environment.url_api;

  constructor(
    private http: HttpClient,
    private authService: AuthRestService,
  ) {}

  private makeHeaders() {
    const token = this.authService.provideToken();

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    if (!!token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      headers = headers.set('x-access-token', token);
    }
    return headers;
  }

  obtenerPorId(id: string): Observable<Receta> {
    const headers = this.makeHeaders();
    return this.http.get<Receta>(this.baseUrl + `/recetas/${id}`, { headers });
  }

  obtenerTodas(): Observable<Receta[]> {
    const headers = this.makeHeaders();
    return this.http.get<Receta[]>(this.baseUrl + '/recetas/todas', { headers });
  }

  crearReceta(receta: Receta): Observable<HttpResponse<Receta>> {
    const headers = this.makeHeaders();
    return this.http.post<Receta>(this.baseUrl + '/recetas', receta, {
      observe: 'response',
      headers,
    });
  }

  actualizarReceta(receta: Receta): Observable<HttpResponse<Receta>> {
    const headers = this.makeHeaders();
    return this.http.put<Receta>(this.baseUrl + '/recetas/', receta, {
      observe: 'response',
      headers,
    });
  }

  eliminarReceta(id: string): Observable<HttpResponse<string>> {
    const headers = this.makeHeaders();
    return this.http.delete<string>(this.baseUrl + `/recetas/${id}`, {
      observe: 'response',
      headers,
    });
  }
}
