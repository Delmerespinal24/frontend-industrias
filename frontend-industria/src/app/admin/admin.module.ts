import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroAdminComponent } from './componentAdmin/registro-admin/registro-admin.component';
import { PerfilAdminComponent } from './componentAdmin/perfil-admin/perfil-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginAdminComponent } from './componentAdmin/login-admin/login-admin.component'; 
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { PlanesComponent } from './componentAdmin/planes/planes.component';
import { LoginClienteComponent } from './cliente/login-cliente/login-cliente.component';
import { RegistroClienteComponent } from './cliente/registro-cliente/registro-cliente.component';
import { ProductsComponent } from './cliente/products/products.component';
import { ProductDetailsComponent } from './cliente/product-details/product-details.component';
import { CustomerPaymentComponent } from './cliente/customer-payment/customer-payment.component';
import { PaymentConfirmationComponent } from './cliente/payment-confirmation/payment-confirmation.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
  
    RegistroAdminComponent,
    PerfilAdminComponent,
    LoginAdminComponent,
    PlanesComponent,
    LoginClienteComponent,
    RegistroClienteComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CustomerPaymentComponent,
    PaymentConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports:[
    RegistroAdminComponent
  ]

})
export class AdminModule { }
