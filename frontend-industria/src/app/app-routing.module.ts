import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAdminComponent } from './admin/componentAdmin/registro-admin/registro-admin.component';
import { PerfilAdminComponent } from './admin/componentAdmin/perfil-admin/perfil-admin.component';
import { HomeComponent } from './home/home/home.component';



const routes: Routes = [
  { path:'', component:HomeComponent},
  { path:'registro-admin', component:RegistroAdminComponent},
  {path:'perfil-admin', component:PerfilAdminComponent},
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
