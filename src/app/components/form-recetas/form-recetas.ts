import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Receta, RecetasService } from '../../services/recetas';
import { Producto, ProductosService } from '../../services/productos';

@Component({
  selector: 'app-form-recetas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-recetas.html',
  styleUrls: ['./form-recetas.css'],
})
export class FormRecetasComponent implements OnInit {
  @Input() receta?: Receta;
  @Output() cerrarFormulario = new EventEmitter<void>();

  form!: FormGroup;
  esEdicion = false;
  productos: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private recetasService: RecetasService,
    private productosService: ProductosService,
  ) {}

  ngOnInit(): void {
    this.esEdicion = !!this.receta;

    const pasosInicial = Array.isArray(this.receta?.pasos)
      ? this.receta?.pasos.join('\n')
      : (this.receta?.pasos ?? '');

    const caloriasInicial = this.receta?.nutrientes_totales?.calories ?? null;
    const tiempoPInicial = this.receta?.tiempo_preparacion
      ? parseInt(this.receta.tiempo_preparacion)
      : null;

    this.form = this.fb.group({
      nombre: [this.receta?.nombre ?? '', Validators.required],
      cocina: [this.receta?.cocina ?? '', Validators.required],
      categoria: [this.receta?.categoria ?? '', Validators.required],
      dificultad: [this.receta?.dificultad ?? '', Validators.required],

      tiempo_preparacion: [tiempoPInicial, [Validators.required, Validators.min(1)]],

      pasos: [pasosInicial, Validators.required],

      ingredientes: [this.receta?.ingredientes ?? [], Validators.required],

      nutrientes_totales: [caloriasInicial, Validators.required],

      img: [
        this.receta?.img ?? 'https://imagenes.nutri-share.com/recetas/plato_saludable_generico.png',
        Validators.required,
      ],

      puntuacion: [
        this.receta?.puntuacion ?? null,
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
    });

    // Cargar productos desde la BBDD
    this.productosService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    let pasosArray: string[] = [];
    if (typeof formValue.pasos === 'string') {
      pasosArray = formValue.pasos
        .split('\n')
        .map((p: string) => p.trim())
        .filter((p: string) => p !== '');
    } else {
      pasosArray = formValue.pasos;
    }

    const nutrientesObj = {
      calories: Number(formValue.nutrientes_totales),
      protein_g: 0,
      fat_g: 0,
      carbs_g: 0,
      fiber_g: 0,
    };

    const datos: any = {
      ...formValue,
      tiempo_preparacion: String(formValue.tiempo_preparacion) + ' min',
      pasos: pasosArray,
      nutrientes_totales: nutrientesObj,
    };

    if (this.esEdicion && this.receta?._id) {
      this.recetasService.actualizarReceta(this.receta._id, datos).subscribe(() => {
        alert('Receta actualizada');
        this.cerrar();
      });
    } else {
      this.recetasService.crearReceta(datos).subscribe(() => {
        alert('Receta creada');
        this.cerrar();
      });
    }
  }

  // Método para cerrar formulario
  cerrar(): void {
    this.cerrarFormulario.emit();
  }

  // Manejo de selección múltiple de ingredientes con checkboxes
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
}
