import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Recetas, Receta } from '../../../services/recetas';
import { Productos, Producto } from '../../../services/productos';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class DetalleComponent {
  recetaSeleccionada?: Receta;

  ingredientesSeleccionados: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private recetasService: Recetas,
    private productosService: Productos
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID de la receta:', id);

    if (id) {
      const todasLasRecetas = this.recetasService.getRecetas();
      this.recetaSeleccionada = todasLasRecetas.find((r) => r._id === id);
      console.log('Receta encontrada:', this.recetaSeleccionada);

      if (this.recetaSeleccionada) {
        const todosLosProductos = this.productosService.getProductos();

        this.ingredientesSeleccionados = this.recetaSeleccionada.ingredientes
          .map((ingredienteId) =>
            todosLosProductos.find((p) => p._id === ingredienteId)
          )

          .filter((p): p is Producto => !!p);

        console.log('Ingredientes (productos) encontrados:', this.ingredientesSeleccionados);
      }
    }
  }

  volverAtras() {
    history.back();
  }
}
