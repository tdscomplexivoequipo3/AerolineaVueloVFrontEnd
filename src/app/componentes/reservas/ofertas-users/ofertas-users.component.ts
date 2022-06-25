import { Component, OnInit } from '@angular/core';
import {Vuelo_Envio} from "../../../models/Vuelo_Envio";
import {VueloResponse} from "../../../models/Response/VueloResponse";
import {VueloService} from "../../../services/Vuelo.service";
import {FechaFilter} from "../../../models/FechaFilter";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GlobalConstants} from "../../../common/GlobalConstants";

@Component({
  selector: 'app-ofertas-users',
  templateUrl: './ofertas-users.component.html',
  styleUrls: ['./ofertas-users.component.css']
})
export class OfertasUsersComponent implements OnInit {

  changeColor:boolean[]=[];
  vuelos:VueloResponse[]=[];
  vuelos_envio:Vuelo_Envio[]=[];
  changeColor_options:boolean[]=[];
  filter:FechaFilter[]=[];
  vuelos_filtrados:VueloResponse[]=[];
  ciudad:any;
  id:any;
  public classReference = GlobalConstants;
  constructor(private router: Router,private activatedRoute: ActivatedRoute,
              private service:VueloService,private spinner: NgxSpinnerService) {

    localStorage.removeItem('volver');
    this.activatedRoute.params.subscribe( params => {
       this.ciudad = params['destino'];
      this.id= params['id_vuelo'];
       console.log(this.ciudad);
        console.log(this.id)
    })

  }

  busquedaciudad(ciudad:any):void{
   this.service.listAll().subscribe(
     objets => {
       this.vuelos = objets.filter((obj) => {
         return obj.idTipoVuelo != 1 && obj.idVuelo==this.id;
       });
       if(this.vuelos.length<1){
         this.vuelos = objets.filter((obj) => {
           return obj.idTipoVuelo != 1 && obj.destino==ciudad;
         });
       }
       for (let i = 0; i < this.vuelos.length; i++) {
           this.changeColor.push(false);
           this.vuelos_envio.push(new Vuelo_Envio(this.vuelos[i].idVuelo));
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
   );
  }


  busquedanormal():void{
    let datetoday=new Date();
    this.service.listAll().subscribe(
      objets => {
        this.vuelos = objets.filter((obj) => {
          return obj.idTipoVuelo != 1 && new Date(obj.fechaIda)>=datetoday;
        });

        for (let i = 0; i < this.vuelos.length; i++) {
          this.changeColor.push(false);
          this.vuelos_envio.push(new Vuelo_Envio(this.vuelos[i].idVuelo));
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
    );
  }


  ngOnInit(): void {
    console.log(this.ciudad);
    console.log(this.activatedRoute.snapshot.params);
    if (this.ciudad){
      this.busquedaciudad(this.ciudad);
    }else {
      this.busquedanormal();
    }

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
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

  solicitar(id:number,tipo:string):void{
    this.activatedRoute.params.subscribe( params => {
      if(JSON.parse(sessionStorage.getItem("user")+"") !=null ){
        this.router.navigate(['/reserva',id,tipo]);
      }else{
        var URLactual = window.location.href;
        sessionStorage.setItem('volver', URLactual)
        this.router.navigate(['/login'])
      }

    })
  }

}
