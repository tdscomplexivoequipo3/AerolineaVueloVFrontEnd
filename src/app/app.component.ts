import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {GlobalConstants} from "./common/GlobalConstants";
import {ScriptService} from "./services/ScriptService";
import {UsuarioResponse} from "./models/Response/UsuarioResponse";
import {RolService} from "./services/RolService";
import {Rol} from "./models/Rol";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vueloV5';
  issloading=true;
  buttonad=false;
  user:UsuarioResponse=new UsuarioResponse();
  cliente="cliente";
  rolas="rol";
  rol:Rol=new Rol();

  public classReference = GlobalConstants;
  constructor(private _router: Router, private script:ScriptService, private rolService:RolService){
    script.carga(["script"]);

    this.user=JSON.parse(sessionStorage.getItem("user")+"");
    // @ts-ignore
    if (this.user!=this.cliente){
      this.buttonad=true;
    }
    // @ts-ignore
    if (this.user){
      this.roles();
    }
  }

  roles(){
    this.rolService.getByCodigo(this.user.rol).subscribe(value => {
      this.rol=value
      if ((this.rol.codigo).toLowerCase()=="admin"){
        this.rol.codigo='AD'
      }
    })
  }

  inicioGlobal(){
    this._router.navigate(['']).then(value => {
      window.location.reload();
    })
  }

  cerrarSesion() {
    this._router.navigate(['']).then(value => {
      sessionStorage.clear();
      window.location.reload();
    })
  }

}
