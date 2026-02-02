import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir-receta',
  imports: [CommonModule, FormsModule],
  templateUrl: './subir-receta.html',
  styleUrl: './subir-receta.css',
})
export class SubirRecetaComponent {
  recetaForm = {
    nombre: '',
    cocina: '',
    categoria: '',
    dificultad: '',
    tiempo_preparacion: '',
    img: '',
    pasos: [''],
    ingredientes: [''],
  };

  errorMessage = '';
  successMessage = '';

  cocinas = ['Mediterránea', 'Asiática', 'Mexicana', 'Italiana', 'Española', 'Griega', 'India', 'Japonesa', 'Otra'];
  categorias = ['Ensalada', 'Sopa', 'Principal', 'Postre', 'Aperitivo', 'Desayuno', 'Snack'];
  dificultades = ['Fácil', 'Media', 'Difícil'];

  constructor(private router: Router) {}

  agregarPaso() {
    this.recetaForm.pasos.push('');
  }

  eliminarPaso(index: number) {
    if (this.recetaForm.pasos.length > 1) {
      this.recetaForm.pasos.splice(index, 1);
    }
  }

  agregarIngrediente() {
    this.recetaForm.ingredientes.push('');
  }

  eliminarIngrediente(index: number) {
    if (this.recetaForm.ingredientes.length > 1) {
      this.recetaForm.ingredientes.splice(index, 1);
    }
  }

  validarFormulario(): boolean {
    if (!this.recetaForm.nombre.trim()) {
      this.errorMessage = 'El nombre de la receta es obligatorio';
      return false;
    }

    if (!this.recetaForm.cocina) {
      this.errorMessage = 'Selecciona un tipo de cocina';
      return false;
    }

    if (!this.recetaForm.categoria) {
      this.errorMessage = 'Selecciona una categoría';
      return false;
    }

    if (!this.recetaForm.dificultad) {
      this.errorMessage = 'Selecciona una dificultad';
      return false;
    }

    if (!this.recetaForm.tiempo_preparacion.trim()) {
      this.errorMessage = 'El tiempo de preparación es obligatorio';
      return false;
    }

    const pasosValidos = this.recetaForm.pasos.filter((p) => p.trim() !== '');
    if (pasosValidos.length === 0) {
      this.errorMessage = 'Debes agregar al menos un paso';
      return false;
    }

    const ingredientesValidos = this.recetaForm.ingredientes.filter((i) => i.trim() !== '');
    if (ingredientesValidos.length === 0) {
      this.errorMessage = 'Debes agregar al menos un ingrediente';
      return false;
    }

    return true;
  }

  guardarReceta() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.validarFormulario()) {
      setTimeout(() => {
        this.errorMessage = '';
      }, 4000);
      return;
    }

    const recetaLimpia = {
      ...this.recetaForm,
      pasos: this.recetaForm.pasos.filter((p) => p.trim() !== ''),
      ingredientes: this.recetaForm.ingredientes.filter((i) => i.trim() !== ''),
    };

    console.log('Receta a guardar:', recetaLimpia);

    this.successMessage = 'Receta creada exitosamente';
    setTimeout(() => {
      this.router.navigate(['/usuario']);
    }, 2000);
  }

  cancelar() {
    this.router.navigate(['/usuario']);
  }
}
