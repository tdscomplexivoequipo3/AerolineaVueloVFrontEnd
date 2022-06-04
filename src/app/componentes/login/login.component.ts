import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public classReference = GlobalConstants;

  constructor(){
    this.classReference.apiURL="no_employe";
  }

  ngOnInit(): void {

  }

}
