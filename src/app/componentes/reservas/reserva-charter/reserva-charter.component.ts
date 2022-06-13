import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UsuarioResponse} from "../../../models/Response/UsuarioResponse";
import {VueloResponse} from "../../../models/Response/VueloResponse";
import {VueloService} from "../../../services/Vuelo.service";
import {ReservaRequest} from "../../../models/Request/ReservaRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {UserTokenService} from "../../../services/UserTokenService";
import {ReservaService} from "../../../services/ReservaService";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reserva-charter',
  templateUrl: './reserva-charter.component.html',
  styleUrls: ['./reserva-charter.component.css']
})
export class ReservaCharterComponent implements OnInit {

  observable_user?:Observable<UsuarioResponse>;
  vuelo:ReservaRequest=new ReservaRequest();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private serviceVuelo:VueloService,
              private serviceUsuario:UserTokenService,
              private serviceReserva:ReservaService) {
    this.activatedRoute.params.subscribe( params => {
      let mail = params['email'];
      let id= params['id_vuelo'];
      this.observable_user=serviceUsuario.getUser(mail);
    })
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

        this.serviceReserva.register(this.vuelo).subscribe(data => {
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



}
