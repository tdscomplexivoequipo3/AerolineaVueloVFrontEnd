import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {GlobalConstants} from "./common/GlobalConstants";
import {ScriptService} from "./services/ScriptService";
import {UsuarioResponse} from "./models/Response/UsuarioResponse";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vueloV5';
  issloading=true;
  buttonad=false;
  user=GlobalConstants;

  public classReference = GlobalConstants;
  constructor(private _router: Router, private script:ScriptService){
    this.user=JSON.parse(sessionStorage.getItem("user")+"");
    // @ts-ignore
    if (this.user!="cliente"){
      this.buttonad=true;
    }
    script.carga(["script"]);
  }

  roles(){

  }
  cerrarSesion(){

  }

}
