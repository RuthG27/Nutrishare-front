import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Receta, RecetasService } from '../../../services/recetas';
import { Producto, ProductosService } from '../../../services/productos';
import { FormRecetasComponent } from '../../../components/form-recetas/form-recetas';
import { AuthRestService } from '../../../features/auth/services/auth-rest.service';

@Component({
  selector: 'app-receta-detail',
  standalone: true,
  imports: [CommonModule, FormRecetasComponent],
  templateUrl: './receta-detail.html',
  styleUrls: ['./receta-detail.css'],
})
export class RecetaDetail implements OnInit {
  recetaSeleccionada?: Receta;
  ingredientesSeleccionados: Producto[] = [];

  isLogged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetasService: RecetasService,
    private productosService: ProductosService,
    private authService: AuthRestService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    this.authService.loginEmitter.subscribe((logged: boolean) => {
      this.isLogged = logged;
    });
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID de la receta:', id);

    if (id) {
      // Obtenemos todas las recetas
      this.recetasService.getRecetas().subscribe((todasLasRecetas: Receta[]) => {
        this.recetaSeleccionada = todasLasRecetas.find((r: Receta) => r._id === id);
        console.log('Receta encontrada:', this.recetaSeleccionada);

        if (this.recetaSeleccionada) {
          // Obtenemos todos los productos desde el servicio
          this.productosService.getProductos().subscribe((todosLosProductos: Producto[]) => {
            // Filtramos los productos que corresponden a los ingredientes de la receta
            this.ingredientesSeleccionados = this.recetaSeleccionada!.ingredientes
              .map((ingredienteId) =>
                todosLosProductos.find((p: Producto) => p._id === ingredienteId)
              )
              .filter((p): p is Producto => !!p);

            console.log('Ingredientes (productos) encontrados:', this.ingredientesSeleccionados);
          });
        }
      });
    }
  }

  volverAtras() {
    console.log('Volviendo atrás');
    history.back();
  }

  eliminar(id: string): void {
    console.log('Intentando eliminar receta:', id);
    if (confirm('¿Seguro que quieres eliminar esta receta?')) {
      this.recetasService.eliminarReceta(id).subscribe(() => {
        this.router.navigate(['/recetas']);
      });
    }
  }


  mostrarFormulario = false;
}
/*
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Receta, RecetasService } from '../../../services/recetas';
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
    private recetasService: Receta,
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
          .map((ingredienteId) => todosLosProductos.find((p) => p._id === ingredienteId))
          .filter((p): p is Producto => !!p);
        console.log('Ingredientes (productos) encontrados:', this.ingredientesSeleccionados);
      }
    }
  }

  volverAtras() {
    history.back();
  }
}
*/
