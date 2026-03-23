import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthRestService } from '../features/auth/services/auth-rest.service';

export interface NutrientesTotales {
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  fiber_g: number;
}

export interface Receta {
  _id: string;
  nombre: string;
  cocina: string;
  categoria: string;
  dificultad: string;
  tiempo_preparacion: string;
  pasos: string[];
  ingredientes: string[];
  nutrientes_totales: NutrientesTotales;
  img: string;
  puntuacion: number;
}

export interface ApiResponse<T> {
  data?: T;
}

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private apiUrl = `${environment.url_api}/recetas`; // URL SPRING
  private favoritosUrl = `${environment.url_api}/favoritos`;

  constructor(
    private http: HttpClient,
    private authRestService: AuthRestService,
  ) {}

  private getAuthHeaders(): Record<string, string> {
    const token = this.authRestService.provideToken();
    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
      'x-access-token': token,
    };
  }

  // Obtener todas las recetas desde Spring Boot
  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/todas`);
  }
  // Obtener receta por ID
  getRecetaById(id: string): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/${id}`);
  }
  // Método eliminar receta:
  eliminarReceta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  //Metodo para crear recetas:
  crearReceta(receta: Omit<Receta, '_id'>): Observable<Receta> {
    return this.http.post<Receta>(this.apiUrl, receta, {
      headers: this.getAuthHeaders(),
    });
  }
  //Método editar receta:
  actualizarReceta(id: string, receta: Receta): Observable<Receta> {
    return this.http.put<Receta>(`${this.apiUrl}/${id}`, receta, {
      headers: this.getAuthHeaders(),
    });
  }

  getFavoritos(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(this.favoritosUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  agregarFavorito(recetaId: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.favoritosUrl}/agregar/${recetaId}`,
      {},
      {
        headers: this.getAuthHeaders(),
      },
    );
  }

  eliminarFavorito(recetaId: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.favoritosUrl}/eliminar/${recetaId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
