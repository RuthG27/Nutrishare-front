import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Receta } from '../../../features/receta/receta.service';
import { ProductosService } from '../../../services/productos';
import { RecetaPdfService } from '../../../features/receta/receta-pdf.service';

@Component({
  selector: 'app-recipe-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail-modal.html',
  styleUrl: './recipe-detail-modal.css',
})
export class RecipeDetailModalComponent implements OnInit {
  @Input() recipe: Receta | null = null;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  isDownloading = false;
  private ingredientNameById = new Map<string, string>();

  constructor(
    private productosService: ProductosService,
    private recetaPdfService: RecetaPdfService,
  ) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (productos: any[]) => {
        this.ingredientNameById.clear();
        productos.forEach((producto) => {
          if (producto?._id && producto?.nombre) {
            this.ingredientNameById.set(producto._id, producto.nombre);
          }
        });
      },
    });
  }

  closeModal() {
    this.close.emit();
  }

  private getRecipeAny(): any {
    return this.recipe as any;
  }

  getRecipeTime(): string {
    const recipe = this.getRecipeAny();
    return recipe?.tiempo_preparacion ?? recipe?.tiempoPreparacion ?? '-';
  }

  getRecipeNutrients() {
    const recipe = this.getRecipeAny();
    const snake = recipe?.nutrientes_totales;
    const camel = recipe?.nutrientes;

    return {
      calorias: snake?.calories ?? camel?.calorias ?? 0,
      proteinas: snake?.protein_g ?? camel?.proteinas ?? 0,
      grasasTotales: snake?.fat_g ?? camel?.grasasTotales ?? 0,
      carbohidratos: snake?.carbs_g ?? camel?.carbohidratos ?? 0,
      fibra: snake?.fiber_g ?? camel?.fibra ?? 0,
    };
  }

  getIngredientName(ingrediente: any): string {
    if (!ingrediente) return 'Ingrediente';

    if (typeof ingrediente === 'string') {
      return this.ingredientNameById.get(ingrediente) ?? ingrediente;
    }

    if (typeof ingrediente === 'object') {
      const id = ingrediente._id ?? ingrediente.id ?? ingrediente.timestamp?.toString?.();
      if (id && this.ingredientNameById.has(id)) {
        return this.ingredientNameById.get(id) ?? id;
      }
      return ingrediente.nombre ?? `Ingrediente ${id ?? ''}`.trim();
    }

    return String(ingrediente);
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'full' : 'empty');
    }
    return stars;
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  async downloadPdf() {
    if (!this.recipe || this.isDownloading) return;

    try {
      this.isDownloading = true;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await this.recetaPdfService.downloadRecipePdf(this.recipe);
    } catch (error) {
      console.error('Error descargando PDF:', error);
    } finally {
      this.isDownloading = false;
    }
  }

  canDownload(): boolean {
    return this.recipe ? this.recetaPdfService.canGeneratePdf(this.recipe) : false;
  }
}
