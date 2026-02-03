import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home';
import { SobreNosotrosComponent } from './modules/about/sobre-nosotros';
import { RecetasComponent } from './modules/recetas/recetas';
import { DetalleComponent } from './modules/recetas/detalle/detalle';
import { ProductosComponent } from './modules/productos/productos';
import { CarritoComponent } from './modules/carrito/carrito';
import { UsuarioComponent } from './modules/profile/usuario';
import { LoginComponent } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register';
import { SubirRecetaComponent } from './modules/subir-receta/subir-receta';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'recetas', component: RecetasComponent },
  { path: 'recetas/:id', component: DetalleComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'subir-receta', component: SubirRecetaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];
