import { Component, OnInit } from '@angular/core';
import {Vuelo_Envio} from "../../../models/Vuelo_Envio";
import {VueloResponse} from "../../../models/Response/VueloResponse";
import {VueloService} from "../../../services/Vuelo.service";
import {FechaFilter} from "../../../models/FechaFilter";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

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

  constructor(private router: Router,private activatedRoute: ActivatedRoute,
              private service:VueloService,private spinner: NgxSpinnerService) {

    //poner condicion de que es normal
    this.busquedanormal();

    this.activatedRoute.params.subscribe( params => {
      let ciudad = params['ciudad'];
      let id= params['id_vuelo'];
    })

  }

  busquedaciudad(ciudad:any):void{

  }

  busquedaid(ciudad:any):void{

  }

  busquedanormal():void{
    this.service.listAll().subscribe(
      objets => {
        this.vuelos = objets.filter((obj) => {
          return obj.idTipoVuelo != 1;
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
      let mail = params['email'];
      this.router.navigate(['/reserva',mail,id,tipo]);
    })

  }



}
