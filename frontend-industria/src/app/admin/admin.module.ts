import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroAdminComponent } from './componentAdmin/registro-admin/registro-admin.component';
import { PerfilAdminComponent } from './componentAdmin/perfil-admin/perfil-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 




@NgModule({
  declarations: [
  
    RegistroAdminComponent,
    PerfilAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    RegistroAdminComponent
  ]

})
export class AdminModule { }
