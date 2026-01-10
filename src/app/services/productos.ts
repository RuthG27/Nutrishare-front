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
  private productos:Producto [] = [

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
  }

]

constructor(){}
getProductos():Producto[]{
  return this.productos;
}


  
}
