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
              private serviceReserva:ReservaService) {
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
    this.observable_user?.subscribe(
      _objet=>{
        this.vuelo.idUsuario=_objet.id;
        this.vuelo.pago=false;
        this.vuelo.fechaRegistro=new Date();
        this.vuelo.estado=1;
        console.log(this.vuelo)
        this.serviceReserva.registerSinVuelo(this.vuelo).subscribe(data => {
            Swal.fire({
              icon: 'success',
              title: 'Registro Estado',
              text: 'Registro Correcto',
              confirmButtonColor: "#0c3255"
            }).then(async (result) => {
              if(result.isConfirmed){
                this.activatedRoute.params.subscribe( params => {
                  let id = params['email'];
                  this.router.navigate(['/reservas',id]);
                })
              }
            });

          },err=> {
            Swal.fire({
              icon: 'warning',
              title: 'Acceso Denegado',
              text: err.error.message,
              confirmButtonColor: "#0c3255"
            })
          }
        );

        //__________-
      }, error => console.log(error));

  }

  calculoTiempo():string{
    if((this.vuelo.horaSalida==null || this.vuelo.horaSalida=='') ||
      (this.vuelo.horaLlegada==null || this.vuelo.horaLlegada=='')){
      return '0';
    }else{
      var hora1 = this.vuelo.horaSalida.split(":"),
        hora2 =  this.vuelo.horaLlegada.split(":"),
        t1 = new Date(),
        t2 = new Date();

      t1.setHours(Number(hora1[0]), Number(hora1[1]), 0);
      t2.setHours(Number(hora2[0]), Number(hora2[1]), 0);

      t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());

      t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());

      var result:string=(t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " y " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " segundos" : " segundo") : "");

      return result;
    }
    }

}
