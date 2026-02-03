import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRestService } from '../../features/auth/services/auth-rest.service';
import { UserRestService } from '../../features/user/services/user-rest.service';
import { Recetas, Receta } from '../../services/recetas';
import { Router } from '@angular/router';
import { ModalConfirm } from '../../components/modal-confirm/modal-confirm';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class UsuarioComponent implements OnInit, OnDestroy {
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
  private modalConfirm!: ModalConfirm;

  constructor(
    private authRestService: AuthRestService,
    private userRestService: UserRestService,
    private recetasService: Recetas,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userData = this.authRestService.getUserData();
    this.initializeEditForm();
    this.loadRecipes();
    this.modalConfirm = new ModalConfirm();
  }

  loadRecipes() {
    const allRecipes = this.recetasService.getRecetas();

    // Esto es temporal porque simula las recetas "guardadas"
    // esto me permite hacer uso de las fechitas
    this.savedRecipes = allRecipes.slice(0, 8); // Primeras 8 recetas

    // Esto es temporal porque simula las recetas "publicadas"
    this.publishedRecipes = allRecipes.slice(8, 12); // Siguientes 4 recetas
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
    this.router.navigate(['/subir-receta']);
  }

  deleteAccount() {
    this.modalConfirm.show(
      '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer y perderás todos tus datos.',
      () => {
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
      },
    );
  }

  ngOnDestroy() {
    if (this.modalConfirm) {
      this.modalConfirm.destroy();
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
}
