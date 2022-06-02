import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroVuelosComponent } from './componentes/registro-vuelos/registro-vuelos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroVuelosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
