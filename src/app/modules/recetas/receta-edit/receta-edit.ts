import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from '../../../services/recetas';
import { Recetas } from '../../../services/recetas';
import { Productos } from '../../../services/productos';

@Component({
  selector: 'app-receta-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './receta-edit.html',
  styleUrl: './receta-edit.css',
})
export class RecetaEdit implements OnInit {
  recetaId: string = '';
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
  loading = true;

  cocinas = [
    'Mediterránea',
    'Asiática',
    'Mexicana',
    'Italiana',
    'Española',
    'Griega',
    'India',
    'Japonesa',
    'Otra',
  ];
  categorias = ['Ensalada', 'Sopa', 'Principal', 'Postre', 'Aperitivo', 'Desayuno', 'Snack'];
  dificultades = ['Fácil', 'Media', 'Difícil'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetasService: Recetas,
    private productosService: Productos,
  ) {}

  ngOnInit(): void {
    this.recetaId = this.route.snapshot.paramMap.get('id') || '';
    if (this.recetaId) {
      this.cargarReceta();
    } else {
      this.errorMessage = 'ID de receta no encontrado';
      this.loading = false;
    }
  }

  cargarReceta(): void {
    const todasLasRecetas = this.recetasService.getRecetas();
    const receta = todasLasRecetas.find((r) => r._id === this.recetaId);

    if (receta) {
      const todosLosProductos = this.productosService.getProductos();
      const nombresIngredientes = receta.ingredientes
        .map((id) => todosLosProductos.find((p) => p._id === id))
        .filter((producto) => producto !== undefined)
        .map((producto) => producto!.nombre);

      this.recetaForm = {
        nombre: receta.nombre,
        cocina: receta.cocina,
        categoria: receta.categoria,
        dificultad: receta.dificultad,
        tiempo_preparacion: receta.tiempo_preparacion,
        img: receta.img,
        pasos: [...receta.pasos],
        ingredientes: nombresIngredientes.length > 0 ? nombresIngredientes : [''],
      };
    } else {
      this.errorMessage = 'Receta no encontrada';
    }

    this.loading = false;
  }

  agregarPaso(): void {
    this.recetaForm.pasos.push('');
  }

  eliminarPaso(index: number): void {
    if (this.recetaForm.pasos.length > 1) {
      this.recetaForm.pasos.splice(index, 1);
    }
  }

  agregarIngrediente(): void {
    this.recetaForm.ingredientes.push('');
  }

  eliminarIngrediente(index: number): void {
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

  actualizarReceta(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.validarFormulario()) {
      setTimeout(() => {
        this.errorMessage = '';
      }, 4000);
      return;
    }

    const recetaActualizada = {
      ...this.recetaForm,
      pasos: this.recetaForm.pasos.filter((p) => p.trim() !== ''),
      ingredientes: this.recetaForm.ingredientes.filter((i) => i.trim() !== ''),
    };

    console.log('Receta a actualizar:', recetaActualizada);

    this.successMessage = 'Receta actualizada exitosamente';
    setTimeout(() => {
      this.router.navigate(['/recetas', this.recetaId]);
    }, 2000);
  }

  cancelar(): void {
    this.router.navigate(['/recetas', this.recetaId]);
  }
}
