import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlightService} from "../../services/TypeFlightService";
import {VueloService} from "../../services/Vuelo.service";
import {VueloResponse} from "../../models/Response/VueloResponse";
import {TypeFlight} from "../../models/TypeFlight";
import {PromocionRequest} from "../../models/Request/PromocionRequest";
import {PromocionService} from "../../services/PromocionService";
import Swal from "sweetalert2";
import {PromocionResponse} from "../../models/Response/PromocionResponse";


@Component({
  selector: 'app-watch-flights',
  templateUrl: './watch-flights.component.html',
  styleUrls: ['./watch-flights.component.css']
})
export class WatchFlightsComponent implements OnInit {

  prom:any;
  carga=true;
  @ViewChild('dialgOferta')
  dialgOferta!: TemplateRef<any>;

  listflights:Array<VueloResponse>=[];
  //Fitro
  listflightsF:Array<VueloResponse>=[];

  typeFlight:TypeFlight=new TypeFlight();

  listaPromociones:Array<PromocionResponse>=[];

  promocionRequest:PromocionRequest=new PromocionRequest();
  flight:VueloResponse=new VueloResponse();

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog,
              private typeflightService:TypeFlightService,
              private vueloService:VueloService,
              private promocionService:PromocionService) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
    this.listarflights();
    this.listarPromociones();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.carga=false;
    },2000)
  }

  listarflights(){
    this.listflights=new Array<VueloResponse>();
    this.typeflightService.getAll().subscribe((value:any) => {
      this.typeFlight=value.find((m:any)=>{return (m.nombre).toLowerCase()=="comercial"});
      console.log(this.typeFlight)

        this.vueloService.listAll().subscribe(data=>{
          this.listflights=data.filter(val => val.idTipoVuelo==this.typeFlight.idTipoVuelo);
          console.log(this.listflights)
          for (let es of this.listflights){
            if(es.estado==1){
              es.estado="Activo";
            }else if (es.estado==3){
              es.estado="Pendiente";
            }else if(es.estado==2){
              es.estado="Inactivo";
            }
          }
        })
    })

  }

  listarPromociones(){
    this.promocionService.getAllPromociones().subscribe(value => {
      this.listaPromociones=value;
    })
  }

  flitrar($event :any) {
    this.listflightsF=new Array<VueloResponse>();
    for (let fa of this.listflights){
      if (fa.origen==$event.target.value || fa.destino==$event.target.value){
        this.listflightsF.push(fa);
        console.log(this.listflightsF)
      }
    }
    console.log(this.listflightsF.length)
    if(this.listflightsF.length>=1){
      this.listflights=this.listflightsF;
    }else{
      this.listarflights();
    }
  }

  openPromociono(a:VueloResponse){
    this.flight=a;
    this.dialog.open(this.dialgOferta)
  }

  enOferta (idv:any){
    this.prom=null;
      let promocion=this.listaPromociones.find(value1 => {return value1.idVuelo==idv})
      if (promocion){
        this.prom='En oferta';
      }

  }

  promocionar(v:VueloResponse){
    this.promocionRequest.idVuelo=v.idVuelo;
    this.promocionRequest.fechaInicio=v.fechaIda;
    this.promocionRequest.fechaFin=v.fechaVuelta;
    this.promocionService.save(this.promocionRequest).subscribe(value => {
      Swal.fire({
        icon: 'success',
        title: 'PROMOCIONAR',
        text: 'Registro Correcto',
        confirmButtonColor: "#0c3255"
      })
      this.dialog.closeAll();
      this.listarflights();
    },error => {
      Swal.fire({
        icon: 'warning',
        title: 'Error al Guardar',
        text: error.error.message,
        confirmButtonColor: "#0c3255"
      })
    })
  }

}
