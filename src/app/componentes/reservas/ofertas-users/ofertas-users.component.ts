import { Component, OnInit } from '@angular/core';
import {Vuelo_Envio} from "../../../models/Vuelo_Envio.";
import {VueloResponse} from "../../../models/Response/VueloResponse";

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
    }
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
      imagen:"" }];

  //_____________________________
  vuelos_envio:Vuelo_Envio[]=[];

  changeColor_options:boolean[]=[false,false,false];

  ngOnInit(): void {
  }

  activarfiltro(k:number):void{
    console.log(this.changeColor.length+"pito")
    for (let i = 0; i < this.changeColor.length; i++) {
      if(this.changeColor[i]){
        this.changeColor[i]=false;
      }
    }
    this.changeColor[k]=!this.changeColor[k];
  }

  mostrar(k:number):void{
    this.changeColor_options[k]=!this.changeColor_options[k];
  }

}
