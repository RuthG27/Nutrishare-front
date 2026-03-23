import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto, ProductosService } from '../../../services/productos';
import { RecetasService } from '../../../services/recetas';
import { AuthRestService } from '../../../features/auth/services/auth-rest.service';

@Component({
  selector: 'app-receta-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './receta-create.html',
  styleUrl: './receta-create.css',
})
export class RecetaCreate implements OnInit {
  form!: FormGroup;
  productos: Producto[] = [];

  errorMessage = '';
  successMessage = '';

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
    private fb: FormBuilder,
    private router: Router,
    private recetasService: RecetasService,
    private productosService: ProductosService,
    private authService: AuthRestService,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLogged()) {
      this.router.navigate(['/login']);
      return;
    }

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cocina: ['', Validators.required],
      categoria: ['', Validators.required],
      dificultad: ['', Validators.required],
      tiempo_preparacion: [null, [Validators.required, Validators.min(1)]],
      pasos: ['', Validators.required],
      ingredientes: [[]],
      nutrientes_totales: [0, Validators.required],
      img: ['https://imagenes.nutri-share.com/recetas/plato_saludable_generico.png'],
      puntuacion: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    });

    this.productosService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  onIngredienteChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const ingredientes: string[] = this.form.value.ingredientes || [];

    if (checkbox.checked) {
      this.form.patchValue({
        ingredientes: [...ingredientes, checkbox.value],
      });
    } else {
      this.form.patchValue({
        ingredientes: ingredientes.filter((id) => id !== checkbox.value),
      });
    }
  }

  guardarReceta(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.authService.isLogged()) {
      this.errorMessage = 'Debes iniciar sesión para crear recetas.';
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Revisa los campos obligatorios del formulario';
      return;
    }

    const formValue = this.form.value;
    const pasos = String(formValue.pasos || '')
      .split('\n')
      .map((paso: string) => paso.trim())
      .filter((paso: string) => paso !== '');

    const recetaPayload = {
      ...formValue,
      tiempo_preparacion: `${formValue.tiempo_preparacion} min`,
      pasos,
      nutrientes_totales: {
        calories: Number(formValue.nutrientes_totales),
        protein_g: 0,
        fat_g: 0,
        carbs_g: 0,
        fiber_g: 0,
      },
    };

    this.recetasService.crearReceta(recetaPayload).subscribe({
      next: () => {
        this.successMessage = 'Receta creada exitosamente';
        setTimeout(() => {
          this.router.navigate(['/recetas']);
        }, 1200);
      },
      error: () => {
        this.errorMessage = 'No se pudo crear la receta. Inténtalo de nuevo.';
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/usuario']);
  }
}
