import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import {RegistroVuelosComponent} from "./componentes/register-flights/registro-vuelos.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import { RegistroComponent } from './componentes/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './layout/header/header.component';
import { ReservaUsuarioComponent } from './componentes/reservas/reserva-usuario/reserva-usuario.component';
import {FooterComponent} from "./layout/footer/footer.component";
import { HeaderadComponent } from './layoutadmin/headerad/headerad.component';
import { SliderComponent } from './layoutadmin/slider/slider.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import {VueloService} from "./services/Vuelo.service";
import {ResumenComponent} from "./componentes/reservas/equipaje/resumen/resumen.component";
import {UserTokenService} from "./services/UserTokenService";
import {UnAuthorizedInterceptor} from "./UnAuthorizedInterceptor";
import {CentroaComponent} from "./layout/centroa/centroa.component";
import {CoronavirusComponent} from "./layout/menus/coronavirus/coronavirus.component";
import {CambiosComponent} from "./layout/menus/cambios/cambios.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {ReservaCharterComponent} from "./componentes/reservas/reserva-charter/reserva-charter.component";
import {ListaPasajerosComponent} from './componentes/reservas/reserva-charter/lista-pasajeros/lista-pasajeros.component';
import {ProblemasComponent} from "./layout/menus/problemas/problemas.component";
import {CuentasComponent} from "./layout/menus/cuentas/cuentas.component";
import {EmbarqueComponent} from "./layout/menus/embarque/embarque.component";
import {EquipajemComponent} from "./layout/menus/equipajem/equipajem.component";
import {DocumentosComponent} from "./layout/menus/documentos/documentos.component";
import {NecesidadesComponent} from "./layout/menus/necesidades/necesidades.component";
import {MascotasComponent} from "./layout/menus/mascotas/mascotas.component";
import {AdministrarvComponent} from "./layout/administrarv/administrarv.component";
import {SolicitarvComponent} from "./layout/menusviajes/solicitarv/solicitarv.component";
import {IngresavComponent} from "./layout/menusviajes/ingresav/ingresav.component";
import {DestinosComponent} from "./layout/destinos/destinos.component";
import {WatchFlightsComponent} from "./componentes/watch-flights/watch-flights.component";
import { HistorialUserComponent } from './componentes/reservas/historial-user/historial-user.component';
import {AsientoService} from "./services/Asiento.service";
import {PasajeroService} from "./services/Pasajero.service";
import {NacionalesComponent} from "./layout/destinostu/nacionales/nacionales.component";
import {InternacionalesComponent} from "./layout/destinostu/internacionales/internacionales.component";
import {ScriptService} from "./services/ScriptService";
import {DesignationRolesComponent} from "./componentes/designation-roles/designation-roles.component";
import {GestionReservasComponent} from "./componentes/gestion-reservas/gestion-reservas.component";
import {RequisitosvComponent} from "./layout/requisitosv/requisitosv.component";
import {CondicionesgComponent} from "./layout/condicionesg/condicionesg.component";
import { ValidationPasajerosComponent } from './componentes/validation-pasajeros/validation-pasajeros.component';
import { ListadoPasajerosComponent } from './componentes/reservas/listado-pasajeros/listado-pasajeros.component';
import { DialogerrorComponent } from './layout/dialogerror/dialogerror.component';
import { OfertasdComponent } from './layout/ofertasd/ofertasd.component';
import {ListadoValidaBoletosComponent} from "./componentes/listado-valida-boletos/listado-valida-boletos.component";
import {CheckingTicketComponent} from "./componentes/checking-ticket/checking-ticket.component";
import {
  RegisterFlightCharterComponent
} from "./componentes/register-flights/register-flight-charter/register-flight-charter.component";
import {ReportefacturasComponent} from "./componentes/reportefacturas/reportefacturas.component";

