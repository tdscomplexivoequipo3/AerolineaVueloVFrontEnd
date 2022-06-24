import { Component, OnInit } from '@angular/core';
import {VueloService} from "../../services/Vuelo.service";
import {VueloResponse} from "../../models/Response/VueloResponse";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";

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

  user:UsuarioResponse=new UsuarioResponse();
  vuelost:VueloResponse[]=[];
  vuelost2:VueloResponse[]=[]
  selectedValue: string='';
  selectedValue1: string='';
  listCiudades:Array<VueloResponse>=[];
  listVuelos:Set<VueloResponse>=new Set<VueloResponse>();

  adultos: string='';
  nino: string='';
  bebe: string='';
  viajes:Viaje[] = [
    {value: 'solo ida', viewValue: 'Solo Ida'},
    {value: 'vuelta', viewValue: 'Vuelta'}
  ];
  vuelos:Viaje[] = [
    {value: 'economy', viewValue: 'Economy'},
    {value: 'premium', viewValue: 'Premium Economy'},
    {value: 'business', viewValue: 'Premium Business'},
  ];
  precios:Viaje[]=[
    {value:'300',viewValue:'300$'},
    {value:'250',viewValue:'200$'},
    {value:'400',viewValue:'400$'}
  ]

  constructor(private vuelosservice:VueloService) {
    this.user=JSON.parse(sessionStorage.getItem("user")+"");
  }

  ngOnInit(): void {
    this.VuelosT();
    this.TotalCiudades();
  }
  VuelosT(){
    this.vuelosservice.listAll().subscribe(v=>{this.vuelost=v;this.vuelost2=v;});

  }
  TotalCiudades(){
    this.vuelosservice.listAll().subscribe(data=>{
      this.listCiudades=data;
      for(let ci of this.listCiudades){
        this.listVuelos.add(ci.destino);
      }
    })
    console.log(this.listVuelos.size);
  }
  filtrar($event :any) {
    console.log($event)
    console.log($event.target.value);
    this.vuelost2=[];
    for (let fa of this.vuelost){
      if($event.target.value===''){
        this.vuelost2=this.vuelost;
        return
      }
      if ( fa.destino==$event.target.value){
        this.vuelost2.push(fa);
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
