import { Injectable } from '@angular/core';



export interface NutrientesTotales{
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  fiber_g: number;
}
export interface RecetaJSON{
  _id: { $oid: string };
  nombre:string;
  cocina:string;
  categoria:string;
  dificultad:string;
  tiempo_preparacion:string;
  pasos:string[];
  ingredientes:{ $oid: string }[];
  nutrientes_totales:NutrientesTotales;
  img:string;
  puntuacion:number;
}
export interface Receta{
  _id: string;
  nombre:string;
  cocina:string;
  categoria:string;
  dificultad:string;
  tiempo_preparacion:string;
  pasos:string[];
  ingredientes:string[];
  nutrientes_totales:NutrientesTotales;
  img:string;
  puntuacion:number;
}

@Injectable({
  providedIn: 'root',
})



export class Recetas {
  private recetas:Receta []=[];
  private recetas_guardadas: Receta [] = [];

  constructor(){
    const recetasJSON:RecetaJSON[]=[

{
  "_id": {
    "$oid": "74f1a0000000000000000101"
  },
  "nombre": "Ensalada griega",
  "cocina": "Griega",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "10 min",
  "pasos": [
    "Lava y corta el tomate en gajos y el pepino en medias lunas finas.",
    "Corta la cebolla roja en pluma.",
    "Desmiga el queso feta en trozos.",
    "Mezcla tomate, pepino, cebolla y feta; añade aceitunas negras.",
    "Aliña con aceite de oliva, zumo de limón y orégano seco; mezcla suave y sirve frío."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000002"
    },
    {
      "$oid": "64f1a0000000000000000009"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a000000000000000000e"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000012"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 203.75,
    "protein_g": 3.48,
    "fat_g": 17.15,
    "carbs_g": 13.18,
    "fiber_g": 6.41
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-griega.png",
  "puntuacion":6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000102"
  },
  "nombre": "Bruschetta clásica",
  "cocina": "Italiana",
  "categoria": "Aperitivo",
  "dificultad": "Fácil",
  "tiempo_preparacion": "15 min",
  "pasos": [
    "Tuesta rebanadas de pan hasta dorar.",
    "Corta el tomate en dados y pica la albahaca.",
    "Mezcla tomate y albahaca con aceite de oliva y unas gotas de vinagre balsámico.",
    "Frota el pan tostado con ajo.",
    "Cubre con la mezcla de tomate y sirve al momento."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000000f"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a000000000000000000d"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000011"
    }
  ],
  "nutrientes_totales": {
    "calories": 237.83,
    "protein_g": 3.33,
    "fat_g": 17.42,
    "carbs_g": 17.62,
    "fiber_g": 1.27
  },
  "img": "https://imagenes.ruthunir.com/recetas/bruschetta-clasica.png",
  "puntuacion":8.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000103"
  },
  "nombre": "Pasta caprese",
  "cocina": "Italiana",
  "categoria": "Pasta",
  "dificultad": "Media",
  "tiempo_preparacion": "20 min",
  "pasos": [
    "Cuece la pasta en agua con sal hasta al dente y escurre.",
    "Corta tomate y mozzarella en dados; pica albahaca.",
    "Mezcla pasta, tomate y mozzarella.",
    "Aliña con aceite de oliva, añade albahaca y sirve templado."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000010"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a000000000000000000b"
    },
    {
      "$oid": "64f1a000000000000000000d"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 272.6,
    "protein_g": 5.38,
    "fat_g": 24.74,
    "carbs_g": 7.94,
    "fiber_g": 0.92
  },
  "img": "https://imagenes.ruthunir.com/recetas/pasta-caprese.png",
  "puntuacion":7.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000104"
  },
  "nombre": "Bowl mediterráneo de garbanzos",
  "cocina": "Mediterránea",
  "categoria": "Plato único",
  "dificultad": "Fácil",
  "tiempo_preparacion": "18 min",
  "pasos": [
    "Enjuaga y escurre los garbanzos cocidos.",
    "Corta pepino y tomate en dados.",
    "Mezcla yogur con ajo picado, pimentón y unas gotas de limón.",
    "Combina garbanzos, pepino y tomate; añade la salsa.",
    "Rocía con aceite de oliva y acompaña con pan de pita."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000005"
    },
    {
      "$oid": "64f1a0000000000000000002"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000007"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000003"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000004"
    },
    {
      "$oid": "64f1a000000000000000000a"
    }
  ],
  "nutrientes_totales": {
    "calories": 208.56,
    "protein_g": 5.04,
    "fat_g": 13.46,
    "carbs_g": 21.38,
    "fiber_g": 5.7
  },
  "img": "https://imagenes.ruthunir.com/recetas/bowl-mediterraneo-de-garbanzos.png",
  "puntuacion":7.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000105"
  },
  "nombre": "Tzatziki con pita",
  "cocina": "Griega",
  "categoria": "Salsa / snack",
  "dificultad": "Fácil",
  "tiempo_preparacion": "12 min",
  "pasos": [
    "Ralla el pepino y escurre el exceso de agua.",
    "Mezcla yogur con pepino rallado y ajo muy picado.",
    "Añade aceite de oliva y unas gotas de limón.",
    "Ajusta de sal y enfría 10 minutos.",
    "Sirve con pan de pita tostado."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000007"
    },
    {
      "$oid": "64f1a0000000000000000002"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    },
    {
      "$oid": "64f1a000000000000000000a"
    }
  ],
  "nutrientes_totales": {
    "calories": 235.5,
    "protein_g": 3.58,
    "fat_g": 17.57,
    "carbs_g": 17.73,
    "fiber_g": 1.27
  },
  "img": "https://imagenes.ruthunir.com/recetas/tzatziki-con-pita.png",
  "puntuacion":9.8
},
{
  "_id": {
    "$oid": "74f1a0000000000000000106"
  },
  "nombre": "Ensalada de tomate y mozzarella",
  "cocina": "Italiana",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "8 min",
  "pasos": [
    "Corta tomate y mozzarella en rodajas.",
    "Dispón alternando en el plato.",
    "Añade albahaca picada, aceite de oliva y unas gotas de vinagre balsámico.",
    "Reposa 2 minutos y sirve."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a000000000000000000b"
    },
    {
      "$oid": "64f1a000000000000000000d"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000011"
    }
  ],
  "nutrientes_totales": {
    "calories": 258.6,
    "protein_g": 4.32,
    "fat_g": 24.56,
    "carbs_g": 5.16,
    "fiber_g": 0.56
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-tomate-y-mozzarella.png",
  "puntuacion":6.7
},
{
  "_id": {
    "$oid": "74f1a0000000000000000107"
  },
  "nombre": "Ratatouille",
  "cocina": "Francesa",
  "categoria": "Guarnición",
  "dificultad": "Media",
  "tiempo_preparacion": "30 min",
  "pasos": [
    "Corta berenjena, calabacín, pimiento y tomate en dados; cebolla en pluma.",
    "Sofríe la cebolla con aceite de oliva.",
    "Añade pimiento, berenjena y calabacín; rehoga.",
    "Incorpora el tomate y cocina a fuego medio hasta tierno.",
    "Ajusta de sal y sirve caliente."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000015"
    },
    {
      "$oid": "64f1a0000000000000000016"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 169.17,
    "protein_g": 0.87,
    "fat_g": 16.85,
    "carbs_g": 4.7,
    "fiber_g": 1.5
  },
  "img": "https://imagenes.ruthunir.com/recetas/ratatouille.png",
  "puntuacion":8.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000108"
  },
  "nombre": "Salmorejo",
  "cocina": "Española",
  "categoria": "Sopa fría",
  "dificultad": "Fácil",
  "tiempo_preparacion": "15 min",
  "pasos": [
    "Remoja pan en tomate triturado.",
    "Añade ajo y tritura hasta textura fina.",
    "Emulsiona con aceite de oliva poco a poco.",
    "Ajusta de sal y enfría antes de servir."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a000000000000000000f"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000006"
    }
  ],
  "nutrientes_totales": {
    "calories": 329,
    "protein_g": 4.08,
    "fat_g": 25.98,
    "carbs_g": 21.5,
    "fiber_g": 1.5
  },
  "img": "https://imagenes.ruthunir.com/recetas/salmorejo.png",
  "puntuacion":9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000109"
  },
  "nombre": "Pisto manchego",
  "cocina": "Española",
  "categoria": "Guarnición",
  "dificultad": "Media",
  "tiempo_preparacion": "35 min",
  "pasos": [
    "Corta tomate, pimiento, calabacín, berenjena y cebolla.",
    "Sofríe cebolla con aceite de oliva.",
    "Añade pimiento, calabacín y berenjena; rehoga.",
    "Incorpora tomate y cocina a fuego medio hasta reducir.",
    "Rectifica sal y sirve."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000016"
    },
    {
      "$oid": "64f1a0000000000000000015"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 169.17,
    "protein_g": 0.87,
    "fat_g": 16.85,
    "carbs_g": 4.7,
    "fiber_g": 1.5
  },
  "img": "https://imagenes.ruthunir.com/recetas/pisto-manchego.png",
  "puntuacion":9.7
},
{
  "_id": {
    "$oid": "74f1a0000000000000000110"
  },
  "nombre": "Ensalada mediterránea de atún",
  "cocina": "Mediterránea",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "12 min",
  "pasos": [
    "Escurre el atún.",
    "Corta tomate, pepino y cebolla roja.",
    "Mezcla con aceitunas negras.",
    "Aliña con aceite de oliva y unas gotas de limón.",
    "Sirve fría."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000019"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000002"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000012"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 173.86,
    "protein_g": 4.37,
    "fat_g": 16.03,
    "carbs_g": 4.63,
    "fiber_g": 1.26
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-mediterranea-de-atun.png",
  "puntuacion":7.5
},
{
  "_id": {
    "$oid": "74f1a0000000000000000111"
  },
  "nombre": "Cuscús con verduras asadas",
  "cocina": "Magrebí",
  "categoria": "Cereal",
  "dificultad": "Fácil",
  "tiempo_preparacion": "25 min",
  "pasos": [
    "Asa berenjena, calabacín y pimiento rojo con un poco de aceite.",
    "Hidrata el cuscús con agua caliente y desgranalo.",
    "Añade tomate en dados.",
    "Mezcla todo con aceite de oliva y sal.",
    "Sirve templado."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000018"
    },
    {
      "$oid": "64f1a0000000000000000015"
    },
    {
      "$oid": "64f1a0000000000000000016"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 181.17,
    "protein_g": 1.32,
    "fat_g": 16.87,
    "carbs_g": 7.02,
    "fiber_g": 1.45
  },
  "img": "https://imagenes.ruthunir.com/recetas/cuscus-con-verduras-asadas.png",
  "puntuacion":8.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000112"
  },
  "nombre": "Pasta aglio e olio (albahaca)",
  "cocina": "Italiana",
  "categoria": "Pasta",
  "dificultad": "Fácil",
  "tiempo_preparacion": "15 min",
  "pasos": [
    "Cuece la pasta al dente.",
    "Dora ligeramente el ajo laminado en aceite de oliva.",
    "Mezcla la pasta con el aceite y el ajo.",
    "Añade albahaca picada y sirve."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000010"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a000000000000000000d"
    }
  ],
  "nutrientes_totales": {
    "calories": 303.5,
    "protein_g": 3.85,
    "fat_g": 25.5,
    "carbs_g": 16.68,
    "fiber_g": 1.38
  },
  "img": "https://imagenes.ruthunir.com/recetas/pasta-aglio-e-olio-albahaca.png",
  "puntuacion":7.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000113"
  },
  "nombre": "Pollo al limón y orégano",
  "cocina": "Mediterránea",
  "categoria": "Segundo",
  "dificultad": "Fácil",
  "tiempo_preparacion": "25 min",
  "pasos": [
    "Mezcla aceite de oliva, zumo de limón, ajo picado y orégano.",
    "Marina la pechuga de pollo 10 minutos.",
    "Cocina a la plancha hasta dorar.",
    "Deja reposar 2 minutos y sirve con el jugo."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001b"
    },
    {
      "$oid": "64f1a0000000000000000003"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a000000000000000000e"
    }
  ],
  "nutrientes_totales": {
    "calories": 298.4,
    "protein_g": 9.5,
    "fat_g": 21.74,
    "carbs_g": 22.26,
    "fiber_g": 9.48
  },
  "img": "https://imagenes.ruthunir.com/recetas/pollo-al-limon-y-oregano.png",
  "puntuacion":8.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000114"
  },
  "nombre": "Ensalada de pasta griega",
  "cocina": "Griega",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "20 min",
  "pasos": [
    "Cuece la pasta y enfría.",
    "Corta pepino y tomate; desmiga el feta.",
    "Añade aceitunas y aliña con aceite de oliva.",
    "Mezcla y sirve fría."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000010"
    },
    {
      "$oid": "64f1a0000000000000000002"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000009"
    },
    {
      "$oid": "64f1a0000000000000000012"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 242.33,
    "protein_g": 3.73,
    "fat_g": 22.23,
    "carbs_g": 8.13,
    "fiber_g": 1.02
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-pasta-griega.png",
  "puntuacion":6.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000115"
  },
  "nombre": "Ensalada de sardinas con tomate y cebolla",
  "cocina": "Mediterránea",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "10 min",
  "pasos": [
    "Escurre las sardinas.",
    "Corta tomate y cebolla.",
    "Mezcla con aceite de oliva y unas gotas de limón.",
    "Sirve con pan tostado."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001a"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    },
    {
      "$oid": "64f1a000000000000000000f"
    }
  ],
  "nutrientes_totales": {
    "calories": 240.67,
    "protein_g": 6.18,
    "fat_g": 19.13,
    "carbs_g": 11.92,
    "fiber_g": 1.4
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-sardinas-con-tomate-y-cebolla.png",
  "puntuacion":8.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000201"
  },
  "nombre": "Paella de marisco",
  "cocina": "Española",
  "categoria": "Arroz",
  "dificultad": "Media",
  "tiempo_preparacion": "40 min",
  "pasos": [
    "Sofríe ajo y pimiento en aceite de oliva.",
    "Añade arroz y remueve un minuto.",
    "Agrega caldo y mariscos (gambas y calamares si deseas).",
    "Cocina a fuego medio hasta que el arroz absorba el caldo.",
    "Deja reposar 5 minutos antes de servir."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001d"
    },
    {
      "$oid": "64f1a000000000000000001f"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000022"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 105.8,
    "protein_g": 6.1,
    "fat_g": 2.5,
    "carbs_g": 18.5,
    "fiber_g": 0.6
  },
  "img": "https://imagenes.ruthunir.com/recetas/paella-de-marisco.png",
  "puntuacion":8
},
{
  "_id": {
    "$oid": "74f1a0000000000000000202"
  },
  "nombre": "Tortilla española",
  "cocina": "Española",
  "categoria": "Huevos",
  "dificultad": "Media",
  "tiempo_preparacion": "30 min",
  "pasos": [
    "Pela y corta las patatas en láminas.",
    "Fríelas a fuego suave en aceite de oliva.",
    "Bate los huevos y mezcla con las patatas escurridas.",
    "Cuaja la tortilla por ambos lados hasta dorar."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000020"
    },
    {
      "$oid": "64f1a0000000000000000021"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 104.7,
    "protein_g": 5.9,
    "fat_g": 6.5,
    "carbs_g": 9.4,
    "fiber_g": 0.6
  },
  "img": "https://imagenes.ruthunir.com/recetas/tortilla-espanola.png",
  "puntuacion":9.4
},
{
  "_id": {
    "$oid": "74f1a0000000000000000203"
  },
  "nombre": "Arroz con espinacas y garbanzos",
  "cocina": "Española",
  "categoria": "Arroz",
  "dificultad": "Media",
  "tiempo_preparacion": "35 min",
  "pasos": [
    "Sofríe ajo y pimentón en aceite de oliva.",
    "Añade garbanzos y espinacas.",
    "Incorpora arroz y cubre con agua.",
    "Cocina hasta que el arroz esté tierno y el líquido se evapore."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001d"
    },
    {
      "$oid": "64f1a0000000000000000005"
    },
    {
      "$oid": "64f1a000000000000000001c"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000004"
    }
  ],
  "nutrientes_totales": {
    "calories": 125.2,
    "protein_g": 5.1,
    "fat_g": 3.7,
    "carbs_g": 19.4,
    "fiber_g": 3.1
  },
  "img": "https://imagenes.ruthunir.com/recetas/arroz-con-verduras.png",
  "puntuacion":7.2
},
{
  "_id": {
    "$oid": "74f1a0000000000000000204"
  },
  "nombre": "Espinacas a la catalana",
  "cocina": "Española",
  "categoria": "Verdura salteada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "15 min",
  "pasos": [
    "Calienta aceite de oliva en sartén.",
    "Añade ajo picado y espinacas.",
    "Saltea 3 minutos hasta que reduzcan.",
    "Sirve caliente con pan tostado."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001c"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a000000000000000000f"
    }
  ],
  "nutrientes_totales": {
    "calories": 186.5,
    "protein_g": 4.6,
    "fat_g": 14.6,
    "carbs_g": 10.4,
    "fiber_g": 1.6
  },
  "img": "https://imagenes.ruthunir.com/recetas/espinacas-a-la-catalana.png",
  "puntuacion":7.3
},
{
  "_id": {
    "$oid": "74f1a0000000000000000205"
  },
  "nombre": "Ensalada de rúcula y parmesano",
  "cocina": "Italiana",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "8 min",
  "pasos": [
    "Lava la rúcula y seca.",
    "Lamina el parmesano.",
    "Aliña con aceite de oliva y unas gotas de limón.",
    "Mezcla y sirve."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000024"
    },
    {
      "$oid": "64f1a000000000000000000c"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 340.8,
    "protein_g": 9.2,
    "fat_g": 25.2,
    "carbs_g": 9.2,
    "fiber_g": 1.4
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-racula-y-parmesano.png",
  "puntuacion":7.8
},
{
  "_id": {
    "$oid": "74f1a0000000000000000206"
  },
  "nombre": "Bacalao al pil-pil",
  "cocina": "Vasca",
  "categoria": "Pescado",
  "dificultad": "Media",
  "tiempo_preparacion": "25 min",
  "pasos": [
    "Cocina el bacalao en aceite de oliva con ajo hasta que suelte la gelatina.",
    "Retira el pescado y emulsiona el aceite.",
    "Vuelve a incorporar el bacalao y sirve con la salsa espesa."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000023"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 122.3,
    "protein_g": 8.6,
    "fat_g": 7.6,
    "carbs_g": 3.8,
    "fiber_g": 0.7
  },
  "img": "https://imagenes.ruthunir.com/recetas/bacalao-al-pil-pil.png",
  "puntuacion":8.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000207"
  },
  "nombre": "Arroz con verduras",
  "cocina": "Mediterránea",
  "categoria": "Arroz",
  "dificultad": "Fácil",
  "tiempo_preparacion": "30 min",
  "pasos": [
    "Sofríe cebolla y pimientos en aceite de oliva.",
    "Añade calabacín y guisantes.",
    "Incorpora arroz y cuece con caldo hasta tierno.",
    "Deja reposar y sirve."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001d"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000016"
    },
    {
      "$oid": "64f1a000000000000000001e"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 109.7,
    "protein_g": 3.2,
    "fat_g": 3.4,
    "carbs_g": 17.8,
    "fiber_g": 2.1
  },
  "img": "https://imagenes.ruthunir.com/recetas/arroz-con-verduras.png",
  "puntuacion":8.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000301"
  },
  "nombre": "Gazpacho andaluz",
  "cocina": "Española",
  "categoria": "Sopa fría",
  "dificultad": "Fácil",
  "tiempo_preparacion": "15 min",
  "pasos": [
    "Lava y trocea los tomates, el pepino, el pimiento y la cebolla.",
    "Tritura con ajo, pan y un poco de agua.",
    "Añade aceite de oliva, vinagre y sal.",
    "Enfría durante 1 hora antes de servir."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000002"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a000000000000000000f"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000011"
    }
  ],
  "nutrientes_totales": {
    "calories": 172.5,
    "protein_g": 3.2,
    "fat_g": 10.8,
    "carbs_g": 15.7,
    "fiber_g": 2.6
  },
  "img": "https://imagenes.ruthunir.com/recetas/gazpacho-andaluz-con-verduras-frescas.png",
  "puntuacion":7.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000302"
  },
  "nombre": "Hummus clásico",
  "cocina": "Mediterránea",
  "categoria": "Dip",
  "dificultad": "Fácil",
  "tiempo_preparacion": "10 min",
  "pasos": [
    "Tritura los garbanzos cocidos con ajo y zumo de limón.",
    "Añade aceite de oliva y una pizca de pimentón.",
    "Mezcla hasta obtener una crema suave.",
    "Sirve con pan de pita."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000005"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000003"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000004"
    },
    {
      "$oid": "64f1a000000000000000000a"
    }
  ],
  "nutrientes_totales": {
    "calories": 210.3,
    "protein_g": 6.2,
    "fat_g": 13.8,
    "carbs_g": 18.4,
    "fiber_g": 4.6
  },
  "img": "https://imagenes.ruthunir.com/recetas/hummus-con-pita-y-aceite-de-oliva.png",
  "puntuacion":8.3
},
{
  "_id": {
    "$oid": "74f1a0000000000000000303"
  },
  "nombre": "Tabulé libanés",
  "cocina": "Libanesa",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "20 min",
  "pasos": [
    "Hidrata el cuscús con agua caliente.",
    "Corta tomate, pepino y cebolla fina.",
    "Mezcla con cuscús, perejil y zumo de limón.",
    "Añade aceite de oliva y enfría antes de servir."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000018"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000002"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000003"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 158.5,
    "protein_g": 3.1,
    "fat_g": 5.4,
    "carbs_g": 23.1,
    "fiber_g": 1.6
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-tabule.png",
  "puntuacion":8.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000304"
  },
  "nombre": "Lentejas estofadas",
  "cocina": "Española",
  "categoria": "Legumbre",
  "dificultad": "Media",
  "tiempo_preparacion": "40 min",
  "pasos": [
    "Sofríe ajo, cebolla y pimiento.",
    "Añade lentejas, patata y agua.",
    "Cocina a fuego lento 30 minutos.",
    "Añade pimentón y aceite de oliva al final."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000020"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000004"
    }
  ],
  "nutrientes_totales": {
    "calories": 118.3,
    "protein_g": 3.7,
    "fat_g": 3.5,
    "carbs_g": 17.4,
    "fiber_g": 2.9
  },
  "img": "https://imagenes.ruthunir.com/recetas/estofado-de-lentejas-con-perejil.png",
  "puntuacion":7.3
},
{
  "_id": {
    "$oid": "74f1a0000000000000000305"
  },
  "nombre": "Sardinas al horno",
  "cocina": "Mediterránea",
  "categoria": "Pescado",
  "dificultad": "Fácil",
  "tiempo_preparacion": "20 min",
  "pasos": [
    "Limpia las sardinas y colócalas en una bandeja.",
    "Añade aceite de oliva y orégano.",
    "Hornea 12 minutos a 200 °C.",
    "Sirve con limón."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001a"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a000000000000000000e"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 203.6,
    "protein_g": 8.5,
    "fat_g": 15.7,
    "carbs_g": 4.2,
    "fiber_g": 1.8
  },
  "img": "https://imagenes.ruthunir.com/recetas/sardinas-al-horno-con-limon-y-romero.png",
  "puntuacion":6.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000306"
  },
  "nombre": "Pollo al romero con limón",
  "cocina": "Mediterránea",
  "categoria": "Carne",
  "dificultad": "Fácil",
  "tiempo_preparacion": "30 min",
  "pasos": [
    "Mezcla aceite de oliva, limón y ajo.",
    "Marina el pollo con orégano o romero 15 minutos.",
    "Asa o plancha hasta dorar y servir."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001b"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a000000000000000000e"
    }
  ],
  "nutrientes_totales": {
    "calories": 289.5,
    "protein_g": 9.2,
    "fat_g": 20.8,
    "carbs_g": 3.4,
    "fiber_g": 1.1
  },
  "img": "https://imagenes.ruthunir.com/recetas/pechugas-de-pollo-al-romero-y-limon.png",
  "puntuacion":9.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000307"
  },
  "nombre": "Pasta puttanesca",
  "cocina": "Italiana",
  "categoria": "Pasta",
  "dificultad": "Media",
  "tiempo_preparacion": "25 min",
  "pasos": [
    "Sofríe ajo, tomate y aceitunas.",
    "Añade pasta cocida y mezcla.",
    "Aliña con orégano y aceite de oliva."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000010"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000012"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a000000000000000000e"
    }
  ],
  "nutrientes_totales": {
    "calories": 212.8,
    "protein_g": 5,
    "fat_g": 9.8,
    "carbs_g": 24.5,
    "fiber_g": 2.1
  },
  "img": "https://imagenes.ruthunir.com/recetas/plato-de-pasta-puttanesca.png",
  "puntuacion":8.5
},
{
  "_id": {
    "$oid": "74f1a0000000000000000308"
  },
  "nombre": "Calabacines rellenos de arroz y verduras",
  "cocina": "Mediterránea",
  "categoria": "Verdura rellena",
  "dificultad": "Media",
  "tiempo_preparacion": "35 min",
  "pasos": [
    "Vacía los calabacines y reserva la pulpa.",
    "Sofríe cebolla, pimiento y pulpa de calabacín.",
    "Añade arroz y cocina 10 minutos.",
    "Rellena los calabacines y hornea 20 minutos."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000016"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a000000000000000001d"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 108.9,
    "protein_g": 2.9,
    "fat_g": 3.2,
    "carbs_g": 17.6,
    "fiber_g": 1.8
  },
  "img": "https://imagenes.ruthunir.com/recetas/barquitos-de-calabacin-rellenos.png",
  "puntuacion":7.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000309"
  },
  "nombre": "Guiso de garbanzos con espinacas",
  "cocina": "Española",
  "categoria": "Legumbre",
  "dificultad": "Media",
  "tiempo_preparacion": "40 min",
  "pasos": [
    "Sofríe ajo y pimentón.",
    "Añade garbanzos y espinacas.",
    "Cubre con agua y cocina 20 minutos.",
    "Rectifica de sal y sirve caliente."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000005"
    },
    {
      "$oid": "64f1a000000000000000001c"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000004"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 143.2,
    "protein_g": 6.8,
    "fat_g": 4.3,
    "carbs_g": 17.8,
    "fiber_g": 4.1
  },
  "img": "https://imagenes.ruthunir.com/recetas/guiso-de-garbanzos-con-espinacas.png",
  "puntuacion":9.8
},
{
  "_id": {
    "$oid": "74f1a0000000000000000310"
  },
  "nombre": "Pan con tomate",
  "cocina": "Catalana",
  "categoria": "Desayuno",
  "dificultad": "Fácil",
  "tiempo_preparacion": "5 min",
  "pasos": [
    "Tuesta el pan.",
    "Frota con ajo y tomate maduro.",
    "Añade aceite de oliva y sal.",
    "Sirve inmediatamente."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000000f"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 267.6,
    "protein_g": 5.2,
    "fat_g": 15.1,
    "carbs_g": 27.4,
    "fiber_g": 1.5
  },
  "img": "https://imagenes.ruthunir.com/recetas/pan-con-tomate.png",
  "puntuacion":9.5
},
{
  "_id": {
    "$oid": "74f1a0000000000000000311"
  },
  "nombre": "Espaguetis al pesto",
  "cocina": "Italiana",
  "categoria": "Pasta",
  "dificultad": "Media",
  "tiempo_preparacion": "20 min",
  "pasos": [
    "Tritura albahaca, ajo, parmesano y aceite.",
    "Cuece la pasta.",
    "Mezcla con la salsa y sirve caliente."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000010"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a000000000000000000d"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a000000000000000000c"
    }
  ],
  "nutrientes_totales": {
    "calories": 293.8,
    "protein_g": 6.9,
    "fat_g": 21.4,
    "carbs_g": 18.1,
    "fiber_g": 1.2
  },
  "img": "https://imagenes.ruthunir.com/recetas/espaguetis-al-pesto-con-albahaca.png",
  "puntuacion":8.7
},
{
  "_id": {
    "$oid": "74f1a0000000000000000312"
  },
  "nombre": "Cuscús con pollo y verduras",
  "cocina": "Marroquí",
  "categoria": "Plato único",
  "dificultad": "Media",
  "tiempo_preparacion": "35 min",
  "pasos": [
    "Sofríe pollo y verduras en aceite de oliva.",
    "Añade el cuscús y caldo.",
    "Cocina 10 minutos y sirve con limón."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000018"
    },
    {
      "$oid": "64f1a000000000000000001b"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000016"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 163.5,
    "protein_g": 7.5,
    "fat_g": 3.4,
    "carbs_g": 21.6,
    "fiber_g": 1.7
  },
  "img": "https://imagenes.ruthunir.com/recetas/cuscus-con-verduras-asadas.png",
  "puntuacion":7.1
},
{
  "_id": {
    "$oid": "74f1a0000000000000000401"
  },
  "nombre": "Merluza a la plancha con limón",
  "cocina": "Española",
  "categoria": "Pescado",
  "dificultad": "Fácil",
  "tiempo_preparacion": "15 min",
  "pasos": [
    "Calienta una plancha con aceite de oliva.",
    "Cocina la merluza 3 minutos por lado.",
    "Añade zumo de limón y una pizca de sal.",
    "Sirve con verduras cocidas o ensalada."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000026"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 125.7,
    "protein_g": 11.3,
    "fat_g": 6.2,
    "carbs_g": 2.1,
    "fiber_g": 0.3
  },
  "img": "https://imagenes.ruthunir.com/recetas/filete-de-pescado-a-la-parrilla.png",
  "puntuacion":6.8
},
{
  "_id": {
    "$oid": "74f1a0000000000000000402"
  },
  "nombre": "Ensalada de cebada y verduras asadas",
  "cocina": "Mediterránea",
  "categoria": "Cereal",
  "dificultad": "Media",
  "tiempo_preparacion": "25 min",
  "pasos": [
    "Asa berenjena, calabacín y pimientos.",
    "Mezcla con cebada cocida y aliña con aceite de oliva.",
    "Añade un toque de limón y sirve templado."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000002a"
    },
    {
      "$oid": "64f1a0000000000000000015"
    },
    {
      "$oid": "64f1a0000000000000000016"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 141.8,
    "protein_g": 3.2,
    "fat_g": 4.5,
    "carbs_g": 22.3,
    "fiber_g": 2.8
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-cebada-y-verduras-asadas.png",
  "puntuacion":5.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000403"
  },
  "nombre": "Pulpo a la gallega",
  "cocina": "Española",
  "categoria": "Pescado",
  "dificultad": "Fácil",
  "tiempo_preparacion": "20 min",
  "pasos": [
    "Cuece el pulpo y corta en rodajas.",
    "Sirve sobre patata cocida.",
    "Espolvorea pimentón y añade aceite de oliva."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000002b"
    },
    {
      "$oid": "64f1a0000000000000000020"
    },
    {
      "$oid": "64f1a0000000000000000004"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 117.5,
    "protein_g": 8.9,
    "fat_g": 5.6,
    "carbs_g": 8.3,
    "fiber_g": 1.3
  },
  "img": "https://imagenes.ruthunir.com/recetas/pulpo-a-la-gallega.png",
  "puntuacion":8.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000404"
  },
  "nombre": "Pasta con ricotta y espinacas",
  "cocina": "Italiana",
  "categoria": "Pasta",
  "dificultad": "Fácil",
  "tiempo_preparacion": "20 min",
  "pasos": [
    "Cuece la pasta y escurre.",
    "Saltea espinacas en aceite de oliva.",
    "Mezcla con ricotta y la pasta caliente.",
    "Sirve con pimienta y orégano."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000002d"
    },
    {
      "$oid": "64f1a000000000000000001c"
    },
    {
      "$oid": "64f1a000000000000000002e"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a000000000000000000e"
    }
  ],
  "nutrientes_totales": {
    "calories": 192.3,
    "protein_g": 8.2,
    "fat_g": 7.9,
    "carbs_g": 22.6,
    "fiber_g": 1.9
  },
  "img": "https://imagenes.ruthunir.com/recetas/plato-de-pasta-al-horno-con-espinacas.png",
  "puntuacion":8.5
},
{
  "_id": {
    "$oid": "74f1a0000000000000000405"
  },
  "nombre": "Lentejas con verduras y arroz",
  "cocina": "Española",
  "categoria": "Legumbre",
  "dificultad": "Media",
  "tiempo_preparacion": "40 min",
  "pasos": [
    "Sofríe ajo, cebolla y pimientos.",
    "Añade lentejas, arroz y agua.",
    "Cocina a fuego lento 30 minutos.",
    "Termina con un chorrito de aceite de oliva."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000028"
    },
    {
      "$oid": "64f1a000000000000000001d"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a000000000000000001f"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 122.9,
    "protein_g": 6.3,
    "fat_g": 3.5,
    "carbs_g": 18.2,
    "fiber_g": 4.3
  },
  "img": "https://imagenes.ruthunir.com/recetas/plato-de-lentejas-arroz-y-verduras.png",
  "puntuacion":5.8
},
{
  "_id": {
    "$oid": "74f1a0000000000000000406"
  },
  "nombre": "Berenjenas a la parmesana",
  "cocina": "Italiana",
  "categoria": "Horno",
  "dificultad": "Media",
  "tiempo_preparacion": "35 min",
  "pasos": [
    "Asa las berenjenas.",
    "Coloca capas de tomate, mozzarella y parmesano.",
    "Hornea 20 minutos hasta gratinar."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000029"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a000000000000000000b"
    },
    {
      "$oid": "64f1a000000000000000000c"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 202.4,
    "protein_g": 8.1,
    "fat_g": 15.4,
    "carbs_g": 9.3,
    "fiber_g": 1.7
  },
  "img": "https://imagenes.ruthunir.com/recetas/berenjenas-a-la-parmesana.png",
  "puntuacion":5.8
},
{
  "_id": {
    "$oid": "74f1a0000000000000000407"
  },
  "nombre": "Alcachofas al ajillo",
  "cocina": "Española",
  "categoria": "Verdura salteada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "15 min",
  "pasos": [
    "Saltea ajo laminado en aceite de oliva.",
    "Añade las alcachofas cocidas y rehoga.",
    "Sirve con perejil y limón."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000027"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 145.6,
    "protein_g": 3.9,
    "fat_g": 9.8,
    "carbs_g": 11.2,
    "fiber_g": 2.9
  },
  "img": "https://imagenes.ruthunir.com/recetas/alcachofas-salteadas-con-ajo-y-hierbas.png",
  "puntuacion":8.7
},
{
  "_id": {
    "$oid": "74f1a0000000000000000408"
  },
  "nombre": "Ensalada de garbanzos con atún",
  "cocina": "Mediterránea",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "10 min",
  "pasos": [
    "Escurre los garbanzos y el atún.",
    "Mezcla con tomate, pepino y aceitunas.",
    "Aliña con aceite de oliva y limón."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000005"
    },
    {
      "$oid": "64f1a0000000000000000019"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000002"
    },
    {
      "$oid": "64f1a0000000000000000012"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 169.2,
    "protein_g": 8.3,
    "fat_g": 7.6,
    "carbs_g": 15.8,
    "fiber_g": 3.8
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-garbanzos-con-atan.png",
  "puntuacion":8.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000409"
  },
  "nombre": "Caldo de pescado mediterráneo",
  "cocina": "Española",
  "categoria": "Sopa caliente",
  "dificultad": "Fácil",
  "tiempo_preparacion": "30 min",
  "pasos": [
    "Sofríe cebolla, ajo y tomate.",
    "Añade cabezas de pescado y agua.",
    "Cocina 25 minutos y cuela.",
    "Sirve caliente con perejil."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000002f"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000008"
    }
  ],
  "nutrientes_totales": {
    "calories": 27.3,
    "protein_g": 2.5,
    "fat_g": 0.9,
    "carbs_g": 2.6,
    "fiber_g": 0.3
  },
  "img": "https://imagenes.ruthunir.com/recetas/sopa-mediterranea-con-pescado-fresco.png",
  "puntuacion":8.5
},
{
  "_id": {
    "$oid": "74f1a0000000000000000410"
  },
  "nombre": "Risotto al limón y parmesano",
  "cocina": "Italiana",
  "categoria": "Arroz",
  "dificultad": "Media",
  "tiempo_preparacion": "25 min",
  "pasos": [
    "Sofríe cebolla en mantequilla y aceite.",
    "Añade arroz y remueve.",
    "Incorpora caldo y ralladura de limón.",
    "Agrega parmesano y sirve cremoso."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001d"
    },
    {
      "$oid": "64f1a000000000000000000c"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 185.4,
    "protein_g": 5.9,
    "fat_g": 6.8,
    "carbs_g": 25.2,
    "fiber_g": 0.6
  },
  "img": "https://imagenes.ruthunir.com/recetas/risotto-al-limon-y-parmesano.png",
  "puntuacion":7.5
},
{
  "_id": {
    "$oid": "74f1a0000000000000000411"
  },
  "nombre": "Pasta con sardinas",
  "cocina": "Italiana",
  "categoria": "Pasta",
  "dificultad": "Media",
  "tiempo_preparacion": "30 min",
  "pasos": [
    "Sofríe cebolla y ajo.",
    "Añade sardinas desmenuzadas y tomate.",
    "Mezcla con la pasta cocida.",
    "Aliña con aceite y orégano."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000002d"
    },
    {
      "$oid": "64f1a000000000000000001a"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 214.7,
    "protein_g": 9.1,
    "fat_g": 9.8,
    "carbs_g": 20.7,
    "fiber_g": 1.9
  },
  "img": "https://imagenes.ruthunir.com/recetas/espaguetis-con-sardinas-y-tomates.png",
  "puntuacion":7.4
},
{
  "_id": {
    "$oid": "74f1a0000000000000000412"
  },
  "nombre": "Pimientos rellenos de arroz y atún",
  "cocina": "Mediterránea",
  "categoria": "Horno",
  "dificultad": "Media",
  "tiempo_preparacion": "35 min",
  "pasos": [
    "Corta la parte superior de los pimientos.",
    "Mezcla arroz cocido, atún y tomate.",
    "Rellena y hornea 25 minutos.",
    "Sirve templado."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000019"
    },
    {
      "$oid": "64f1a000000000000000001d"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 146.8,
    "protein_g": 6.5,
    "fat_g": 5.2,
    "carbs_g": 18.1,
    "fiber_g": 2.3
  },
  "img": "https://imagenes.ruthunir.com/recetas/pimientos-rellenos-de-arroz-y-atan.png",
  "puntuacion":6.4
},
{
  "_id": {
    "$oid": "74f1a0000000000000000413"
  },
  "nombre": "Ensalada de rúcula y atún",
  "cocina": "Italiana",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "8 min",
  "pasos": [
    "Lava la rúcula.",
    "Añade atún y tomate cherry.",
    "Aliña con aceite y vinagre balsámico."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000024"
    },
    {
      "$oid": "64f1a0000000000000000019"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a000000000000000000f"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 182.4,
    "protein_g": 9.8,
    "fat_g": 10.1,
    "carbs_g": 9.4,
    "fiber_g": 1.7
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-racula-y-atan.png",
  "puntuacion":7.8
},
{
  "_id": {
    "$oid": "74f1a0000000000000000414"
  },
  "nombre": "Polenta con queso y tomate",
  "cocina": "Italiana",
  "categoria": "Cereal",
  "dificultad": "Fácil",
  "tiempo_preparacion": "25 min",
  "pasos": [
    "Cuece la polenta.",
    "Añade queso parmesano y tomate triturado.",
    "Sirve caliente con un hilo de aceite."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000032"
    },
    {
      "$oid": "64f1a000000000000000000c"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 156.2,
    "protein_g": 6.4,
    "fat_g": 6.2,
    "carbs_g": 19.5,
    "fiber_g": 1.2
  },
  "img": "https://imagenes.ruthunir.com/recetas/polenta-con-tomates-y-mozzarella.png",
  "puntuacion":7.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000415"
  },
  "nombre": "Tosta de aguacate y tomate",
  "cocina": "Mediterránea",
  "categoria": "Desayuno",
  "dificultad": "Fácil",
  "tiempo_preparacion": "5 min",
  "pasos": [
    "Tuesta el pan.",
    "Cubre con aguacate machacado y tomate en rodajas.",
    "Añade aceite y sal."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000000f"
    },
    {
      "$oid": "64f1a0000000000000000030"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 242.1,
    "protein_g": 5.1,
    "fat_g": 14.8,
    "carbs_g": 22.6,
    "fiber_g": 3.4
  },
  "img": "https://imagenes.ruthunir.com/recetas/tosta-de-aguacate-y-tomate.png",
  "puntuacion":7.5
},
{
  "_id": {
    "$oid": "74f1a0000000000000000416"
  },
  "nombre": "Crema de calabacín ligera",
  "cocina": "Española",
  "categoria": "Sopa caliente",
  "dificultad": "Fácil",
  "tiempo_preparacion": "20 min",
  "pasos": [
    "Cocina calabacín y cebolla con un poco de agua.",
    "Tritura con un chorrito de aceite.",
    "Sirve caliente con picatostes."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000016"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 69.2,
    "protein_g": 2.2,
    "fat_g": 3.1,
    "carbs_g": 8.2,
    "fiber_g": 1.7
  },
  "img": "https://imagenes.ruthunir.com/recetas/crema-de-calabacin-ligera.png",
  "puntuacion":8.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000417"
  },
  "nombre": "Judías verdes con patata y huevo",
  "cocina": "Española",
  "categoria": "Verdura cocida",
  "dificultad": "Fácil",
  "tiempo_preparacion": "25 min",
  "pasos": [
    "Cuece las judías y las patatas.",
    "Añade el huevo cocido troceado.",
    "Aliña con aceite y limón."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000031"
    },
    {
      "$oid": "64f1a0000000000000000020"
    },
    {
      "$oid": "64f1a0000000000000000021"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 104.9,
    "protein_g": 4.8,
    "fat_g": 4.3,
    "carbs_g": 11.2,
    "fiber_g": 2.6
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-judias-verdes-y-huevo.png",
  "puntuacion":9.4
},
{
  "_id": {
    "$oid": "74f1a0000000000000000418"
  },
  "nombre": "Ensalada de pasta con marisco",
  "cocina": "Mediterránea",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "15 min",
  "pasos": [
    "Cuece la pasta y enfría.",
    "Añade gambas cocidas, tomate y pepino.",
    "Aliña con aceite y limón."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000002d"
    },
    {
      "$oid": "64f1a0000000000000000022"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000002"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 158.4,
    "protein_g": 8.9,
    "fat_g": 4.7,
    "carbs_g": 19.2,
    "fiber_g": 1.4
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-pasta-con-mariscos.png",
  "puntuacion":9.1
},
{
  "_id": {
    "$oid": "74f1a0000000000000000419"
  },
  "nombre": "Sopa de tomate y albahaca",
  "cocina": "Italiana",
  "categoria": "Sopa caliente",
  "dificultad": "Fácil",
  "tiempo_preparacion": "20 min",
  "pasos": [
    "Sofríe ajo y cebolla.",
    "Añade tomate triturado y agua.",
    "Cocina 15 minutos y añade hojas de albahaca."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a000000000000000000d"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 88.6,
    "protein_g": 2.7,
    "fat_g": 3.9,
    "carbs_g": 9.1,
    "fiber_g": 1.9
  },
  "img": "https://imagenes.ruthunir.com/recetas/sopa-de-tomate-con-albahaca.png",
  "puntuacion":9.1
},
{
  "_id": {
    "$oid": "74f1a0000000000000000420"
  },
  "nombre": "Pizza de verduras",
  "cocina": "Italiana",
  "categoria": "Horno",
  "dificultad": "Media",
  "tiempo_preparacion": "30 min",
  "pasos": [
    "Extiende la masa y cubre con tomate.",
    "Añade pimiento, calabacín y mozzarella.",
    "Hornea 15 minutos a 220 °C."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000000f"
    },
    {
      "$oid": "64f1a0000000000000000008"
    },
    {
      "$oid": "64f1a0000000000000000014"
    },
    {
      "$oid": "64f1a0000000000000000016"
    },
    {
      "$oid": "64f1a000000000000000000b"
    }
  ],
  "nutrientes_totales": {
    "calories": 226.9,
    "protein_g": 8.1,
    "fat_g": 10.4,
    "carbs_g": 24.3,
    "fiber_g": 1.9
  },
  "img": "https://imagenes.ruthunir.com/recetas/pizza-de-verduras.png",
  "puntuacion":9.6
},
{
  "_id": {
    "$oid": "74f1a0000000000000000421"
  },
  "nombre": "Almendras tostadas con romero",
  "cocina": "Mediterránea",
  "categoria": "Snack",
  "dificultad": "Fácil",
  "tiempo_preparacion": "10 min",
  "pasos": [
    "Tuesta almendras con aceite y romero.",
    "Deja enfriar y sirve como aperitivo."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000002c"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a000000000000000000e"
    }
  ],
  "nutrientes_totales": {
    "calories": 516.2,
    "protein_g": 17.8,
    "fat_g": 46.1,
    "carbs_g": 11.3,
    "fiber_g": 8.9
  },
  "img": "https://imagenes.ruthunir.com/recetas/almendras-y-romero-en-cuenco.png",
  "puntuacion":7.9
},
{
  "_id": {
    "$oid": "74f1a0000000000000000422"
  },
  "nombre": "Mejillones al vapor con limón",
  "cocina": "Española",
  "categoria": "Marisco",
  "dificultad": "Fácil",
  "tiempo_preparacion": "12 min",
  "pasos": [
    "Limpia los mejillones.",
    "Cuécelos al vapor hasta que se abran.",
    "Añade zumo de limón y sirve."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000022"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 91.8,
    "protein_g": 15.6,
    "fat_g": 1.8,
    "carbs_g": 2.2,
    "fiber_g": 0
  },
  "img": "https://imagenes.ruthunir.com/recetas/mejillones-con-limon-y-perejil.png",
  "puntuacion":9.3
},
{
  "_id": {
    "$oid": "74f1a0000000000000000423"
  },
  "nombre": "Ensalada de espinacas con queso feta",
  "cocina": "Griega",
  "categoria": "Ensalada",
  "dificultad": "Fácil",
  "tiempo_preparacion": "7 min",
  "pasos": [
    "Lava las espinacas.",
    "Añade feta desmenuzado y aceitunas.",
    "Aliña con aceite y limón."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000001c"
    },
    {
      "$oid": "64f1a000000000000000000b"
    },
    {
      "$oid": "64f1a0000000000000000025"
    },
    {
      "$oid": "64f1a0000000000000000001"
    },
    {
      "$oid": "64f1a0000000000000000003"
    }
  ],
  "nutrientes_totales": {
    "calories": 168.7,
    "protein_g": 6.8,
    "fat_g": 12.1,
    "carbs_g": 6.2,
    "fiber_g": 1.8
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-espinacas-con-queso-feta.png",
  "puntuacion":8.3
},
{
  "_id": {
    "$oid": "74f1a0000000000000000424"
  },
  "nombre": "Guiso de alcachofas con guisantes",
  "cocina": "Mediterránea",
  "categoria": "Verdura guisada",
  "dificultad": "Media",
  "tiempo_preparacion": "30 min",
  "pasos": [
    "Sofríe cebolla y ajo.",
    "Añade alcachofas y guisantes.",
    "Cocina 20 minutos con un poco de agua y sal."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a0000000000000000027"
    },
    {
      "$oid": "64f1a000000000000000001e"
    },
    {
      "$oid": "64f1a0000000000000000013"
    },
    {
      "$oid": "64f1a0000000000000000006"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 103.2,
    "protein_g": 4.2,
    "fat_g": 3.4,
    "carbs_g": 13.7,
    "fiber_g": 3.8
  },
  "img": "https://imagenes.ruthunir.com/recetas/estofado-de-alcachofas-y-guisantes.png",
  "puntuacion":7.5
},
{
  "_id": {
    "$oid": "74f1a0000000000000000425"
  },
  "nombre": "Ensalada de cebada con almendras y naranja",
  "cocina": "Mediterránea",
  "categoria": "Cereal",
  "dificultad": "Fácil",
  "tiempo_preparacion": "15 min",
  "pasos": [
    "Mezcla cebada cocida con trozos de naranja y almendras.",
    "Aliña con aceite de oliva y limón.",
    "Sirve fría."
  ],
  "ingredientes": [
    {
      "$oid": "64f1a000000000000000002a"
    },
    {
      "$oid": "64f1a000000000000000002c"
    },
    {
      "$oid": "64f1a0000000000000000003"
    },
    {
      "$oid": "64f1a0000000000000000001"
    }
  ],
  "nutrientes_totales": {
    "calories": 198.3,
    "protein_g": 5.3,
    "fat_g": 9.2,
    "carbs_g": 22.4,
    "fiber_g": 4.5
  },
  "img": "https://imagenes.ruthunir.com/recetas/ensalada-de-cebada-con-almendras-y-naranja.png",
  "puntuacion":8.2
}];
  

  this.recetas = recetasJSON.map(r => ({
    _id:r._id.$oid,
    nombre:r.nombre,
    cocina:r.cocina,
    categoria:r.categoria,
    dificultad:r.dificultad,
    tiempo_preparacion:r.tiempo_preparacion,
    pasos: r.pasos,
    ingredientes: r.ingredientes.map(i => i.$oid),
    nutrientes_totales:r.nutrientes_totales,
    img:r.img,
    puntuacion:r.puntuacion
  }));

  }

  getRecetas():Receta[]{
    return this.recetas;
  }

  //Método para guardar recetas en Guardadas
  guardarReceta(receta: Receta): void{
    // console.log("La receta se ha guardado.")
    //push que añade un elemento a un array
    this.recetas_guardadas.push(receta);
  }

  //Método que devuelve recetas guardadas
  getRecetasGuardadas(): Receta[]{
    return this.recetas_guardadas;
  }

  }