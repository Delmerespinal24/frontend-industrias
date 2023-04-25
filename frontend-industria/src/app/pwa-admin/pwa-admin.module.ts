import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaLoginComponent } from './componentPwaAdmin/pwa-login/pwa-login.component';
import { PwaHomeComponent } from './componentPwaAdmin/pwa-home/pwa-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PwaDetallesComponent } from './componentPwaAdmin/pwa-detalles/pwa-detalles.component';
import { RouterModule } from '@angular/router';
import { PwaActualizarComponent } from './componentPwaAdmin/pwa-actualizar/pwa-actualizar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    PwaLoginComponent,
    PwaHomeComponent,
    PwaDetallesComponent,
    PwaActualizarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class PwaAdminModule { }
