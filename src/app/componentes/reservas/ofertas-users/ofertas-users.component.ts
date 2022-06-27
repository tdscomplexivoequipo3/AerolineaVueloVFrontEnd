import { Component, OnInit } from '@angular/core';
import {Vuelo_Envio} from "../../../models/Vuelo_Envio";
import {VueloResponse} from "../../../models/Response/VueloResponse";
import {VueloService} from "../../../services/Vuelo.service";
import {FechaFilter} from "../../../models/FechaFilter";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GlobalConstants} from "../../../common/GlobalConstants";
import {PromocionService} from "../../../services/PromocionService";
import {PromocionResponse} from "../../../models/Response/PromocionResponse";

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
  //atributos
  promociones:PromocionResponse[]=[];
//busqueda del metodo personalizada
  destinop:any;
  origenp:any;
  fechaidap:any;
  fecharegresop:any;
  //Busqueda personaloizada promocion
  destinobpromocion:any
  preciodescuento:any;
  fechapromocion:any;
  fecharepromocion:any;
  ciudad:any;
  id:any;
  public classReference = GlobalConstants;
  constructor(private router: Router,private activatedRoute: ActivatedRoute,
              private service:VueloService,private spinner: NgxSpinnerService,private servicepromocion:PromocionService) {

    localStorage.removeItem('volver');
    this.activatedRoute.params.subscribe( params => {
      this.ciudad = params['destinociudad'];
      console.log(this.ciudad+'la ciudad');
      this.id= params['id'];
      console.log(this.id+'este es el id');
      this.destinop=params['destino'];
      this.origenp=params['origen'];
      this.fechaidap=params['fida'];
      this.fecharegresop=params['fregreso'];
      //datos recibidos de la busqueda de promocion
      this.destinobpromocion=params['destinopromocion'];
      this.preciodescuento=params['selectedValue'];
      this.fechapromocion=params['fidapromocion'];
      this.fecharepromocion=params['fregresopromocion'];
    })

  }
  BusaquedaPromociones(){
    let datetoday=new Date();
    this.servicepromocion.getAllPromocionessintoken().subscribe(
      objetos=>{
        this.promociones=objetos.filter((obpro)=>{
          return obpro.fechaInicio.replaceAll("-0","-")==this.fechapromocion && obpro.fechaFin.replaceAll("-0","-")==this.fecharepromocion && new Date(obpro.fechaInicio)>=datetoday;
        });
        this.busquedaPerzonaliadaPromocion();
      }
    );
  }
  busquedaPerzonaliadaPromocion(){
    let datetoday=new Date();
    console.log(this.promociones.length+'hola loco');
    this.service.listAll().subscribe(
      objects=>{
        this.vuelos=objects.filter((obje)=>{
          let okey;
          for(let promo of this.promociones){
            let preciofinal=Number(this.preciodescuento)+Number(promo.descuento);
            okey=obje.idTipoVuelo!=1 && obje.idVuelo==promo.idVuelo && obje.destino.toLowerCase()==this.destinobpromocion.toLowerCase() && obje.precio==preciofinal && new Date(obje.fechaIda)>=datetoday;;
            console.log(obje);
            console.log(this.destinobpromocion+'---'+preciofinal+'----'+obje.fechaIda);
            console.log('------------------------------------------------------');
            if(okey){
              return okey;
            }

          }
          return okey;
        });
        /*if(this.vuelos.length==0){

        }*/
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
  busquedaPersonalizada(){
    let datetoday=new Date();
    this.service.listAll().subscribe(
      objects=>{
        this.vuelos=objects.filter((obje)=>{
          return obje.idTipoVuelo!=1 && obje.fechaIda.replaceAll("-0","-")==this.fechaidap && obje.fechaVuelta.replaceAll("-0","-")==this.fecharegresop && obje.destino==this.destinop && obje.origen==this.origenp && new Date(obje.fechaIda)>=datetoday;
        });
        /*if(this.vuelos.length==0){

        }*/
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
  busquedaCiudad(ciudad:any):void{
    let datetoday=new Date();
    this.service.listAll().subscribe(
      objets => {
        this.vuelos = objets.filter((obj) => {
          return obj.idTipoVuelo != 1 && obj.destino==ciudad && new Date(obj.fechaIda)>=datetoday;
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

  /*busquedaciudad(ciudad:any):void{
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
  */

  busquedaId():void{
    let datetoday=new Date();
    this.service.listAll().subscribe(
      objets => {
        this.vuelos = objets.filter((obj) => {
          return obj.idTipoVuelo != 1 && obj.idVuelo==this.id && new Date(obj.fechaIda)>=datetoday;
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
    if(this.origenp && this.destinop){
      this.busquedaPersonalizada();
    }else {
      if (this.id){
        this.busquedaId();
      }else {
        if(this.destinobpromocion!=null && this.preciodescuento!=null){
          this.BusaquedaPromociones();
        }else {
          if(this.ciudad){
            console.log('entra por ciudad');
            this.busquedaCiudad(this.ciudad);
          }
          else{
            this.busquedanormal();
          }

        }

      }
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
