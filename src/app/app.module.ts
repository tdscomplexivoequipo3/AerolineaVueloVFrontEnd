import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import {RegistroVuelosComponent} from "./componentes/register-flights/registro-vuelos.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import { RegistroComponent } from './componentes/register/register.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './layout/header/header.component';
import { ReservaUsuarioComponent } from './componentes/reservas/reserva-usuario/reserva-usuario.component';
import {FooterComponent} from "./layout/footer/footer.component";
import {RegisterCitiesComponent} from "./componentes/register-cities/register-cities.component";
import { HeaderadComponent } from './layoutadmin/headerad/headerad.component';
import { SliderComponent } from './layoutadmin/slider/slider.component';
import {HttpClientModule} from "@angular/common/http";
import {UsuarioService} from "./services/Usuario.service";


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'reservas', component:ReservaUsuarioComponent},
  {path:'registro/vuelos', component:RegistroVuelosComponent},
  {path:'registro/vuelos/cities', component:RegisterCitiesComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroVuelosComponent,
    RegistroComponent,
    HeaderComponent,
    ReservaUsuarioComponent,
    FooterComponent,
    RegistroVuelosComponent,
    RegisterCitiesComponent,
    HeaderadComponent,
    SliderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
