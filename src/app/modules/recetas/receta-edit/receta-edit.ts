import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from '../../../services/recetas';
import { RecetasService } from '../../../services/recetas';
import { Producto, ProductosService } from '../../../services/productos';
import { AuthRestService } from '../../../features/auth/services/auth-rest.service';

@Component({
  selector: 'app-receta-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './receta-edit.html',
  styleUrl: './receta-edit.css',
})
export class RecetaEdit implements OnInit {
  form!: FormGroup;
  productos: Producto[] = [];
  recetaId: string = '';
  recetaOriginal: any = null;

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
    private fb: FormBuilder,
    private recetasService: RecetasService,
    private productosService: ProductosService,
    private authService: AuthRestService,
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

  private canEditReceta(receta: any): boolean {
    if (!this.authService.isLogged()) {
      return false;
    }

    const currentUserId = this.getCurrentUserId();
    const recipeOwnerId = this.getRecipeOwnerId(receta);
    return !!currentUserId && !!recipeOwnerId && currentUserId === recipeOwnerId;
  }

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

    this.recetaId = this.route.snapshot.paramMap.get('id') || '';
    if (this.recetaId) {
      this.cargarReceta();
    } else {
      this.errorMessage = 'ID de receta no encontrado';
      this.loading = false;
    }
  }

  cargarReceta(): void {
    this.recetasService.getRecetas().subscribe((todasLasRecetas: Receta[]) => {
      const receta = todasLasRecetas.find((r) => r._id === this.recetaId);

      if (receta) {
        if (!this.canEditReceta(receta)) {
          this.errorMessage = 'No tienes permisos para editar esta receta.';
          this.loading = false;
          this.router.navigate(['/recetas', this.recetaId]);
          return;
        }

        this.recetaOriginal = receta;
        const pasos = Array.isArray(receta.pasos) ? receta.pasos.join('\n') : receta.pasos;
        const tiempoPInicial = receta.tiempo_preparacion
          ? parseInt(receta.tiempo_preparacion)
          : null;
        const caloriasInicial = receta.nutrientes_totales?.calories ?? null;

        this.form.patchValue({
          nombre: receta.nombre,
          cocina: receta.cocina,
          categoria: receta.categoria,
          dificultad: receta.dificultad,
          tiempo_preparacion: tiempoPInicial,
          pasos: pasos,
          ingredientes: receta.ingredientes || [],
          nutrientes_totales: caloriasInicial,
          img: receta.img,
          puntuacion: receta.puntuacion ?? null,
        });
        this.loading = false;
      } else {
        this.errorMessage = 'Receta no encontrada';
        this.loading = false;
      }
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

  actualizarReceta(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.authService.isLogged()) {
      this.errorMessage = 'Debes iniciar sesión para editar recetas.';
      return;
    }

    if (!this.canEditReceta(this.recetaOriginal)) {
      this.errorMessage = 'No tienes permisos para editar esta receta.';
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
      ...(this.recetaOriginal ?? {}),
      ...formValue,
      _id: this.recetaId,
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

    this.recetasService.actualizarReceta(this.recetaId, recetaPayload).subscribe({
      next: () => {
        this.successMessage = 'Receta actualizada exitosamente';
        setTimeout(() => {
          this.router.navigate(['/recetas', this.recetaId]);
        }, 1200);
      },
      error: () => {
        this.errorMessage = 'No se pudo actualizar la receta. Inténtalo de nuevo.';
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/usuario']);
  }
}