const routes: Routes = [
  {path:'reservas/:email', component:ReservaUsuarioComponent},
  {path:'reservas', component:ReservaUsuarioComponent},
  {path:'registro', component:RegistroComponent},
  {path:'login', component:LoginComponent},
  {path:'registro/new/flight', component:RegistroVuelosComponent},
  {path:'ofertas/vuelos/:email', component:OfertasUsersComponent},
  {path:'equipaje', component:EquipajeComponent},
  {path:'registro/vuelos/type', component:TypeFlightsComponent},
  {path:'registro/avion', component:RegisterPlaneComponent},
  {path:'registro/programa/vuelo', component:ProgrammingFlightsComponent},
  {path:'reserva/:id_vuelo/:tipo', component:ResumenComponent},
  {path:'registro/watch/flights', component:WatchFlightsComponent},
  {path:'ofertas/charter/:email', component:ReservaCharterComponent},
  {path:'lista_pasajeros/:reserva',component:ListaPasajerosComponent},
  {path:'historial',component:HistorialUserComponent},
  {path:'validation_pasajeros',component:ValidationPasajerosComponent},
  {path:'lista_charter/:id_vuelo',component:ListadoPasajerosComponent},
  {path:'registro/watch/reportes',component:ReportefacturasComponent},
  {path:'centroa',component:CentroaComponent,
    children:[
      {
        path: 'coronavirus',
        component: CoronavirusComponent
      },
      {
        path: '',
        component: CoronavirusComponent
      },
      {
        path:'cambios',
        component:CambiosComponent
      },
      {
        path:'problemas',
        component:ProblemasComponent
      },
      {
        path:'cuentas',
        component:CuentasComponent
      },
      {
        path:'embarque',
        component:EmbarqueComponent
      },
      {
        path:"equipajem",
        component:EquipajemComponent
      },
      {
        path:'documentos',
        component:DocumentosComponent
      },
      {
        path:'necesidades',
        component:NecesidadesComponent
      },
      {
        path:'mascotas',
        component:MascotasComponent
      }


    ]},
  {path:'estado',component:EstadoComponent},
  {path:'administrarviajes',component:AdministrarvComponent,
    children:[
      {
        path: 'solicitarv',
        component: SolicitarvComponent
      },
      {path: '',
        component: SolicitarvComponent
      },
      {
        path:'ingresadatos',
        component: IngresavComponent
      }

    ]},
  {path:'',component:InicioComponent},
  {path:'destinos',component:DestinosComponent,
  children:[
    {
      path: '',
      component: NacionalesComponent
    },
    {
      path: 'destinos/nacionales',
      component: NacionalesComponent
    },
    {
      path: 'destinos/internacionales',
      component: InternacionalesComponent
    }
  ]},
  {path:'asignacion/roles',component:DesignationRolesComponent},
  {path:'registro/edit/flight/:idvuelo', component:RegistroVuelosComponent},
  {path:'registro/gestion/reservas', component:GestionReservasComponent},
  {path:'registro/charter/flight/:idreserva', component:RegisterFlightCharterComponent},
  {path:'administracion/home', component:SliderComponent},
  {path:'restricciones',component:RequisitosvComponent},
  {path:'condiciones',component:CondicionesgComponent},
  {path:'ofertas/destino/:destino/:id',component:OfertasUsersComponent},
  {path:'inicio/ofertasdestinos',component:OfertasdComponent},
  {path:'ofertas/busqueda/:origen/:destino/:fida/:fregreso',component:OfertasUsersComponent},
  {path:'registro/checking/ticket', component:CheckingTicketComponent},
  {path:'registro/list/ticket/:idvuelo', component:ListadoValidaBoletosComponent},
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
    ResumenComponent,
    CentroaComponent,
    CambiosComponent,
    CoronavirusComponent,
    WatchFlightsComponent,
    ReservaCharterComponent,
    ListaPasajerosComponent,
    ProblemasComponent,
    CuentasComponent,
    EmbarqueComponent,
    EquipajemComponent,
    DocumentosComponent,
    NecesidadesComponent,
    MascotasComponent,
    AdministrarvComponent,
    SolicitarvComponent,
    IngresavComponent,
    DestinosComponent,
    HistorialUserComponent,
    NacionalesComponent,
    InternacionalesComponent,
    DesignationRolesComponent,
    GestionReservasComponent,
    RequisitosvComponent,
    CondicionesgComponent,
    ValidationPasajerosComponent,
    ListadoPasajerosComponent,
    DialogerrorComponent,
    OfertasdComponent,
    ListadoValidaBoletosComponent,
    CheckingTicketComponent,
    RegisterFlightCharterComponent,
    ReportefacturasComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [UsuarioService,VueloService,UserTokenService,AsientoService,PasajeroService,ScriptService,
  {provide:HTTP_INTERCEPTORS, useClass: UnAuthorizedInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
