import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SobreNosotros } from './pages/sobre-nosotros/sobre-nosotros';
import { Recetas } from './pages/recetas/recetas';
import { ProductosSer } from './pages/productos/productos';
import { Carrito } from './pages/carrito/carrito';
import { Usuario } from './pages/usuario/usuario';

//Aquí van las rutas en el proyecto!!
export const routes: Routes = [

    {path:'', component: Home}, //Ruta para la página de inicio
    {path:'Sobre nosotros', component: SobreNosotros}, //Ruta para la página de Sobre nosotros
    {path:'Recetas', component: Recetas}, //Ruta para la página de recetas
    {path:'Productos', component: ProductosSer}, //Ruta para la página de productos
    {path:'Carrito', component: Carrito}, //Ruta para la página de carrito
    {path:'Usuario', component: Usuario}, //Ruta para la página de usuario
    {path:'**', redirectTo:''}, //Ruta error = redireccionamos a la ruta RAIZ


];
