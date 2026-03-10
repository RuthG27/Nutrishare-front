import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home';
import { SobreNosotrosComponent } from './modules/about/sobre-nosotros';
import { RecetasComponent } from './modules/recetas/recetas';
import { RecetaDetail, RecetaCreate, RecetaEdit } from './modules/recetas';
import { ProductosComponent } from './modules/productos/productos';
import { CarritoComponent } from './modules/carrito/carrito';
import { UsuarioComponent } from './modules/profile/usuario';
import { LoginComponent } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register';
import { RecipeV2PdfDemoComponent } from './recipev2/recipev2-pdf-demo.component';

//Aquí van las rutas en el proyecto!!
export const routes: Routes = [
  { path: '', component: HomeComponent }, //Ruta para la página de inicio
  { path: 'sobre-nosotros', component: SobreNosotrosComponent }, //Ruta para la página de Sobre nosotros
  { path: 'recetas', component: RecetasComponent }, //Ruta para la página de Recetas
  { path: 'recetas/crear', component: RecetaCreate }, //Ruta para la página de Crear Receta
  { path: 'recetas/editar/:id', component: RecetaEdit }, //Ruta para la página de Editar Receta
  { path: 'recetas/:id', component: RecetaDetail }, //Ruta para la página de Detalle de Receta
  { path: 'productos', component: ProductosComponent }, //Ruta para la página de Productos
  { path: 'carrito', component: CarritoComponent }, //Ruta para la página de Carrito
  { path: 'usuario', component: UsuarioComponent }, //Ruta para la página de Usuario
  { path: 'login', component: LoginComponent }, //Ruta para la página de Login
  { path: 'registro', component: RegisterComponent }, //Ruta para la página de Registro
  { path: 'recipev2-pdf-demo', component: RecipeV2PdfDemoComponent }, //Ruta para la demo de PDF de recetas (pdf-lib)
  { path: '**', redirectTo: '' }, //Ruta error = redireccionamos a la ruta RAIZ
];
