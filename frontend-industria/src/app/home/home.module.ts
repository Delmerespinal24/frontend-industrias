import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../component/navbar/navbar.component';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NavbarComponent
  ]
})
export class HomeModule { }
