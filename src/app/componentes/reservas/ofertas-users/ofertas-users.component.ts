import { Component, OnInit } from '@angular/core';
import {Vuelo_Envio} from "../../../models/Vuelo_Envio.";
import {VueloResponse} from "../../../models/Response/VueloResponse";
import {DatePipe} from "@angular/common";
import {FechaFilter} from "../../../models/FechaFilter";

@Component({
  selector: 'app-ofertas-users',
  templateUrl: './ofertas-users.component.html',
  styleUrls: ['./ofertas-users.component.css']
})
export class OfertasUsersComponent implements OnInit {

  constructor() {
    for (let i = 0; i < this.vuelos.length; i++) {
      this.changeColor.push(false);
      this.vuelos_envio.push(new Vuelo_Envio(this.vuelos[i].idVuelo))
      this.changeColor_options.push(false);
      //Filtrado
      let mes=this.vuelos[i].fechaIda.substr(5,2);
      if(!this.filter.find(i => i.mes === mes)){
        this.filter.push(new FechaFilter(mes));
      }
    }

    this.vuelos_filtrados=this.vuelos;
    this.filter.sort((a,b) => a.mes-b.mes);
  }

  changeColor:boolean[]=[];
  vuelos:VueloResponse[]=[ {idVuelo:1,
    precio:10,
    origen:"Cuenca",
    destino:"Quito",
    estado:false,
    idTipoVuelo:1,
    fechaIda:"2022/10/12",
    fechaVuelta:"2022/10/12",
    horaSalida:10,
    horaLlegada:11,
    imagen:"" },
    {idVuelo:2,
      precio:20,
      origen:"Guaayquil",
      destino:"Santo Domingo",
      estado:false,
      idTipoVuelo:1,
      fechaIda:"2022/09/12",
      fechaVuelta:"2022/09/12",
      horaSalida:15,
      horaLlegada:18,
      imagen:"" },
    {idVuelo:3,
      precio:20,
      origen:"Guaayquil",
      destino:"Santo ",
      estado:false,
      idTipoVuelo:1,
      fechaIda:"2022/10/12",
      fechaVuelta:"2022/09/12",
      horaSalida:15,
      horaLlegada:18,
      imagen:"" },
    {idVuelo:4,
      precio:20,
      origen:"Guaayquil",
      destino:"Santo ",
      estado:false,
      idTipoVuelo:1,
      fechaIda:"2022/11/12",
      fechaVuelta:"2022/09/12",
      horaSalida:15,
      horaLlegada:18,
      imagen:"" }];

  //_____________________________
  vuelos_envio:Vuelo_Envio[]=[];
  changeColor_options:boolean[]=[];
  filter:FechaFilter[]=[];
  vuelos_filtrados:VueloResponse[]=[];

  ngOnInit(): void {
  }

  activarfiltro(k:number):void{
    for (let i = 0; i < this.changeColor.length; i++) {
      if(this.changeColor[i]){
        this.changeColor[i]=false;
      }
    }
    this.changeColor[k]=!this.changeColor[k];

    this.vuelos_filtrados= this.vuelos.filter((obj) => {
      return obj.fechaIda.substr(5,2) == this.filter[k].mes;
    });

    this.vuelos_envio=[];
    for (let i = 0; i < this.vuelos_filtrados.length; i++) {
      this.vuelos_envio.push(new Vuelo_Envio(this.vuelos_filtrados[i].idVuelo))
    }

  }

  mostrar(k:number):void{
    this.changeColor_options[k]=!this.changeColor_options[k];
  }

}
