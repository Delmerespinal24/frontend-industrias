import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroAdminComponent } from './componentAdmin/registro-admin/registro-admin.component';
import { PerfilAdminComponent } from './componentAdmin/perfil-admin/perfil-admin.component';


@NgModule({
  declarations: [
  
    RegistroAdminComponent,
       PerfilAdminComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
