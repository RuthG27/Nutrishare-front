import { Component } from '@angular/core';
import { Producto } from '../../services/productos';
import { Productos } from '../../services/productos';


@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class ProductosSer {

  productos : Producto[] = [];

  constructor(private producto:Productos){

    this.productos = this.producto.getProductos();

  }

}
