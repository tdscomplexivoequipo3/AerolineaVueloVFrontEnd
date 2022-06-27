import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
interface Viaje {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-requisitosv',
  templateUrl: './requisitosv.component.html',
  styleUrls: ['./requisitosv.component.css']
})
export class RequisitosvComponent implements OnInit {
  formulario= new FormControl('', [Validators.required]);
  formulario1= new FormControl('', [Validators.required]);
  formulario2= new FormControl('', [Validators.required]);
  formulario3= new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  //Datos Busqueda
  origen:any;
  destinop:any;
  fida1:any;
  fregreso1:any;

  panelOpenState = false;
  selectedValue: string='';
  selectedValue1: string='';
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
  constructor(private router:Router) { }
  trasformarFechas(){
    let fida=this.fida1.getFullYear()+"-"+(this.fida1.getMonth()+1)+"-"+this.fida1.getDate();
    console.log(fida+'hola');
    let fregreso=this.fregreso1.getFullYear()+"-"+(this.fregreso1.getMonth()+1)+"-"+this.fregreso1.getDate();
    this.router.navigate(['ofertas/busqueda',this.origen,this.destinop,fida,fregreso]);
  }

  ngOnInit(): void {
  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
