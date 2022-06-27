import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UsuarioResponse} from "../../../models/Response/UsuarioResponse";
import {VueloService} from "../../../services/Vuelo.service";
import {ReservaRequest} from "../../../models/Request/ReservaRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {UserTokenService} from "../../../services/UserTokenService";
import {ReservaService} from "../../../services/ReservaService";
import Swal from "sweetalert2";
import {GlobalConstants} from "../../../common/GlobalConstants";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reserva-charter',
  templateUrl: './reserva-charter.component.html',
  styleUrls: ['./reserva-charter.component.css']
})
export class ReservaCharterComponent implements OnInit {

  observable_user?:Observable<UsuarioResponse>;
  vuelo:ReservaRequest=new ReservaRequest();
  user:UsuarioResponse=new UsuarioResponse();
  public classReference = GlobalConstants;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private serviceVuelo:VueloService,
              private serviceUsuario:UserTokenService,
              private serviceReserva:ReservaService,
              private _snackBar: MatSnackBar) {
      this.classReference.user=JSON.parse(sessionStorage.getItem("user")+"");
      if (!this.classReference.user){
        this.router.navigate(['/'])
      }else{
        this.observable_user=serviceUsuario.getUser(this.classReference.user.email);
      }

  }

  ngOnInit(): void {
  }

  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }


  registrar():void{
    this.error_h=false;
    this.error_f=false;
    var bandera=true;

    if(this.calculoTiempo()==false){
      bandera=false;
      this.error_h=true;
    }
    if(this.calculoFechas()==false){
      bandera=false;
      this.error_f=true;
    }

    if(bandera){
      console.log("listo el pollo")
    }

  }

  calculoTiempo():boolean{
        var hora1 = this.vuelo.horaSalida.split(":"),
        hora2 =  this.vuelo.horaLlegada.split(":"),
          h1:number=Number(hora1[0]),
          h2:number=Number(hora2[0]),
          m1:number=Number(hora1[1]),
          m2:number=Number(hora2[1]);

        if(h2>h1){
          return true;
        }else if(h2==h1 && m2>m1){
          return true;
        }

      return false;
  }


  calculoFechas():boolean{
    if(this.vuelo.fechaIda>this.vuelo.fechaVuelta){
      return false
    }
    return true;
  }



  error_f:any=false;
  error_h:any=false;

  durationInSeconds = 3;
  showSuccessInCorrect(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
      panelClass: ['red-snackbar', 'login-snackbar']
    });
  }


}
