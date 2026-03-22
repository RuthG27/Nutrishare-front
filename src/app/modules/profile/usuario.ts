import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRestService } from '../../features/auth/services/auth-rest.service';
import { UserRestService } from '../../features/user/services/user-rest.service';
import { Receta, RecetaService } from '../../features/receta/receta.service';
import { ProductosService } from '../../services/productos';
import { Router } from '@angular/router';
import { RecipeDetailModalComponent } from '../../components/modals/recipe-detail-modal/recipe-detail-modal';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, FormsModule, RecipeDetailModalComponent],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class UsuarioComponent implements OnInit {
  userData: any = null;
  isLogged = false;
  isEditing = false;
  errorMessage = '';
  successMessage = '';
  editForm = {
    name: '',
    email: '',
    password: '',
  };

  savedRecipes: Receta[] = [];
  publishedRecipes: Receta[] = [];
  favoritosIds = new Set<string>();
  allProducts: any[] = [];

  selectedRecipe: Receta | null = null;
  isModalVisible: boolean = false;

  constructor(
    private authRestService: AuthRestService,
    private userRestService: UserRestService,
    private recetaService: RecetaService,
    private productosService: ProductosService,
    private router: Router,
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
    const userData = this.authRestService.getUserData();
    const fromUserData = this.normalizeId(userData?._id ?? userData?.id);
    if (fromUserData) return fromUserData;
    return this.normalizeId(this.authRestService.getUserIdFromToken());
  }

  private getRecipeOwnerId(recipe: any): string | null {
    return this.normalizeId(
      recipe?.userId ??
        recipe?.usuarioId ??
        recipe?.authorId ??
        recipe?.ownerId ??
        recipe?.user?._id ??
        recipe?.user?.id ??
        recipe?.usuario?._id ??
        recipe?.usuario?.id,
    );
  }

  canManageRecipe(recipe: Receta): boolean {
    if (!this.authRestService.isLogged()) {
      return false;
    }

    const currentUserId = this.getCurrentUserId();
    const ownerId = this.getRecipeOwnerId(recipe);

    return !!currentUserId && !!ownerId && currentUserId === ownerId;
  }

  ngOnInit() {
    this.isLogged = this.authRestService.isLogged();
    this.userData = this.authRestService.getUserData();

    if (this.isLogged) {
      this.loadPublishedRecipes();
      this.loadSavedRecipes();
    }

    this.authRestService.loginEmitter.subscribe((logged: boolean) => {
      this.isLogged = logged;
      if (logged) {
        this.userData = this.authRestService.getUserData();
        this.loadPublishedRecipes();
        this.loadSavedRecipes();
        return;
      }

      this.publishedRecipes = [];
      this.savedRecipes = [];
      this.favoritosIds.clear();
    });

    this.productosService.getProductos().subscribe((productos) => {
      this.allProducts = productos;
    });
  }

  private getRecipeId(recipe: any): string | null {
    return recipe?._id ?? recipe?.id?.timestamp?.toString?.() ?? null;
  }

  private getRecetaFromFavorito(item: any): Receta | null {
    const receta = item?.receta ?? item?.recipe ?? item;
    return receta || null;
  }

  loadSavedRecipes() {
    if (!this.isLogged) {
      this.savedRecipes = [];
      this.favoritosIds.clear();
      return;
    }

    this.recetaService.getFavoritos().subscribe({
      next: (response: any) => {
        const favoritos = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.body?.data)
              ? response.body.data
              : [];

        const recetaIds = favoritos
          .map((favorito: any) => favorito.recetaId)
          .filter((id: string | undefined): id is string => !!id);

        if (recetaIds.length === 0) {
          this.savedRecipes = [];
          this.favoritosIds.clear();
          return;
        }

        this.recetaService.obtenerTodas().subscribe({
          next: (todasLasRecetas: any[]) => {
            const recetasFavoritas = todasLasRecetas.filter((receta: any) =>
              recetaIds.includes(receta._id),
            );

            this.savedRecipes = recetasFavoritas;
            this.favoritosIds = new Set(recetaIds);
          },
          error: (error) => {
            console.error('Error obteniendo todas las recetas:', error);
            this.savedRecipes = [];
            this.favoritosIds.clear();
          },
        });
      },
      error: (error) => {
        console.error('Error cargando favoritas:', error);
        this.savedRecipes = [];
        this.favoritosIds.clear();
      },
    });
  }

  loadPublishedRecipes() {
    if (!this.isLogged) {
      this.publishedRecipes = [];
      return;
    }

    this.recetaService.getMisRecetas().subscribe({
      next: (response: any) => {
        const recetas = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.body?.data)
              ? response.body.data
              : [];

        this.publishedRecipes = recetas;
      },
      error: (error) => {
        console.error('Error cargando recetas:', error);
        this.publishedRecipes = [];
      },
    });
  }

  trackRecipe(index: number, recipe: any): string | number {
    return recipe?.id?.timestamp ?? recipe?._id ?? index;
  }

  esFavorita(recipe: Receta): boolean {
    const id = this.getRecipeId(recipe);
    return !!id && this.favoritosIds.has(id);
  }

  toggleFavorita(recipe: Receta): void {
    const recipeId = this.getRecipeId(recipe);
    if (!recipeId) {
      return;
    }

    if (this.favoritosIds.has(recipeId)) {
      this.recetaService.eliminarFavorito(recipeId).subscribe({
        next: () => {
          this.favoritosIds.delete(recipeId);
          this.savedRecipes = this.savedRecipes.filter(
            (saved) => this.getRecipeId(saved) !== recipeId,
          );
        },
      });
      return;
    }

    this.recetaService.agregarFavorito(recipeId).subscribe({
      next: () => {
        this.favoritosIds.add(recipeId);
        this.loadSavedRecipes();
      },
    });
  }

  initializeEditForm() {
    if (this.userData) {
      this.editForm = {
        name: this.userData.name || '',
        email: this.userData.email || '',
        password: '',
      };
    }
  }

  editUser() {
    this.isEditing = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  saveProfile() {
    this.errorMessage = '';
    this.successMessage = '';

    const payload: any = {
      name: this.editForm.name,
      email: this.editForm.email,
    };

    if (this.editForm.password) {
      payload.password = this.editForm.password;
    }

    this.userRestService.updateMe(payload).subscribe({
      next: (res) => {
        const updatedUser =
          (res as any)?.body?.data?.user ?? (res as any)?.body?.data ?? (res as any)?.body ?? null;
        const localUpdate = updatedUser && typeof updatedUser === 'object' ? updatedUser : payload;

        this.authRestService.setUserData(localUpdate);
        this.userData = this.authRestService.getUserData();
        this.editForm.password = '';
        this.isEditing = false;
        this.successMessage = '¡Perfil actualizado con éxito!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error actualizando el perfil:', err);
        this.errorMessage = this.makeUpdateProfileErrorText(err);
        setTimeout(() => {
          this.errorMessage = '';
        }, 4000);
      },
    });
  }

  makeUpdateProfileErrorText(error: any) {
    switch (error?.status) {
      case 0:
        return 'No se puede conectar con el servidor';

      case 400:
        return 'Datos inválidos';

      case 401:
        return 'No estás autenticado';

      case 403:
        return 'No tienes permisos para editar este perfil';

      case 404:
        return 'Usuario no encontrado';

      case 500:
        return 'El servidor no se encuentra disponible';

      default:
        return 'Ha ocurrido un error al actualizar el perfil';
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.initializeEditForm();
  }

  logout() {
    this.authRestService.logout();
    this.router.navigate(['/login']);
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'full' : 'empty');
    }
    return stars;
  }

  scrollRecipes(container: string, direction: 'left' | 'right') {
    const element = document.querySelector(`.${container} .recipes-container`) as HTMLElement;
    if (element) {
      const scrollAmount = 300;
      const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount;
      element.scrollBy({ left: scrollDirection, behavior: 'smooth' });
    }
  }

  navegarASubirReceta() {
    this.router.navigate(['/recetas/crear']);
  }

  deleteAccount() {
    if (
      confirm(
        '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer y perderás todos tus datos.',
      )
    ) {
      this.errorMessage = '';
      this.successMessage = '';
      this.userRestService.deleteMe().subscribe({
        next: () => {
          this.authRestService.logout();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error eliminando la cuenta:', err);
          this.errorMessage = this.makeDeleteAccountErrorText(err);
          setTimeout(() => {
            this.errorMessage = '';
          }, 4000);
        },
      });
    }
  }

  makeDeleteAccountErrorText(error: any) {
    switch (error?.status) {
      case 0:
        return 'No se puede conectar con el servidor';

      case 401:
        return 'No estás autenticado';

      case 403:
        return 'No tienes permisos para eliminar esta cuenta';

      case 404:
        return 'Usuario no encontrado';

      case 500:
        return 'El servidor no se encuentra disponible';

      default:
        return 'Ha ocurrido un error al eliminar la cuenta';
    }
  }

  getIngredientName(ingredientId: string): string {
    const producto = this.allProducts.find((p: any) => p._id === ingredientId);
    return producto ? producto.nombre : ingredientId;
  }

  private getRecipeNavigationId(recipe: Receta): string | null {
    const anyRecipe = recipe as any;
    return anyRecipe?._id ?? anyRecipe?.id?.timestamp?.toString() ?? null;
  }

  navigateToRecipeDetail(recipe: Receta) {
    const recipeId = this.getRecipeNavigationId(recipe);
    if (!recipeId) return;
    this.router.navigate(['/recetas', recipeId]);
  }

  navigateToEditRecipe(recipe: Receta) {
    if (!this.authRestService.isLogged()) return;
    if (!this.canManageRecipe(recipe)) return;

    const recipeId = this.getRecipeNavigationId(recipe);
    if (!recipeId) return;
    this.router.navigate(['/recetas/editar', recipeId]);
  }

  openRecipeModal(recipe: Receta) {
    this.selectedRecipe = recipe;
    this.isModalVisible = true;
  }

  closeRecipeModal() {
    this.isModalVisible = false;
    this.selectedRecipe = null;
  }
}
