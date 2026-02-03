import { Component } from '@angular/core';
import { Receta } from '../../services/recetas';
import { Recetas } from '../../services/recetas';
import { Producto } from '../../services/productos';
import { Productos } from '../../services/productos';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-recetas',
  imports: [RouterLink, FormsModule],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css',
})
export class RecetasComponent {
  recetas: Receta[] = [];
  listado_recetas_filtrado: Receta[] = [];

  opcionesCocina: string[] = [];
  opcionesCategoria: string[] = [];
  opcionesDificultad: string[] = [];
  opcionesIngredientesProductos: Producto[] = [];
  opcionesTiempoPreparacion: string [] = [];
  opcionesNutrientesTotales: string [] = [];
  opcionesPuntuacion: string [] = [];

  filtros = {
    nombre: '',
    cocina: '',
    categoria: '',
    dificultad: '',
    tiempo_preparacion: '',
    ingrediente: [] as string[],
    nutrientes_totales: '',
    puntuacion: ''  
  }

  posiblesValores(atributo: keyof Receta): string[] {
    return Array.from(new Set(this.recetas.map(elem => String(elem[atributo]))));
  }

  constructor(private receta: Recetas, private productosService: Productos) {
    this.recetas = this.receta.getRecetas();

    //inicialmente el listado_recetas:filtrado será todas las recetas
    this.listado_recetas_filtrado = [...this.recetas];

    this.opcionesCocina = this.posiblesValores("cocina");
    this.opcionesCategoria = this.posiblesValores("categoria");
    this.opcionesDificultad = this.posiblesValores("dificultad");
    this.opcionesNutrientesTotales = this.posiblesValores("nutrientes_totales");
    this.opcionesPuntuacion = this.posiblesValores("puntuacion");

    const idsIngredientesUsados = Array.from(
      new Set(this.recetas.flatMap((r) => r.ingredientes))
    );

    const todosLosProductos = this.productosService.getProductos();
      this.opcionesIngredientesProductos = todosLosProductos
        .filter((p) => idsIngredientesUsados.includes(p._id))
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  
  aplicarFiltros(){
    //confiamos en que filtros está actualizado con los filtros
    //p.ej.
    //filtros = {cocina: 'Griega', categoria: 'desayuno'}
    console.log(this.filtros);

    //filtramos recetas
    //creamos listado_recetas_filtrado para que no se 
    this.listado_recetas_filtrado = this.recetas.filter((r) => {

      return(
        //El nombre no tiene por qué coincidir 
        (this.filtros.nombre === '' || r.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase())) &&
        (this.filtros.cocina === '' || r.cocina === this.filtros.cocina) && 
        (this.filtros.categoria === '' || r.categoria === this.filtros.categoria) &&
        //corta el tiempo de preparación donde tenga el espacio, coge el primer valor
        (this.filtros.tiempo_preparacion === '' || Number(r.tiempo_preparacion.split(' ')[0]) === Number(this.filtros.tiempo_preparacion)) &&
        (this.filtros.dificultad === '' || r.dificultad == this.filtros.dificultad) &&
        (this.filtros.ingrediente.length === 0 || this.filtros.ingrediente.every(idIng => r.ingredientes.includes(idIng)))
      );
        
    });
  }

  //Recibe el id de la receta que quiere guardar
  //void -> no calcula nada
  guardarFavorita(receta: Receta): void{
    this.receta.guardarReceta(receta);
  }

  borrarFiltros(){
    this.filtros = {
      nombre: '',
      cocina: '',
      categoria: '',
      dificultad: '',
      tiempo_preparacion: '',
      ingrediente: [],
      nutrientes_totales: '',
      puntuacion: ''  
    };

    this.listado_recetas_filtrado = [...this.recetas];
  }

}
