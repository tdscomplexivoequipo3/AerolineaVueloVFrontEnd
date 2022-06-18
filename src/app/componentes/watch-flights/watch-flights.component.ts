import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlightService} from "../../services/TypeFlightService";
import {VueloService} from "../../services/Vuelo.service";
import {VueloResponse} from "../../models/Response/VueloResponse";


@Component({
  selector: 'app-watch-flights',
  templateUrl: './watch-flights.component.html',
  styleUrls: ['./watch-flights.component.css']
})
export class WatchFlightsComponent implements OnInit {

  listflights:Array<VueloResponse>=[];
  //Fitro
  listflightsF:Array<VueloResponse>=[];

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog, private typeflightService:TypeFlightService,
              private vueloService:VueloService) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
    this.listarflights();
  }

  listarflights(){
    this.listflights=new Array<VueloResponse>();
    this.vueloService.listAll().subscribe(data=>{
      this.listflights=data;

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

}
