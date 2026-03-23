import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from '../../services/productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.html',
  styleUrls: ['./productos.css'],
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    // Nos suscribimos al Observable para obtener los productos desde Spring
    this.productosService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data;
      console.log('Productos cargados:', this.productos);
    });
  }
}