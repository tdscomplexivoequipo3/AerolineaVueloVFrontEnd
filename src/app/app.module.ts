import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroVuelosComponent } from './componentes/registro-vuelos/registro-vuelos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../material/material.module";


const routes: Routes = [
  {path:'', component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroVuelosComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
