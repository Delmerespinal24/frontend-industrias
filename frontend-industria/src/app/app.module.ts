import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { Seccion1Component } from './component/seccion1/seccion1.component';
import { Seccion2Component } from './component/seccion2/seccion2.component';
import { HomeComponent } from './home/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    Seccion1Component,
    Seccion2Component,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  exports:[NavbarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
