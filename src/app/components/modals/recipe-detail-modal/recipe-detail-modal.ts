import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Receta } from '../../../features/receta/receta.service';
import { Productos } from '../../../services/productos';
import { RecetaPdfService } from '../../../features/receta/receta-pdf.service';

@Component({
  selector: 'app-recipe-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail-modal.html',
  styleUrl: './recipe-detail-modal.css',
})
export class RecipeDetailModalComponent {
  @Input() recipe: Receta | null = null;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  isDownloading = false;

  constructor(
    private productosService: Productos,
    private recetaPdfService: RecetaPdfService,
  ) {}

  closeModal() {
    this.close.emit();
  }

  getIngredientName(ingrediente: { timestamp: number; date: string }): string {
    // Por ahora mostramos el ID del ingrediente hasta tener el servicio de productos
    // TODO: Implementar resolución de nombres de productos cuando esté disponible
    return `Ingrediente ${ingrediente.timestamp}`;
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
