import { Injectable } from '@angular/core';


export interface Producto{
  id: string;
  nombre:string;
  categoria:string;
  img:string;

}

@Injectable({
  providedIn: 'root',
})



export class Productos {
  private productos:Producto [] = 

[
  {
    "id": "64f1a0000000000000000001",
    "nombre": "Aceite de oliva virgen",
    "categoria": "Aceites y grasas",
    "img": "https://imagenes.ruthunir.com/ingredientes/aceite-de-oliva-virgen.png"
  },
  {
    "id": "64f1a0000000000000000002",
    "nombre": "Pepino",
    "categoria": "Hortalizas",
    "img": "https://imagenes.ruthunir.com/ingredientes/pepino.png"
  },
  {
    "id": "64f1a0000000000000000003",
    "nombre": "Limón",
    "categoria": "Frutas",
    "img": "https://imagenes.ruthunir.com/ingredientes/limon.png"
  },
  {
    "id": "64f1a0000000000000000004",
    "nombre": "Pimentón (paprika)",
    "categoria": "Hierbas y especias",
    "img": "https://imagenes.ruthunir.com/ingredientes/pimenton.png"
  },
  {
    "id": "64f1a0000000000000000005",
    "nombre": "Garbanzos cocidos",
    "categoria": "Legumbres",
    "img": "https://imagenes.ruthunir.com/ingredientes/garbanzos-cocidos.png"
  },
  {
    "id": "64f1a0000000000000000006",
    "nombre": "Ajo",
    "categoria": "Hortalizas",
    "img": "https://imagenes.ruthunir.com/ingredientes/ajo.png"
  },
  {
    "id": "64f1a0000000000000000007",
    "nombre": "Yogur natural",
    "categoria": "Lácteos",
    "img": "https://imagenes.ruthunir.com/ingredientes/yogur-natural.png"
  },
  {
    "id": "64f1a0000000000000000008",
    "nombre": "Tomate",
    "categoria": "Hortalizas",
    "img": "https://imagenes.ruthunir.com/ingredientes/tomate.png"
  },
  {
    "id": "64f1a0000000000000000009",
    "nombre": "Queso feta",
    "categoria": "Quesos",
    "img": "https://imagenes.ruthunir.com/ingredientes/queso-feta.png"
  },
  {
    "id": "64f1a000000000000000000a",
    "nombre": "Pan de pita",
    "categoria": "Pan y cereales",
    "img": "https://imagenes.ruthunir.com/ingredientes/pan-de-pita.png"
  },
  {
    "id": "64f1a000000000000000000b",
    "nombre": "Queso mozzarella",
    "categoria": "Quesos",
    "img": "https://imagenes.ruthunir.com/ingredientes/queso-mozzarella.png"
  },
  {
    "id": "64f1a000000000000000000c",
    "nombre": "Queso parmesano",
    "categoria": "Quesos",
    "img": "https://imagenes.ruthunir.com/ingredientes/queso-parmesano.png"
  },
  {
    "id": "64f1a000000000000000000d",
    "nombre": "Albahaca",
    "categoria": "Hierbas y especias",
    "img": "https://imagenes.ruthunir.com/ingredientes/albahaca.png"
  },
  {
    "id": "64f1a000000000000000000e",
    "nombre": "Orégano",
    "categoria": "Hierbas y especias",
    "img": "https://imagenes.ruthunir.com/ingredientes/oregano.png"
  },
  {
    "id": "64f1a000000000000000000f",
    "nombre": "Pan",
    "categoria": "Pan y cereales",
    "img": "https://imagenes.ruthunir.com/ingredientes/pan.png"
  },
  {
    "id": "64f1a0000000000000000010",
    "nombre": "Pasta (cocida)",
    "categoria": "Pan y cereales",
    "img": "https://imagenes.ruthunir.com/ingredientes/pasta.png"
  },
  {
    "id": "64f1a0000000000000000011",
    "nombre": "Vinagre balsámico",
    "categoria": "Salsas y vinagres",
    "img": "https://imagenes.ruthunir.com/ingredientes/vinagre-balsamico.png"
  },
  {
    "id": "64f1a0000000000000000012",
    "nombre": "Aceitunas negras",
    "categoria": "Conservas y encurtidos",
    "img": "https://imagenes.ruthunir.com/ingredientes/aceitunas-negras.png"
  },
  {
    "id": "64f1a0000000000000000013",
    "nombre": "Cebolla roja",
    "categoria": "Hortalizas",
    "img": "https://imagenes.ruthunir.com/ingredientes/cebolla-roja.png"
  },
  {
    "id": "64f1a0000000000000000014",
    "nombre": "Pimiento rojo",
    "categoria": "Hortalizas",
    "img": "https://imagenes.ruthunir.com/ingredientes/pimiento-rojo.png"
  }



]

constructor(){}
getProductos():Producto[]{
  return this.productos;
}


  
}
