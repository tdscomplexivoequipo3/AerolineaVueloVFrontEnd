import { Component, OnInit } from '@angular/core';
import {PromocionService} from "../../services/PromocionService";
import {PromocionResponse} from "../../models/Response/PromocionResponse";
import {VueloService} from "../../services/Vuelo.service";
import {VueloResponse} from "../../models/Response/VueloResponse";

@Component({
  selector: 'app-ofertasd',
  templateUrl: './ofertasd.component.html',
  styleUrls: ['./ofertasd.component.css']
})
export class OfertasdComponent implements OnInit {
  promociones:PromocionResponse[]=[];
  promocionesvalidas:PromocionResponse[]=[];
  vuelopromocion:VueloResponse[]=[];
  vuelomostrar:VueloResponse[]=[];

  constructor( private promocionesservice:PromocionService,private vueloservice:VueloService) { }

  ngOnInit(): void {
    this.listarPromociones();
    this.VuelosValidos();
  }

  listarPromociones(){
    let datetoday=new Date();
    console.log(datetoday);
    this.promocionesservice.getAllPromocionessintoken().subscribe(p=>{this.promociones=p;
      console.log(this.promociones);
       for(let po of this.promociones){
           if(new Date(po.fechaInicio)>=datetoday){
             this.promocionesvalidas.push(po);
           }
       }
    });
    console.log(this.promocionesvalidas+"hola mundo");
  }

  VuelosValidos(){
    let total;
    this.vueloservice.listAll().subscribe(v=>{this.vuelopromocion=v;
           for(let vu of this.vuelopromocion){
             for(let pro of this.promocionesvalidas){
               if(vu.idVuelo==pro.idVuelo){
                 if(pro.descuento!=null){
                      total=vu.precio-pro.descuento;
                   vu.precio=total;
                 }

                 this.vuelomostrar.push(vu);
               }
             }
           }
    });
    console.log(this.vuelomostrar+"hola")
  }

}
