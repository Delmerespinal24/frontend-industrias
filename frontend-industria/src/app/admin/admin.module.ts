import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroAdminComponent } from './componentAdmin/registro-admin/registro-admin.component';
import { PerfilAdminComponent } from './componentAdmin/perfil-admin/perfil-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginAdminComponent } from './componentAdmin/login-admin/login-admin.component'; 
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { PlanesComponent } from './componentAdmin/planes/planes.component';



@NgModule({
  declarations: [
  
    RegistroAdminComponent,
    PerfilAdminComponent,
    LoginAdminComponent,
    PlanesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    RegistroAdminComponent
  ]

})
export class AdminModule { }
