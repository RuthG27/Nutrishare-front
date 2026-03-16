import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recetas, Receta } from '../../../services/recetas';

@Component({
  selector: 'app-favoritas',
  imports: [RouterLink],
  templateUrl: './favoritas.html',
  styleUrl: './favoritas.css',
})
export class FavoritasComponent {
  recetas_favoritas: Receta[] = [];

  constructor(private recetasService: Recetas) {
    this.recetas_favoritas = this.recetasService.getRecetasGuardadas();
  }

  eliminarFavorita(id: string): void {
    this.recetasService.eliminarReceta(id);
    // Refresca la referencia local
    this.recetas_favoritas = this.recetasService.getRecetasGuardadas();
  }
}