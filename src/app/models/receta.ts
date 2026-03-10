import { Nutrientes } from "./nutrientes";

export interface Receta{
    id?: string;
    nombre: string;
    cocina: string;
    categoria:string;
    dificultad: string;
    tiempoPreparacion: string;
    pasos: string[];
    ingredientes: string[];
    nutrientes: Nutrientes;
    img:string;
    puntuacion: number;


}