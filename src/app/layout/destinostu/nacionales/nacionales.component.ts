import { Component, OnInit } from '@angular/core';
import {VueloService} from "../../../services/Vuelo.service";
import {VueloResponse} from "../../../models/Response/VueloResponse";

@Component({
  selector: 'app-nacionales',
  templateUrl: './nacionales.component.html',
  styleUrls: ['./nacionales.component.css']
})
export class NacionalesComponent implements OnInit {
     vuelos:VueloResponse[]=[];
  vuelost2:VueloResponse[]=[]
  vuelost3:VueloResponse[]=[]
  DestinosNacionales: string[] = ['cuenca', 'guayaquil', 'quito','santo domingo','manabi','bolivar','manta','posorja','bolívar','esmeraldas'];
  listCiudades:Array<VueloResponse>=[];
  listVuelos:Set<VueloResponse>=new Set<VueloResponse>();
  constructor(private vuelosservice:VueloService) {

  }

  ngOnInit(): void {
    this.todosVuelos();
    this.TotalCiudades();
  }
  todosVuelos(){
    this.vuelosservice.listAll().subscribe(v =>{this.vuelos=v;
       for(let v1 of this.vuelos){
           if(this.DestinosNacionales.includes(v1.destino.toLowerCase())){
             this.vuelost2.push(v1);
           }

       }
      });
  }
  TotalCiudades(){
    this.vuelosservice.listAll().subscribe(data=>{
      this.listCiudades=data;
      for(let ci of this.listCiudades){
        for(let cn of this.DestinosNacionales){
             if(ci.destino.toLowerCase()===cn){
               this.listVuelos.add(ci.destino);
               this.vuelost2.push(ci);
               this.vuelost3.push(ci);
             }
        }
      }

    })
    console.log(this.listVuelos.size);
  }
  filtrar($event :any) {
    console.log($event)
    console.log($event.target.value);
    this.vuelost2=[];
    for (let fa of this.vuelost3){
      if($event.target.value===''){
        this.vuelost2=this.vuelost3;
        return
      }
      if ( fa.destino==$event.target.value){
        this.vuelost2.push(fa);
        console.log(this.vuelos)
      }
    }
  }
}

