import { Component, OnInit } from '@angular/core';
import {VueloService} from "../../../services/Vuelo.service";
import {VueloResponse} from "../../../models/Response/VueloResponse";

@Component({
  selector: 'app-nacionales',
  templateUrl: './nacionales.component.html',
  styleUrls: ['./nacionales.component.css']
})
export class NacionalesComponent implements OnInit {

  carga=true;
  vuelos:VueloResponse[]=[];
  vuelost2:VueloResponse[]=[]
  vuelost3:VueloResponse[]=[]
  DestinosNacionales: string[] = ['Cuenca, Cue - Ecuador', 'Guayaquil, GYE - Ecuador', 'Quito, UIO - Ecuador','santo domingo','manabi','bolivar','manta','posorja','bolívar','esmeraldas','loja','cuenca','guayaquil','quito'];
  listCiudades:Array<VueloResponse>=[];
  listVuelos:Set<VueloResponse>=new Set<VueloResponse>();
  constructor(private vuelosservice:VueloService) {

  }

  ngOnInit(): void {
    this.todosVuelos();
    this.TotalCiudades();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.carga=false;
    },2000)
  }

  todosVuelos(){
    let day=new Date();
    this.vuelosservice.listAll().subscribe(v =>{this.vuelos=v;
      let cont=0;
      console.log(this.vuelos);
      for(let ci of this.DestinosNacionales){
        for(let v1 of this.vuelos){
          if(ci.toLowerCase()==v1.destino?.toLowerCase() && v1.idTipoVuelo==2 && new Date(v1.fechaIda)>=day){
            cont++;
            this.vuelost2.push(v1);
          }
        }
      }
      });
  }
  TotalCiudades(){
    let day=new Date();
    this.vuelosservice.listAll().subscribe(data=>{
      this.listCiudades=data;
      for(let ci of this.listCiudades){
        for(let cn of this.DestinosNacionales){
             if(ci.destino.toLowerCase()===cn.toLowerCase() && ci.idTipoVuelo==2 && new Date(ci.fechaIda)>=day){
               this.listVuelos.add(ci.destino);
               //this.vuelost2.push(ci);
               this.vuelost3.push(ci);
             }
        }
      }

    })
    console.log(this.listVuelos.size);
  }
  filtrar($event :any) {
    let day=new Date();
    console.log($event)
    console.log($event.target.value);
    this.vuelost2=[];
    for (let fa of this.vuelost3){
      if($event.target.value==='' && fa.idTipoVuelo==2 && new Date(fa.fechaIda)>=day){
        this.vuelost2=this.vuelost3;
        return
      }
      if ( fa.destino==$event.target.value && fa.idTipoVuelo==2 && new Date(fa.fechaIda)>=day){
        this.vuelost2.push(fa);
        console.log(this.vuelos)
      }
    }
  }
}

