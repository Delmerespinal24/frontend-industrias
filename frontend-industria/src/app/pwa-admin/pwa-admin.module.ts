import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaLoginComponent } from './componentPwaAdmin/pwa-login/pwa-login.component';
import { PwaHomeComponent } from './componentPwaAdmin/pwa-home/pwa-home.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PwaLoginComponent,
    PwaHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PwaAdminModule { }
