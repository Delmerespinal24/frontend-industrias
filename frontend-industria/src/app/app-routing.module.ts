import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAdminComponent } from './admin/componentAdmin/registro-admin/registro-admin.component';
import { PerfilAdminComponent } from './admin/componentAdmin/perfil-admin/perfil-admin.component';
import { HomeComponent } from './home/home/home.component';
import { LoginAdminComponent } from './admin/componentAdmin/login-admin/login-admin.component';
import { PlanesComponent } from './admin/componentAdmin/planes/planes.component';
import { LoginClienteComponent } from './admin/cliente/login-cliente/login-cliente.component';
import { RegistroClienteComponent } from './admin/cliente/registro-cliente/registro-cliente.component';
import { LandingFestivalComponent } from './admin/cliente/landing-festival/landing-festival.component';
import { PwaAdminModule } from './pwa-admin/pwa-admin.module';
import { PwaLoginComponent } from './pwa-admin/componentPwaAdmin/pwa-login/pwa-login.component';
import { PwaHomeComponent } from './pwa-admin/componentPwaAdmin/pwa-home/pwa-home.component';
import { ProductsComponent } from './admin/cliente/products/products.component';


const routes: Routes = [
  { path:'', component:HomeComponent},
  { path:'registro-admin', component:RegistroAdminComponent},
  { path:'perfil-admin', component:PerfilAdminComponent},
  { path:'login-admin',component:LoginAdminComponent},
  { path:'planes',component:PlanesComponent},
  { path:'login-festival',component:LoginClienteComponent},
  { path:'registro-festival',component:RegistroClienteComponent},
  { path:'landingpage',component:LandingFestivalComponent},
  { path: 'machinery', component:ProductsComponent },
  { path:'loginPWA',component:PwaLoginComponent},
  { path: 'homePWA', component: PwaHomeComponent },

  { path: '', component: PwaAdminModule, children: [
    { path: 'login', component: PwaLoginComponent },
    { path: 'home', component: PwaHomeComponent },
  ] 
}

];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
