import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";

@Component({
  selector: 'app-register-flights',
  templateUrl: './registro-vuelos.component.html',
  styleUrls: ['./registro-vuelos.component.css']
})
export class RegistroVuelosComponent implements OnInit {

  public classReference = GlobalConstants;
  constructor() {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
  }

}
