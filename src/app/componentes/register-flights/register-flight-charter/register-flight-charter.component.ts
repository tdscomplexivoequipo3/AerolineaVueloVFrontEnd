import { Component, OnInit } from '@angular/core';
import {Flight} from "../../../models/Flight";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalConstants} from "../../../common/GlobalConstants";
import {TypeFlightService} from "../../../services/TypeFlightService";
import {TypeFlight} from "../../../models/TypeFlight";
import {ReservaRequest} from "../../../models/Request/ReservaRequest";
import {ReservaService} from "../../../services/ReservaService";
import {VueloService} from "../../../services/Vuelo.service";
import {PlaneService} from "../../../services/PlaneService";
import {Plane} from "../../../models/Plane";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register-flight-charter',
  templateUrl: './register-flight-charter.component.html',
  styleUrls: ['./register-flight-charter.component.css']
})
export class RegisterFlightCharterComponent implements OnInit {

  idreserva:any;
  flight:Flight=new Flight();
  typeFlight:TypeFlight=new TypeFlight();
  flightGet:Flight=new Flight();
  flightSet:Flight=new Flight();
  reserva:ReservaRequest=new ReservaRequest();
  listtypeflight:Array<TypeFlight>=[];
  datoscharter=false;
  listPlane:Array<Plane>=[];
  idvuelo:any;

  public classReference = GlobalConstants;
  constructor(private route:ActivatedRoute,
              private typeflightService:TypeFlightService,
              private router:Router,
              private reservaService:ReservaService,
              private vService:VueloService,
              private planeService:PlaneService,
              private snackBar: MatSnackBar) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
    this.idreserva=this.route.snapshot.params['idreserva'];
    if (this.idreserva){
      this.cargar_datos_charter();
    }
    this.listarPlanes();
    this.listartipovuelo();
  }

  listartipovuelo(){
    this.typeflightService.getAll().subscribe(data=>{
      this.listtypeflight=data;
    })
  }

  listarPlanes(){
    this.planeService.getAll().subscribe(data=>{
      this.listPlane=data;
    })
  }

  cargar_datos_charter(){
    this.typeflightService.getAll().subscribe(value => {
      this.listtypeflight=value;
      this.typeFlight=this.listtypeflight.find(m=>{return (m.nombre).toLowerCase()=="charter"})
      console.log(this.typeFlight)

      this.datoscharter=true;
      this.reservaService.getReservaByid(this.idreserva).subscribe(x=>{
        this.reserva=x;
        this.flight.idTipoVuelo=this.typeFlight.idTipoVuelo;
      })
    })
  }


  guardarVuelo(){
    this.flight.idUsuario=JSON.parse(sessionStorage.getItem("user")+"").id;
    this.flight.estado=Number(1);
    this.flight.precio=Number(this.flight.precio);
    this.flight.destino=this.reserva.destino;
    this.flight.origen=this.reserva.origen;
    this.flight.horaSalida=this.reserva.horaSalida;
    this.flight.horaLlegada=this.reserva.horaLlegada;
    this.flight.fechaIda=this.reserva.fechaIda;
    this.flight.fechaVuelta=this.reserva.fechaVuelta;
    this.vService.create(this.flight).subscribe(m=>{
      this.flightGet=m;
      this.idvuelo=this.flightGet.idVuelo;
      this.snackBar.open("VUELO CREADO", "",{
        duration: 1 * 1000,
      });
    })
  }

  updateReserva(id:any){
    this.reserva.idVuelo=Number(id);
    this.reserva.estado=2;
    this.reservaService.update(this.reserva).subscribe(value => {
      this.router.navigate(['/registro/gestion/reservas'])
    })
  }

}
