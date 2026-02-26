import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Receta } from '../../../services/recetas';
import { Productos } from '../../../services/productos';

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

  constructor(private productosService: Productos) {}

  closeModal() {
    this.close.emit();
  }

  getIngredientName(ingredientId: string): string {
    const producto = this.productosService.getProductos().find((p) => p._id === ingredientId);
    return producto ? producto.nombre : ingredientId;
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
}
