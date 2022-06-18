import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {GlobalConstants} from "./common/GlobalConstants";
import {ScriptService} from "./services/ScriptService";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vueloV5';

  // @ts-ignore
  nav:boolean=true;
  public classReference = GlobalConstants;

  constructor(private _router: Router, private script:ScriptService){
    script.carga(["script"])
  }

  visible(){
      this.nav=!this.nav;
  }

}
