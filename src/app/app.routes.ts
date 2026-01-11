import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SobreNosotros } from './pages/sobre-nosotros/sobre-nosotros';
import { Recetas } from './pages/recetas/recetas';
import { ProductosSer } from './pages/productos/productos';
import { Carrito } from './pages/carrito/carrito';
import { Usuario } from './pages/usuario/usuario';
import { Login } from './modules/auth/login/login';
import { Register } from './modules/auth/register/register';

//Aquí van las rutas en el proyecto!!
export const routes: Routes = [
  { path: '', component: Home }, //Ruta para la página de inicio
  { path: 'sobre-nosotros', component: SobreNosotros }, //Ruta para la página de Sobre nosotros
  { path: 'recetas', component: Recetas }, //Ruta para la página de recetas
  { path: 'productos', component: ProductosSer }, //Ruta para la página de productos
  { path: 'carrito', component: Carrito }, //Ruta para la página de carrito
  { path: 'usuario', component: Usuario }, //Ruta para la página de usuario
  { path: 'login', component: Login }, //Ruta para iniciar sesión
  { path: 'registro', component: Register }, //Ruta para registrarse
  { path: '**', redirectTo: '' }, //Ruta error = redireccionamos a la ruta RAIZ
];
