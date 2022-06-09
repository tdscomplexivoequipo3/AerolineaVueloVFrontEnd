import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";

@Component({
  selector: 'app-programming-flights',
  templateUrl: './programming-flights.component.html',
  styleUrls: ['./programming-flights.component.css']
})
export class ProgrammingFlightsComponent implements OnInit {

  public classReference = GlobalConstants;
  constructor() {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
  }

}
