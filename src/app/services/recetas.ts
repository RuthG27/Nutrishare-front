import { Injectable } from '@angular/core';


export interface Receta{
  id: string;
  nombre:string;
  imagen:string;
  puntuacion: number;

}

@Injectable({
  providedIn: 'root',
})



export class Recetas {
  private recetas:Receta [] = 

[
  {
    "id": "74f1a0000000000000000101",
    "nombre": "Ensalada griega",
    "imagen": "https://imagenes.ruthunir.com/recetas/ensalada-griega.png",
    "puntuacion": 8.7
  },
  {
    "id": "74f1a0000000000000000102",
    "nombre": "Bruschetta clásica",
    "imagen": "https://imagenes.ruthunir.com/recetas/bruschetta-clasica.png",
    "puntuacion": 7.9
  },
  {
    "id": "74f1a0000000000000000103",
    "nombre": "Pasta caprese",
    "imagen": "https://imagenes.ruthunir.com/recetas/pasta-caprese.png",
    "puntuacion": 8.3
  },
  {
    "id": "74f1a0000000000000000104",
    "nombre": "Bowl mediterráneo de garbanzos",
    "imagen": "https://imagenes.ruthunir.com/recetas/bowl-mediterraneo-de-garbanzos.png",
    "puntuacion": 7.5
  },
  {
    "id": "74f1a0000000000000000105",
    "nombre": "Tzatziki con pita",
    "imagen": "https://imagenes.ruthunir.com/recetas/tzatziki-con-pita.png",
    "puntuacion": 8.1
  },
  {
    "id": "74f1a0000000000000000106",
    "nombre": "Ensalada de tomate y mozzarella",
    "imagen": "https://imagenes.ruthunir.com/recetas/ensalada-de-tomate-y-mozzarella.png",
    "puntuacion": 8.9
  },
  {
    "id": "74f1a0000000000000000107",
    "nombre": "Ratatouille",
    "imagen": "https://imagenes.ruthunir.com/recetas/ratatouille.png",
    "puntuacion": 7.8
  },
  {
    "id": "74f1a0000000000000000108",
    "nombre": "Salmorejo",
    "imagen": "https://imagenes.ruthunir.com/recetas/salmorejo.png",
    "puntuacion": 9.1
  },
  {
    "id": "74f1a0000000000000000109",
    "nombre": "Pisto manchego",
    "imagen": "https://imagenes.ruthunir.com/recetas/pisto-manchego.png",
    "puntuacion": 7.6
  },
  {
    "id": "74f1a0000000000000000110",
    "nombre": "Ensalada mediterránea de atún",
    "imagen": "https://imagenes.ruthunir.com/recetas/ensalada-mediterranea-de-atun.png",
    "puntuacion": 8.4
  },
  {
    "id": "74f1a0000000000000000111",
    "nombre": "Cuscús con verduras asadas",
    "imagen": "https://imagenes.ruthunir.com/recetas/cuscus-con-verduras-asadas.png",
    "puntuacion": 7.7
  },

  {
    "id": "74f1a0000000000000000113",
    "nombre": "Pollo al limón y orégano",
    "imagen": "https://imagenes.ruthunir.com/recetas/pollo-al-limon-y-oregano.png",
    "puntuacion": 8.6
  },
  {
    "id": "74f1a0000000000000000114",
    "nombre": "Ensalada de pasta griega",
    "imagen": "https://imagenes.ruthunir.com/recetas/ensalada-de-pasta-griega.png",
    "puntuacion": 7.9
  },
  {
    "id": "74f1a0000000000000000115",
    "nombre": "Ensalada de sardinas con tomate y cebolla",
    "imagen": "https://imagenes.ruthunir.com/recetas/ensalada-de-sardinas-con-tomate-y-cebolla.png",
    "puntuacion": 7.4
  }
]


constructor(){}
getReceta():Receta[]{
  return this.recetas;
}


  
}
