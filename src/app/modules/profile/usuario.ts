import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRestService } from '../../features/auth/services/auth-rest.service';
import { UserRestService } from '../../features/user/services/user-rest.service';
import { Receta, RecetaService } from '../../features/receta/receta.service';
import { Productos } from '../../services/productos';
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

  selectedRecipe: Receta | null = null;
  isModalVisible: boolean = false;

  constructor(
    private authRestService: AuthRestService,
    private userRestService: UserRestService,
    private recetaService: RecetaService,
    private productosService: Productos,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userData = this.authRestService.getUserData();
    this.loadRecipes();
  }

  loadRecipes() {
    // Por ahora usamos datos mock hasta conectar con el back-end
    // TODO: Implementar llamada real al back-end cuando esté listo
    this.recetaService.obtenerTodas().subscribe({
      next: (recetas) => {
        this.savedRecipes = recetas.slice(0, 8);
        this.publishedRecipes = recetas.slice(8, 12);
      },
      error: (error) => {
        console.error('Error cargando recetas:', error);
        // Fallback a datos vacíos
        this.savedRecipes = [];
        this.publishedRecipes = [];
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
    const productos = this.productosService.getProductos();
    const producto = productos.find((p: any) => p._id === ingredientId);
    return producto ? producto.nombre : ingredientId;
  }

  navigateToRecipeDetail(recipe: Receta) {
    // TODO: Implementar navegación a detalle de receta con id correcto
    this.router.navigate(['/recetas', '74f1a0000000000000000101']);
  }

  navigateToEditRecipe(recipe: Receta) {
    // TODO: Implementar navegación a edición de receta con id correcto
    this.router.navigate(['/recetas/editar', '74f1a0000000000000000101']);
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
