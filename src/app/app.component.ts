import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {GlobalConstants} from "./common/GlobalConstants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vueloV5';

  public classReference = GlobalConstants;

  constructor(private _router: Router){}

}
