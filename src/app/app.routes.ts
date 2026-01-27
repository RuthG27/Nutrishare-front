import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home';
import { SobreNosotrosComponent } from './modules/about/sobre-nosotros';
import { RecetasComponent } from './modules/recetas/recetas';
import { ProductosComponent } from './modules/productos/productos';
import { CarritoComponent } from './modules/carrito/carrito';
import { UsuarioComponent } from './modules/profile/usuario';
import { LoginComponent } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register';

//Aquí van las rutas en el proyecto!!
export const routes: Routes = [
  { path: '', component: HomeComponent }, //Ruta para la página de inicio
  { path: 'sobre-nosotros', component: SobreNosotrosComponent }, //Ruta para la página de Sobre nosotros
  { path: 'recetas', component: RecetasComponent }, //Ruta para la página de recetas
  { path: 'productos', component: ProductosComponent }, //Ruta para la página de productos
  { path: 'carrito', component: CarritoComponent }, //Ruta para la página de carrito
  { path: 'usuario', component: UsuarioComponent }, //Ruta para la página de usuario
  { path: 'login', component: LoginComponent }, //Ruta para iniciar sesión
  { path: 'registro', component: RegisterComponent }, //Ruta para registrarse
  { path: '**', redirectTo: '' }, //Ruta error = redireccionamos a la ruta RAIZ
];
