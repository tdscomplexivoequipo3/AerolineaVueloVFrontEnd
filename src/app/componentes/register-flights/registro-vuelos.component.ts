import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatTableDataSource} from "@angular/material/table";
import {Cities} from "../../models/Cities";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlightService} from "../../services/TypeFlightService";
import {VueloService} from "../../services/Vuelo.service";
import {TypeFlight} from "../../models/TypeFlight";
import {Flight} from "../../models/Flight";
import {Plane} from "../../models/Plane";
import {PlaneService} from "../../services/PlaneService";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaService} from "../../services/ReservaService";
import {ReservaRequest} from "../../models/Request/ReservaRequest";
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-register-flights',
  templateUrl: './registro-vuelos.component.html',
  styleUrls: ['./registro-vuelos.component.css']
})
export class RegistroVuelosComponent implements OnInit {

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('dialogvuelo')

  //Dialogo
  dialogvuelo!: TemplateRef<any>;

  //Vuelos comerciales
  listtypeflight:Array<TypeFlight>=[];
  listPlane:Array<Plane>=[];
  flight:Flight=new Flight();
  idvuelo:any;


  //Vuelos Charter
  reserva:ReservaRequest=new ReservaRequest();
  datoscharter=false;




  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog,
              private typeflightService:TypeFlightService,
              private vueloService:VueloService,
              private planeService:PlaneService,
              private route:ActivatedRoute,
              private router:Router) {
    this.classReference.apiURL="employe";
    this.listartipovuelo();
    this.listarPlanes();
  }

  ngOnInit(): void {

    this.idvuelo=this.route.snapshot.params['idvuelo'];
    if (this.idvuelo){
      this.vueloService.getVueloById(this.idvuelo).subscribe((data:any)=>{
        this.flight=data;
        this.flight.estado=String(this.flight.estado);
      })
    }

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

  guardarVuelo(){
    this.flight.idUsuario=JSON.parse(sessionStorage.getItem("user")+"").id;
    this.flight.estado=Number(this.flight.estado);
    this.flight.precio=Number(this.flight.precio);

    if (this.idvuelo){
      this.vueloService.update(this.flight).subscribe(m=>{
        this.router.navigate(['/registro/watch/flights'])
      })
    }else{
      this.vueloService.create(this.flight).subscribe(m=>{
        this.router.navigate(['/registro/watch/flights'])
      })
    }

  }


  cargarImg(e: any) {
    let img = e.target.files
    let reader = new FileReader();
    reader.readAsDataURL(img[0]);
    reader.onloadend = () => {

      this.flight.imagen = reader.result;
    }
  }
}
