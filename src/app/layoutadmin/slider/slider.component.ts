import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlightService} from "../../services/TypeFlightService";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {


  public classReference = GlobalConstants;
  constructor() {
    this.classReference.apiURL="employe";
  }
  ngOnInit(): void {
  }

}
