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
import { HeaderadComponent } from './layoutadmin/headerad/headerad.component';
import { SliderComponent } from './layoutadmin/slider/slider.component';
import {HttpClientModule} from "@angular/common/http";
import {UsuarioService} from "./services/Usuario.service";
import { OfertasUsersComponent } from './componentes/reservas/ofertas-users/ofertas-users.component';
import { EquipajeComponent } from './componentes/reservas/equipaje/equipaje.component';
import {EstadoComponent} from "./layout/estado/estado.component";
import {DialogComponent} from "./layout/dialog/dialog.component";
import {TypeFlightsComponent} from "./componentes/type-flights/type-flights.component";
import {RegisterPlaneComponent} from "./componentes/register-plane/register-plane.component";
import {ProgrammingFlightsComponent} from "./componentes/programming-flights/programming-flights.component";
import {InicioComponent} from "./layout/inicio/inicio.component";
import {RegisterSeatComponent} from "./componentes/register-seat/register-seat.component";


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'reservas/:email', component:ReservaUsuarioComponent},
  {path:'registro/vuelos', component:RegistroVuelosComponent},
  {path:'oferas/vuelos/:email', component:OfertasUsersComponent},
  {path:'equipaje', component:EquipajeComponent},
  {path:'registro/vuelos/type', component:TypeFlightsComponent},
  {path:'registro/avion', component:RegisterPlaneComponent},
  {path:'registro/programa/vuelo', component:ProgrammingFlightsComponent},
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
    HeaderadComponent,
    SliderComponent,
    OfertasUsersComponent,
    EquipajeComponent,
    EstadoComponent,
    DialogComponent,
    TypeFlightsComponent,
    RegisterPlaneComponent,
    ProgrammingFlightsComponent,
    InicioComponent,
    RegisterSeatComponent,
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
