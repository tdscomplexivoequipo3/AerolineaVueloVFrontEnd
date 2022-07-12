import { Component, OnInit } from '@angular/core';
import {VueloService} from "../../services/Vuelo.service";
import {VueloResponse} from "../../models/Response/VueloResponse";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PromocionService} from "../../services/PromocionService";
import {PromocionResponse} from "../../models/Response/PromocionResponse";

interface Viaje {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  formulario= new FormControl('', [Validators.required]);
  formulario1= new FormControl('', [Validators.required]);
  formulario2= new FormControl('', [Validators.required]);
  formulario3= new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  carga=true;
  user:UsuarioResponse=new UsuarioResponse();
  vuelost:VueloResponse[]=[];
  vuelost2:VueloResponse[]=[];
  vuelost3:VueloResponse[]=[];
  listapromociones:PromocionResponse[]=[];
  promocionesvalidas:PromocionResponse[]=[]
  listCiudades:Array<VueloResponse>=[];
  listVuelos:Set<VueloResponse>=new Set<VueloResponse>();
  listprecios:Set<PromocionResponse>=new Set<PromocionResponse>();
  //datos busqueda
  origen:any;
  destinop:any;
  fida1:any;
  fregreso1:any;
  //datos Promocion busqueda
  destinopromocion:any;
  selectedValue:Number=0;
  fechaipromocion:any;
  fechatpromocion:any;



  constructor(private vuelosservice:VueloService , private router:Router,private promocionesservice:PromocionService) {
    this.user=JSON.parse(sessionStorage.getItem("user")+"");
  }

  ngOnInit(): void {
    this.VuelosT();
    this.TotalCiudades();
    this.Traerprecios();
  }
  EnviarDatosPromocion(){
    let fidapromocion=this.fechaipromocion.getFullYear()+"-"+(this.fechaipromocion.getMonth()+1)+"-"+this.fechaipromocion.getDate();
    console.log(fidapromocion+'hola');
    let fregresopromocion=this.fechatpromocion.getFullYear()+"-"+(this.fechatpromocion.getMonth()+1)+"-"+this.fechatpromocion.getDate();
    this.router.navigate(['ofertas/busquedapromocion',this.destinopromocion.toLowerCase(),this.selectedValue,fidapromocion,fregresopromocion]);
  }
  Traerprecios(){
    let datetoday=new Date();
    console.log(datetoday);
    this.promocionesservice.getAllPromocionessintoken().subscribe(p=>{this.listapromociones=p;
      for(let po of this.listapromociones){
        if(new Date(po.fechaInicio)>=datetoday){
          this.promocionesvalidas.push(po);
        }
      }
    });
    let precioOficial;
    console.log(this.promocionesvalidas.length+'jajajaj');
    this.vuelosservice.listAll().subscribe(vuv=>{this.vuelost2=vuv;
      for(let vue of this.vuelost2){
        if(vue.idTipoVuelo==2){
          for(let pro of this.promocionesvalidas){
            if(vue.idVuelo==pro.idVuelo){
              precioOficial=vue.precio-pro.descuento;
              this.listprecios.add(precioOficial);
            }
          }
        }

      }
    });

    console.log(this.listprecios+'hola mundo');
  }
  VuelosT(){
    let fechahoy=new Date();
    this.vuelosservice.listAll().subscribe(v=>{this.vuelost=v;
             for(let de of this.vuelost){
               if(de.idTipoVuelo==2 && new Date(de.fechaIda)>=fechahoy){
                 this.vuelost3.push(de);
               }
             }
      console.log(this.vuelost3);
    });

  }
  trasformarFechas(){
    let fida=this.fida1.getFullYear()+"-"+(this.fida1.getMonth()+1)+"-"+this.fida1.getDate();
    console.log(fida+'hola');
    let fregreso=this.fregreso1.getFullYear()+"-"+(this.fregreso1.getMonth()+1)+"-"+this.fregreso1.getDate();
    this.router.navigate(['ofertas/busqueda',this.origen,this.destinop,fida,fregreso]);
  }
  TotalCiudades(){
    let fechahoy=new Date();
    this.vuelosservice.listAll().subscribe(data=>{
      this.listCiudades=data;
      for(let ci of this.listCiudades){
        if(ci.idTipoVuelo==2 && ci.idTipoVuelo==2 && new Date(ci.fechaIda)>=fechahoy){
          this.listVuelos.add(ci.destino);
        }
      }
    })
    console.log(this.listVuelos.size);
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.carga=false;
    },2000)
  }

  filtrar($event :any) {
    let fechahoy=new Date();
    console.log($event)
    console.log($event.target.value);
    this.vuelost3=[];
    for (let fa of this.vuelost){
      if($event.target.value==='' && fa.idTipoVuelo==2 && new Date(fa.fechaIda)>=fechahoy){
            this.vuelost3.push(fa);
      }
      if ( fa.destino==$event.target.value && fa.idTipoVuelo==2 && new Date(fa.fechaIda)>=fechahoy){
        this.vuelost3.push(fa);
        console.log(this.vuelost)
      }
    }
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
