import { Component } from '@angular/core';
import { Receta } from '../../services/recetas';
import { Recetas } from '../../services/recetas';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-recetas',
  imports: [RouterLink],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css',
})
export class RecetasComponent {
  recetas: Receta[] = [];

  constructor(private receta: Recetas) {
    this.recetas = this.receta.getRecetas();
  }
}
