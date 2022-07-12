import { Component, OnInit } from '@angular/core';
import {VueloService} from "../../../services/Vuelo.service";
import {VueloResponse} from "../../../models/Response/VueloResponse";

@Component({
  selector: 'app-internacionales',
  templateUrl: './internacionales.component.html',
  styleUrls: ['./internacionales.component.css']
})
export class InternacionalesComponent implements OnInit {

  vuelos:VueloResponse[]=[];
  vuelost2:VueloResponse[]=[]
  vuelost3:VueloResponse[]=[]
  DestinosNacionales: string[] = ['Cuenca, Cue - Ecuador', 'Guayaquil, GYE - Ecuador', 'Quito, UIO - Ecuador','santo domingo','manabi','bolivar','manta','posorja','bolívar','esmeraldas','loja','cuenca','guayaquil','quito'];


  constructor(private vuelosserviceInternacional:VueloService) { }

  ngOnInit(): void {
    this.todosVuelos();
  }

  todosVuelos(){
    let day=new Date();
    this.vuelosserviceInternacional.listAll().subscribe(v =>{this.vuelos=v;
      this.DestinosNacionales=this.DestinosNacionales.map(value => value.toLowerCase());
      console.log(this.DestinosNacionales);
      for(let v1 of this.vuelos){
          if(!(this.DestinosNacionales.includes(v1.destino.toLowerCase()))&& v1.idTipoVuelo==2 && new Date(v1.fechaIda)>=day){
            this.vuelost2.push(v1);
          }else{
            this.vuelost3.push(v1)
          }
      }
      console.log(this.vuelost2);
      console.log(this.vuelost3)
    });
  }
}
