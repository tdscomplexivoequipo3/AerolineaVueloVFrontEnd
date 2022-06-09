import { Component, OnInit } from '@angular/core';
import {VueloResponse} from "../../../../models/Response/VueloResponse";

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  constructor() {
    this.vuelo.idVuelo=1;
    this.vuelo.precio=10;
    this.vuelo.origen="Cuenca";
    this.vuelo.destino="Quito";
    this.vuelo.estado=false;
    this.vuelo.idTipoVuelo=1;
    this.vuelo.fechaIda="2022/10/12";
    this.vuelo.fechaVuelta="2022/10/12";
    this.vuelo.horaSalida=10;
    this.vuelo.horaLlegada=11;
  }

  vuelo:VueloResponse=new VueloResponse();

  ngOnInit(): void {
  }

}
