import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

}
