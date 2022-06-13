import { Component, OnInit } from '@angular/core';
import {VueloResponse} from "../../../../models/Response/VueloResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {VueloService} from "../../../../services/Vuelo.service";
import {Observable} from "rxjs";
import {UsuarioResponse} from "../../../../models/Response/UsuarioResponse";
import {UserTokenService} from "../../../../services/UserTokenService";
import {ReservaService} from "../../../../services/ReservaService";
import {ReservaRequest} from "../../../../models/Request/ReservaRequest";
import Swal from "sweetalert2";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  observable?:Observable<VueloResponse>;
  observable_user?:Observable<UsuarioResponse>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private serviceVuelo:VueloService,
              private serviceUsuario:UserTokenService,
              private serviceReserva:ReservaService,
              private spinner: NgxSpinnerService) {

    this.activatedRoute.params.subscribe( params => {
      let mail = params['email'];
      let id= params['id_vuelo'];
      this.observable=serviceVuelo.getVueloById(id);
      this.observable_user=serviceUsuario.getUser(mail);
    })

    this.observable?.subscribe(
      _objet=>{
        this.vuelo=_objet
      }, error => console.log(error));
  }

  vuelo:VueloResponse=new VueloResponse();

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  registrar():void{
    this.observable_user?.subscribe(
      _objet=>{
        var r1: ReservaRequest =new ReservaRequest();
        r1.fechaIda=this.vuelo.fechaIda;
        r1. fechaVuelta=this.vuelo.fechaVuelta;
        r1.horaSalida=this.vuelo.horaSalida;
        r1.horaLlegada=this.vuelo.horaLlegada;
        r1.estado=this.vuelo.estado;
        r1. observacion="sin observaciones";
        r1.fechaRegistro=new Date();
        r1.origen=this.vuelo.origen;
        r1.destino=this.vuelo.destino;
        r1.pago=false;
        r1.idVuelo=this.vuelo.idVuelo;
        r1.idUsuario=_objet.id;

        this.serviceReserva.register(r1).subscribe(data => {
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
