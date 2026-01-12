import { Injectable } from '@angular/core';

export interface ValoresNutricionales {
  calorias: number;
  proteinas_g: number;
  grasas_g: number;
  carbohidratos_g: number;
  fibra_g: number;
}

export interface ProductoJSON {
  _id: { $oid: string };
  nombre: string;
  categoria: string;
  valores_nutricionales: ValoresNutricionales;
  img: string;
  precio:number;
}

export interface Producto {
  _id: string;
  nombre: string;
  categoria: string;
  valores_nutricionales: ValoresNutricionales;
  img: string;
  precio:number;
}


@Injectable({
  providedIn: 'root',
})



export class Productos {
  private productos:Producto [];
  
  constructor(){
    const productosJSON:ProductoJSON[]=[
{
  "_id": {
    "$oid": "64f1a0000000000000000001"
  },
  "nombre": "Aceite de oliva virgen",
  "categoria": "Aceites y grasas",
  "valores_nutricionales": {
    "calorias": 884,
    "proteinas_g": 0,
    "grasas_g": 100,
    "carbohidratos_g": 0,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/aceite-de-oliva-virgen.png",
  "precio":6.5
},
{
  "_id": {
    "$oid": "64f1a0000000000000000002"
  },
  "nombre": "Pepino",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 15,
    "proteinas_g": 0.7,
    "grasas_g": 0.1,
    "carbohidratos_g": 3.6,
    "fibra_g": 0.5
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/pepino.png",
  "precio":0.9
},
{
  "_id": {
    "$oid": "64f1a0000000000000000003"
  },
  "nombre": "Limón",
  "categoria": "Frutas",
  "valores_nutricionales": {
    "calorias": 29,
    "proteinas_g": 1.1,
    "grasas_g": 0.3,
    "carbohidratos_g": 9.3,
    "fibra_g": 2.8
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/limon.png",
  "precio":0.6
},
{
  "_id": {
    "$oid": "64f1a0000000000000000004"
  },
  "nombre": "Pimentón (paprika)",
  "categoria": "Hierbas y especias",
  "valores_nutricionales": {
    "calorias": 282,
    "proteinas_g": 14.1,
    "grasas_g": 12.9,
    "carbohidratos_g": 54.7,
    "fibra_g": 34.9
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/pimenton.png",
  "precio":3.2
},
{
  "_id": {
    "$oid": "64f1a0000000000000000005"
  },
  "nombre": "Garbanzos cocidos",
  "categoria": "Legumbres",
  "valores_nutricionales": {
    "calorias": 164,
    "proteinas_g": 8.9,
    "grasas_g": 2.6,
    "carbohidratos_g": 27.4,
    "fibra_g": 7.6
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/garbanzos-cocidos.png",
  "precio":1.5
},
{
  "_id": {
    "$oid": "64f1a0000000000000000006"
  },
  "nombre": "Ajo",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 149,
    "proteinas_g": 6.4,
    "grasas_g": 0.5,
    "carbohidratos_g": 33.1,
    "fibra_g": 2.1
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/ajo.png",
  "precio":0.5
},
{
  "_id": {
    "$oid": "64f1a0000000000000000007"
  },
  "nombre": "Yogur natural",
  "categoria": "Lácteos",
  "valores_nutricionales": {
    "calorias": 61,
    "proteinas_g": 3.5,
    "grasas_g": 3.3,
    "carbohidratos_g": 4.7,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/yogur-natural.png",
  "precio":1.2
},
{
  "_id": {
    "$oid": "64f1a0000000000000000008"
  },
  "nombre": "Tomate",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 18,
    "proteinas_g": 0.9,
    "grasas_g": 0.2,
    "carbohidratos_g": 3.9,
    "fibra_g": 1.2
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/tomate.png",
  "precio":0.8
},
{
  "_id": {
    "$oid": "64f1a0000000000000000009"
  },
  "nombre": "Queso feta",
  "categoria": "Quesos",
  "valores_nutricionales": {
    "calorias": 264,
    "proteinas_g": 14.2,
    "grasas_g": 21.5,
    "carbohidratos_g": 4.1,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/queso-feta.png",
  "precio":2.5
},
{
  "_id": {
    "$oid": "64f1a000000000000000000a"
  },
  "nombre": "Pan de pita",
  "categoria": "Pan y cereales",
  "valores_nutricionales": {
    "calorias": 275,
    "proteinas_g": 9.8,
    "grasas_g": 1.2,
    "carbohidratos_g": 55.7,
    "fibra_g": 2.2
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/pan-de-pita.png",
  "precio":1.8
},
{
  "_id": {
    "$oid": "64f1a000000000000000000b"
  },
  "nombre": "Queso mozzarella",
  "categoria": "Quesos",
  "valores_nutricionales": {
    "calorias": 280,
    "proteinas_g": 17,
    "grasas_g": 22,
    "carbohidratos_g": 2.2,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/queso-mozzarella.png",
  "precio":2.8
},
{
  "_id": {
    "$oid": "64f1a000000000000000000c"
  },
  "nombre": "Queso parmesano",
  "categoria": "Quesos",
  "valores_nutricionales": {
    "calorias": 431,
    "proteinas_g": 38,
    "grasas_g": 29,
    "carbohidratos_g": 4.1,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/queso-parmesano.png",
  "precio":3.5
},
{
  "_id": {
    "$oid": "64f1a000000000000000000d"
  },
  "nombre": "Albahaca",
  "categoria": "Hierbas y especias",
  "valores_nutricionales": {
    "calorias": 23,
    "proteinas_g": 3.2,
    "grasas_g": 0.6,
    "carbohidratos_g": 2.7,
    "fibra_g": 1.6
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/albahaca.png",
  "precio":1
},
{
  "_id": {
    "$oid": "64f1a000000000000000000e"
  },
  "nombre": "Orégano",
  "categoria": "Hierbas y especias",
  "valores_nutricionales": {
    "calorias": 265,
    "proteinas_g": 9,
    "grasas_g": 4.3,
    "carbohidratos_g": 68.9,
    "fibra_g": 42.5
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/oregano.png",
  "precio":1.1
},
{
  "_id": {
    "$oid": "64f1a000000000000000000f"
  },
  "nombre": "Pan",
  "categoria": "Pan y cereales",
  "valores_nutricionales": {
    "calorias": 265,
    "proteinas_g": 9,
    "grasas_g": 3.2,
    "carbohidratos_g": 49,
    "fibra_g": 2.7
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/pan.png",
  "precio":1.2
},
{
  "_id": {
    "$oid": "64f1a0000000000000000010"
  },
  "nombre": "Pasta (cocida)",
  "categoria": "Pan y cereales",
  "valores_nutricionales": {
    "calorias": 158,
    "proteinas_g": 5.8,
    "grasas_g": 0.9,
    "carbohidratos_g": 30.9,
    "fibra_g": 1.8
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/pasta.png",
  "precio":2
},
{
  "_id": {
    "$oid": "64f1a0000000000000000011"
  },
  "nombre": "Vinagre balsámico",
  "categoria": "Salsas y vinagres",
  "valores_nutricionales": {
    "calorias": 88,
    "proteinas_g": 0.5,
    "grasas_g": 0,
    "carbohidratos_g": 17,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/vinagre-balsamico.png",
  "precio":3
},
{
  "_id": {
    "$oid": "64f1a0000000000000000012"
  },
  "nombre": "Aceitunas negras",
  "categoria": "Conservas y encurtidos",
  "valores_nutricionales": {
    "calorias": 115,
    "proteinas_g": 0.8,
    "grasas_g": 10.7,
    "carbohidratos_g": 6.3,
    "fibra_g": 2.6
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/aceitunas-negras.png",
  "precio":2.2
},
{
  "_id": {
    "$oid": "64f1a0000000000000000013"
  },
  "nombre": "Cebolla roja",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 40,
    "proteinas_g": 1.1,
    "grasas_g": 0.1,
    "carbohidratos_g": 9.3,
    "fibra_g": 1.7
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/cebolla-roja.png",
  "precio":0.7
},
{
  "_id": {
    "$oid": "64f1a0000000000000000014"
  },
  "nombre": "Pimiento rojo",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 31,
    "proteinas_g": 1,
    "grasas_g": 0.3,
    "carbohidratos_g": 6,
    "fibra_g": 2.1
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/pimiento-rojo.png",
  "precio":0.9
},
{
  "_id": {
    "$oid": "64f1a0000000000000000015"
  },
  "nombre": "Berenjena",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 25,
    "proteinas_g": 1,
    "grasas_g": 0.2,
    "carbohidratos_g": 5.9,
    "fibra_g": 3
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/berenjena-asada.png",
  "precio":1
},
{
  "_id": {
    "$oid": "64f1a0000000000000000016"
  },
  "nombre": "Calabacín",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 17,
    "proteinas_g": 1.2,
    "grasas_g": 0.3,
    "carbohidratos_g": 3.1,
    "fibra_g": 1
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/calabacin.png",
  "precio":0.8
},
{
  "_id": {
    "$oid": "64f1a0000000000000000018"
  },
  "nombre": "Cuscús (cocido)",
  "categoria": "Pan y cereales",
  "valores_nutricionales": {
    "calorias": 112,
    "proteinas_g": 3.8,
    "grasas_g": 0.2,
    "carbohidratos_g": 23.2,
    "fibra_g": 1.4
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/cuscus-cocido.png",
  "precio":1.5
},
{
  "_id": {
    "$oid": "64f1a0000000000000000019"
  },
  "nombre": "Atún en conserva (al natural)",
  "categoria": "Pescados y mariscos",
  "valores_nutricionales": {
    "calorias": 116,
    "proteinas_g": 26,
    "grasas_g": 0.8,
    "carbohidratos_g": 0,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/atun-en-conserva.png",
  "precio":2.3
},
{
  "_id": {
    "$oid": "64f1a000000000000000001a"
  },
  "nombre": "Sardinas en aceite",
  "categoria": "Pescados y mariscos",
  "valores_nutricionales": {
    "calorias": 208,
    "proteinas_g": 25,
    "grasas_g": 11,
    "carbohidratos_g": 0,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/sardinas-en-aceite.png",
  "precio":2.1
},
{
  "_id": {
    "$oid": "64f1a000000000000000001b"
  },
  "nombre": "Pechuga de pollo (cocida)",
  "categoria": "Carne y aves",
  "valores_nutricionales": {
    "calorias": 165,
    "proteinas_g": 31,
    "grasas_g": 3.6,
    "carbohidratos_g": 0,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/pechuga-de-pollo-cocida.png",
  "precio":3
},
{
  "_id": {
    "$oid": "64f1a000000000000000001c"
  },
  "nombre": "Espinacas frescas",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 23,
    "proteinas_g": 2.9,
    "grasas_g": 0.4,
    "carbohidratos_g": 3.6,
    "fibra_g": 2.2
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/espinacas-frescas.png",
  "precio":1.2
},
{
  "_id": {
    "$oid": "64f1a000000000000000001d"
  },
  "nombre": "Arroz blanco cocido",
  "categoria": "Cereales y pan",
  "valores_nutricionales": {
    "calorias": 130,
    "proteinas_g": 2.4,
    "grasas_g": 0.3,
    "carbohidratos_g": 28,
    "fibra_g": 0.4
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/arroz-blanco-cocido.png",
  "precio":1
},
{
  "_id": {
    "$oid": "64f1a000000000000000001e"
  },
  "nombre": "Guisantes",
  "categoria": "Legumbres",
  "valores_nutricionales": {
    "calorias": 81,
    "proteinas_g": 5.4,
    "grasas_g": 0.4,
    "carbohidratos_g": 14.5,
    "fibra_g": 5.7
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/guisantes.png",
  "precio":1.1
},
{
  "_id": {
    "$oid": "64f1a000000000000000001f"
  },
  "nombre": "Pimiento verde",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 20,
    "proteinas_g": 0.9,
    "grasas_g": 0.2,
    "carbohidratos_g": 4.6,
    "fibra_g": 1.7
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/pimiento-verde.png",
  "precio":0.8
},
{
  "_id": {
    "$oid": "64f1a0000000000000000020"
  },
  "nombre": "Patata cocida",
  "categoria": "Tubérculos",
  "valores_nutricionales": {
    "calorias": 87,
    "proteinas_g": 1.9,
    "grasas_g": 0.1,
    "carbohidratos_g": 20.1,
    "fibra_g": 1.8
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/patata-cocida.png",
  "precio":0.6
},
{
  "_id": {
    "$oid": "64f1a0000000000000000021"
  },
  "nombre": "Huevos",
  "categoria": "Huevos y derivados",
  "valores_nutricionales": {
    "calorias": 143,
    "proteinas_g": 13,
    "grasas_g": 10,
    "carbohidratos_g": 1.1,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/huevos.png",
  "precio":2.5
},
{
  "_id": {
    "$oid": "64f1a0000000000000000022"
  },
  "nombre": "Gambas",
  "categoria": "Pescados y mariscos",
  "valores_nutricionales": {
    "calorias": 99,
    "proteinas_g": 24,
    "grasas_g": 0.3,
    "carbohidratos_g": 0.2,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/gambas.png",
  "precio":4
},
{
  "_id": {
    "$oid": "64f1a0000000000000000023"
  },
  "nombre": "Bacalao fresco",
  "categoria": "Pescados y mariscos",
  "valores_nutricionales": {
    "calorias": 82,
    "proteinas_g": 18,
    "grasas_g": 0.7,
    "carbohidratos_g": 0,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/bacalao-fresco.png",
  "precio":5
},
{
  "_id": {
    "$oid": "64f1a0000000000000000024"
  },
  "nombre": "Rúcula",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 25,
    "proteinas_g": 2.6,
    "grasas_g": 0.7,
    "carbohidratos_g": 3.7,
    "fibra_g": 1.6
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/rucula.png",
  "precio":1.3
},
{
  "_id": {
    "$oid": "64f1a0000000000000000025"
  },
  "nombre": "Aceitunas verdes",
  "categoria": "Conservas y encurtidos",
  "valores_nutricionales": {
    "calorias": 145,
    "proteinas_g": 1,
    "grasas_g": 15.3,
    "carbohidratos_g": 3.8,
    "fibra_g": 3.3
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/aceitunas-verdes.png",
  "precio":2.2
},
{
  "_id": {
    "$oid": "64f1a0000000000000000026"
  },
  "nombre": "Merluza",
  "categoria": "Pescados y mariscos",
  "valores_nutricionales": {
    "calorias": 82,
    "proteinas_g": 17,
    "grasas_g": 1,
    "carbohidratos_g": 0,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/merluza.png",
  "precio":4.5
},
{
  "_id": {
    "$oid": "64f1a0000000000000000027"
  },
  "nombre": "Alcachofa",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 47,
    "proteinas_g": 3.3,
    "grasas_g": 0.2,
    "carbohidratos_g": 10.5,
    "fibra_g": 5.4
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/alcachofa.png",
  "precio":1.8
},
{
  "_id": {
    "$oid": "64f1a0000000000000000028"
  },
  "nombre": "Lentejas cocidas",
  "categoria": "Legumbres",
  "valores_nutricionales": {
    "calorias": 116,
    "proteinas_g": 9,
    "grasas_g": 0.4,
    "carbohidratos_g": 20.1,
    "fibra_g": 7.9
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/lentejas-cocidas.png",
  "precio":1.5
},
{
  "_id": {
    "$oid": "64f1a0000000000000000029"
  },
  "nombre": "Berenjena asada",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 35,
    "proteinas_g": 1.3,
    "grasas_g": 0.3,
    "carbohidratos_g": 8.3,
    "fibra_g": 3
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/berenjena.png",
  "precio":1.1
},
{
  "_id": {
    "$oid": "64f1a000000000000000002a"
  },
  "nombre": "Cebada cocida",
  "categoria": "Cereales",
  "valores_nutricionales": {
    "calorias": 123,
    "proteinas_g": 2.3,
    "grasas_g": 0.4,
    "carbohidratos_g": 28.2,
    "fibra_g": 3.8
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/cebada-cocida.png",
  "precio":1.4
},
{
  "_id": {
    "$oid": "64f1a000000000000000002b"
  },
  "nombre": "Pulpo cocido",
  "categoria": "Pescados y mariscos",
  "valores_nutricionales": {
    "calorias": 82,
    "proteinas_g": 16,
    "grasas_g": 1,
    "carbohidratos_g": 2.2,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/pulpo-cocido.png",
  "precio":6.5
},
{
  "_id": {
    "$oid": "64f1a000000000000000002c"
  },
  "nombre": "Almendras",
  "categoria": "Frutos secos",
  "valores_nutricionales": {
    "calorias": 579,
    "proteinas_g": 21,
    "grasas_g": 50,
    "carbohidratos_g": 22,
    "fibra_g": 12.5
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/almendras.png",
  "precio":5
},
{
  "_id": {
    "$oid": "64f1a000000000000000002d"
  },
  "nombre": "Espaguetis integrales cocidos",
  "categoria": "Cereales y pan",
  "valores_nutricionales": {
    "calorias": 137,
    "proteinas_g": 5.5,
    "grasas_g": 0.8,
    "carbohidratos_g": 29.2,
    "fibra_g": 2.8
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/espaguetis-integrales-cocidos.png",
  "precio":2
},
{
  "_id": {
    "$oid": "64f1a000000000000000002e"
  },
  "nombre": "Queso ricotta",
  "categoria": "Quesos",
  "valores_nutricionales": {
    "calorias": 174,
    "proteinas_g": 11,
    "grasas_g": 13,
    "carbohidratos_g": 3,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/queso-ricota.png",
  "precio":2.8
},
{
  "_id": {
    "$oid": "64f1a000000000000000002f"
  },
  "nombre": "Caldo de pescado",
  "categoria": "Caldos y sopas",
  "valores_nutricionales": {
    "calorias": 15,
    "proteinas_g": 1.5,
    "grasas_g": 0.5,
    "carbohidratos_g": 1,
    "fibra_g": 0
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/caldo-de-pescado.png",
  "precio":1.2
},
{
  "_id": {
    "$oid": "64f1a0000000000000000030"
  },
  "nombre": "Aguacate",
  "categoria": "Frutas",
  "valores_nutricionales": {
    "calorias": 160,
    "proteinas_g": 2,
    "grasas_g": 15,
    "carbohidratos_g": 9,
    "fibra_g": 7
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/aguacate.png",
  "precio":1.5
},
{
  "_id": {
    "$oid": "64f1a0000000000000000031"
  },
  "nombre": "Judías verdes",
  "categoria": "Hortalizas",
  "valores_nutricionales": {
    "calorias": 31,
    "proteinas_g": 1.8,
    "grasas_g": 0.1,
    "carbohidratos_g": 7,
    "fibra_g": 3.4
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/judias-verdes.png",
  "precio":1
},
{
  "_id": {
    "$oid": "64f1a0000000000000000032"
  },
  "nombre": "Polenta cocida",
  "categoria": "Cereales",
  "valores_nutricionales": {
    "calorias": 70,
    "proteinas_g": 1.9,
    "grasas_g": 0.3,
    "carbohidratos_g": 15,
    "fibra_g": 1
  },
  "img": "https://imagenes.ruthunir.com/ingredientes/polenca-cocida.png",
  "precio":1.3
}

];

this.productos = productosJSON.map(p => ({
      _id: p._id.$oid,
      nombre: p.nombre,
      categoria: p.categoria,
      valores_nutricionales: p.valores_nutricionales,
      img: p.img,
      precio:p.precio
    }));
  }

getProductos():Producto[]{
  return this.productos;
}


  
}
