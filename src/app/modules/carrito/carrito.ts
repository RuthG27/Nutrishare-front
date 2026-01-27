import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

type CartItem = {
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
};

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class CarritoComponent {
  protected readonly orderId = '8754873598';
  protected readonly shippingCost = 3.95;
  protected readonly items: CartItem[] = [
    {
      name: 'Aceite de oliva virgen',
      description: '1,20 € / 100 ml',
      price: 1.2,
      unit: 'botella',
      image: 'https://imagenes.ruthunir.com/ingredientes/aceite-de-oliva-virgen.png',
      quantity: 1,
    },
    {
      name: 'Pepino',
      description: '0,30 € / unidad',
      price: 0.3,
      unit: 'unidad',
      image: 'https://imagenes.ruthunir.com/ingredientes/pepino.png',
      quantity: 1,
    },
    {
      name: 'Limón',
      description: '0,40 € / unidad',
      price: 0.4,
      unit: 'unidad',
      image: 'https://imagenes.ruthunir.com/ingredientes/limon.png',
      quantity: 1,
    },
    {
      name: 'Tomate',
      description: '0,50 € / unidad',
      price: 0.5,
      unit: 'unidad',
      image: 'https://imagenes.ruthunir.com/ingredientes/tomate.png',
      quantity: 2,
    },
    {
      name: 'Queso feta',
      description: '2,30 € / bloque',
      price: 2.3,
      unit: 'bloque',
      image: 'https://imagenes.ruthunir.com/ingredientes/queso-feta.png',
      quantity: 1,
    },
    {
      name: 'Pepino',
      description: '0,30 € / unidad',
      price: 0.3,
      unit: 'unidad',
      image: 'https://imagenes.ruthunir.com/ingredientes/pepino.png',
      quantity: 3,
    },
    {
      name: 'Albahaca fresca',
      description: '0,90 € / manojo',
      price: 0.9,
      unit: 'manojo',
      image: 'https://imagenes.ruthunir.com/ingredientes/albahaca.png',
      quantity: 1,
    },
    {
      name: 'Pan de pita',
      description: '1,50 € / paquete',
      price: 1.5,
      unit: 'paquete',
      image: 'https://imagenes.ruthunir.com/ingredientes/pan-de-pita.png',
      quantity: 1,
    },
  ];

  protected get subtotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  protected get total(): number {
    return this.subtotal + this.shippingCost;
  }
}
