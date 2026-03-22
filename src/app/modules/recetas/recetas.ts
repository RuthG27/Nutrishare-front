import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Receta, RecetasService } from '../../services/recetas';
import { Producto, ProductosService } from '../../services/productos';
import { FormRecetasComponent } from '../../components/form-recetas/form-recetas';
import { CommonModule } from '@angular/common';
import { AuthRestService } from '../../features/auth/services/auth-rest.service';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [RouterLink, FormsModule, FormRecetasComponent, CommonModule],
  templateUrl: './recetas.html',
  styleUrls: ['./recetas.css'],
})
export class RecetasComponent implements OnInit {
  recetas: Receta[] = [];
  listado_recetas_filtrado: Receta[] = [];
  favoritosIds = new Set<string>();

  opcionesCocina: string[] = [];
  opcionesCategoria: string[] = [];
  opcionesDificultad: string[] = [];
  opcionesIngredientesProductos: Producto[] = [];
  opcionesTiempoPreparacion: string[] = [];
  opcionesNutrientesTotales: string[] = [];
  opcionesPuntuacion: string[] = [];

  mostrarFormulario = false;

  filtros = {
    nombre: '',
    cocina: '',
    categoria: '',
    dificultad: '',
    tiempo_preparacion: '',
    ingrediente: '',
    nutrientes_totales: '',
    puntuacion: '',
  };

  isLogged: boolean = false;

  constructor(
    private recetasService: RecetasService,
    private productosService: ProductosService,
    private authService: AuthRestService,
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    if (this.isLogged) {
      this.cargarFavoritas();
    }

    this.authService.loginEmitter.subscribe((logged: boolean) => {
      this.isLogged = logged;
      if (logged) {
        this.cargarFavoritas();
        return;
      }

      this.favoritosIds.clear();
    });
    this.cargarRecetas();
  }

  private getRecetaIdFromFavorito(item: any): string | null {
    return (
      item?.receta?._id ??
      item?.recetaId ??
      item?.receta?._id?.toString?.() ??
      item?.receta?.id?.timestamp?.toString?.() ??
      null
    );
  }

  private cargarFavoritas(): void {
    this.recetasService.getFavoritos().subscribe({
      next: (response: any) => {
        const favoritos = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.body?.data)
              ? response.body.data
              : [];

        this.favoritosIds = new Set(
          favoritos
            .map((favorito: any) => this.getRecetaIdFromFavorito(favorito))
            .filter((id: string | null): id is string => !!id),
        );
      },
      error: () => {
        this.favoritosIds.clear();
      },
    });
  }

  esFavorita(recetaId: string): boolean {
    return this.favoritosIds.has(recetaId);
  }

  cargarRecetas(): void {
    this.recetasService.getRecetas().subscribe((recetas: Receta[]) => {
      this.recetas = recetas;
      this.listado_recetas_filtrado = [...recetas];

      this.opcionesCocina = this.posiblesValores('cocina');
      this.opcionesCategoria = this.posiblesValores('categoria');
      this.opcionesDificultad = this.posiblesValores('dificultad');
      this.opcionesNutrientesTotales = this.posiblesValores('nutrientes_totales');
      this.opcionesPuntuacion = this.posiblesValores('puntuacion');

      this.productosService.getProductos().subscribe((productos: Producto[]) => {
        this.opcionesIngredientesProductos = productos.sort((a, b) =>
          a.nombre.localeCompare(b.nombre),
        );
      });
    });
  }

  posiblesValores(atributo: keyof Receta): string[] {
    return Array.from(new Set(this.recetas.map((elem) => String(elem[atributo]))));
  }

  getNombreIngredienteSeleccionado(): string {
    if (!this.filtros.ingrediente) {
      return 'Todos los ingredientes';
    }

    const ingrediente = this.opcionesIngredientesProductos.find(
      (prod) => prod._id === this.filtros.ingrediente,
    );

    return ingrediente?.nombre ?? 'Todos los ingredientes';
  }

  aplicarFiltros(): void {
    this.listado_recetas_filtrado = this.recetas.filter((r) => {
      return (
        (this.filtros.nombre === '' ||
          r.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase())) &&
        (this.filtros.cocina === '' || r.cocina === this.filtros.cocina) &&
        (this.filtros.categoria === '' || r.categoria === this.filtros.categoria) &&
        (this.filtros.dificultad === '' || r.dificultad === this.filtros.dificultad) &&
        (this.filtros.ingrediente === '' || r.ingredientes.includes(this.filtros.ingrediente))
      );
    });
  }

  borrarFiltros(): void {
    this.filtros = {
      nombre: '',
      cocina: '',
      categoria: '',
      dificultad: '',
      tiempo_preparacion: '',
      ingrediente: '',
      nutrientes_totales: '',
      puntuacion: '',
    };
    this.listado_recetas_filtrado = [...this.recetas];
  }

  guardarFavorita(receta: Receta): void {
    if (!this.isLogged || !receta?._id) {
      return;
    }

    if (this.esFavorita(receta._id)) {
      this.recetasService.eliminarFavorito(receta._id).subscribe({
        next: () => {
          this.favoritosIds.delete(receta._id);
        },
      });
      return;
    }

    this.recetasService.agregarFavorito(receta._id).subscribe({
      next: () => {
        this.favoritosIds.add(receta._id);
      },
    });
  }

  //FORMULARIO
  abrirFormularioCrear(): void {
    console.log('Abriendo formulario de crear receta');
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.cargarRecetas();
  }
}
