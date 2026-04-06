import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Receta, RecetasService } from '../../../services/recetas';
import { Producto, ProductosService } from '../../../services/productos';
import { FormRecetasComponent } from '../../../components/form-recetas/form-recetas';
import { AuthRestService } from '../../../features/auth/services/auth-rest.service';
import { RecetaPdfService } from '../../../features/receta/receta-pdf.service';

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
  successMessage = '';
  errorMessage = '';
  isDownloading = false;

  isLogged: boolean = false;
  favoritosIds = new Set<string>();
  mostrarFormulario = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetasService: RecetasService,
    private productosService: ProductosService,
    private authService: AuthRestService,
    private recetaPdfService: RecetaPdfService,
  ) {}

  private normalizeId(value: any): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'object') {
      if (typeof value._id === 'string') return value._id;
      if (typeof value.id === 'string') return value.id;
      if (typeof value.timestamp === 'number') return String(value.timestamp);
    }
    return null;
  }

  private getCurrentUserId(): string | null {
    const userData = this.authService.getUserData();
    const fromUserData = this.normalizeId(userData?._id ?? userData?.id);
    if (fromUserData) return fromUserData;
    return this.normalizeId(this.authService.getUserIdFromToken());
  }

  private getRecipeOwnerId(receta: any): string | null {
    return this.normalizeId(
      receta?.userId ??
        receta?.usuarioId ??
        receta?.authorId ??
        receta?.ownerId ??
        receta?.user?._id ??
        receta?.user?.id ??
        receta?.usuario?._id ??
        receta?.usuario?.id,
    );
  }

  canManageSelectedReceta(): boolean {
    if (!this.isLogged || !this.recetaSeleccionada) {
      return false;
    }

    const currentUserId = this.getCurrentUserId();
    const recipeOwnerId = this.getRecipeOwnerId(this.recetaSeleccionada);

    return !!currentUserId && !!recipeOwnerId && currentUserId === recipeOwnerId;
  }

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
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.cargarRecetaDetalle(id);
    }
  }

  private cargarRecetaDetalle(id: string): void {
    this.recetasService.getRecetas().subscribe((todasLasRecetas: Receta[]) => {
      this.recetaSeleccionada = todasLasRecetas.find((r: Receta) => r._id === id);

      if (this.recetaSeleccionada) {
        this.productosService.getProductos().subscribe((todosLosProductos: Producto[]) => {
          this.ingredientesSeleccionados = this.recetaSeleccionada!.ingredientes.map(
            (ingredienteId) => todosLosProductos.find((p: Producto) => p._id === ingredienteId),
          ).filter((p): p is Producto => !!p);
        });
      }
    });
  }

  onFormularioCerrado(): void {
    this.mostrarFormulario = false;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarRecetaDetalle(id);
    }
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
      complete: () => {
        this.actualizarEstadoFavorita();
      },
    });
  }

  esFavorita(recetaId: string): boolean {
    return this.favoritosIds.has(recetaId);
  }

  actualizarEstadoFavorita(): void {
    const recetaId = this.recetaSeleccionada?._id;
    if (!recetaId) {
      return;
    }
    this.esFavorita(recetaId);
  }

  toggleFavorita(): void {
    const recetaId = this.recetaSeleccionada?._id;
    if (!this.isLogged || !recetaId) {
      return;
    }

    if (this.esFavorita(recetaId)) {
      this.recetasService.eliminarFavorito(recetaId).subscribe({
        next: () => {
          this.favoritosIds.delete(recetaId);
        },
      });
      return;
    }

    this.recetasService.agregarFavorito(recetaId).subscribe({
      next: () => {
        this.favoritosIds.add(recetaId);
      },
    });
  }

  volverAtras() {
    this.router.navigate(['/recetas']);
  }

  async downloadPdf(): Promise<void> {
    if (!this.recetaSeleccionada || this.isDownloading) return;

    try {
      this.isDownloading = true;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await this.recetaPdfService.downloadRecipePdf(this.recetaSeleccionada as any);
    } catch (error) {
      console.error('Error descargando PDF:', error);
    } finally {
      this.isDownloading = false;
    }
  }

  canDownload(): boolean {
    return this.recetaSeleccionada
      ? this.recetaPdfService.canGeneratePdf(this.recetaSeleccionada as any)
      : false;
  }

  eliminar(id: string): void {
    if (!this.canManageSelectedReceta()) {
      this.errorMessage = 'No tienes permisos para eliminar esta receta.';
      return;
    }

    if (confirm('¿Seguro que quieres eliminar esta receta?')) {
      this.successMessage = '';
      this.errorMessage = '';

      this.recetasService.eliminarReceta(id).subscribe({
        next: () => {
          this.successMessage = 'Receta eliminada correctamente';
          setTimeout(() => {
            this.router.navigate(['/recetas']);
          }, 1200);
        },
        error: () => {
          this.errorMessage = 'No se pudo eliminar la receta. Inténtalo de nuevo.';
        },
      });
    }
  }
}
