import { ValoresNutricionales } from "./valoresnutricionales";
export interface Ingrediente{
    id: string;
    nombre:string;
    categoria:string;
    valoresNutricionales: ValoresNutricionales;
    img: string;

}