import { Component, OnInit } from '@angular/core';
import {VueloResponse} from "../../../../models/Response/VueloResponse";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {VueloService} from "../../../../services/Vuelo.service";
import {Observable} from "rxjs";
import {UserTokenService} from "../../../../services/UserTokenService";
import {ReservaService} from "../../../../services/ReservaService";
import {ReservaRequest} from "../../../../models/Request/ReservaRequest";
import Swal from "sweetalert2";
import {NgxSpinnerService} from "ngx-spinner";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AsientoService} from "../../../../services/Asiento.service";
import {AsientoRequest} from "../../../../models/Request/AsientoRequest";
import {PasajeroService} from "../../../../services/Pasajero.service";
import {PasajeroRequest} from "../../../../models/Request/PasajeroRequest";
import {UsuarioRequest} from "../../../../models/Request/UsuarioRequest";

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  observable?:Observable<VueloResponse>;
  asiento:any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private serviceVuelo:VueloService,
              private serviceUsuario:UserTokenService,
              private serviceReserva:ReservaService,
              private spinner: NgxSpinnerService,
              private formBuilder:FormBuilder,
              private _snackBar: MatSnackBar,
              private service_asiento:AsientoService,
              private pasajero_service:PasajeroService) {

    this.activatedRoute.params.subscribe( params => {
      let id= params['id_vuelo'];
      let tipo= params['tipo'];

      if(tipo=='l'){
        this.asiento='Ligth';
      }else if(tipo=='b'){
        this.asiento='Basic';
      }else{
        this.asiento='Premium';
      }

      this.observable=serviceVuelo.getVueloById(id);
    })

    this.observable?.subscribe(
      _objet=>{
        this.vuelo=_objet

        this.activatedRoute.params.subscribe( params => {
          let tipo= params['tipo'];
          //basic
          if(tipo=='b'){
            this.precio_por_asiento=this.vuelo.precio+10;
            //ligth
          } else  if(tipo=='l'){
            this.precio_por_asiento=this.vuelo.precio+20;
            //premium
          }else{
            this.precio_por_asiento=this.vuelo.precio+30;
          }
        })
      }, error => console.log(error));


  }

  vuelo:VueloResponse=new VueloResponse();
  precio_por_asiento:any;


  unamePattern = "^5[1-5]{15}$";
  unamePattern_visa = "^4[1-9]{15}$";
  tarjeta_nombre?:string;
  username = new FormControl('', [
    Validators.pattern( "^5[1-5]{15}$|4[1-9]{15}$")
  ]);


  ngOnInit(): void {
    this.router.events
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          this.router.navigate(['/reservas']);
        }
      });

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }


  registrar():void{

    Swal.fire({
      icon: 'question',
      title: 'Viaje',
      text: 'Confirmación de Reserva',
      showCancelButton: true,
      confirmButtonColor: "#0c3255",
      confirmButtonText: "Aceptar",
      cancelButtonColor: "#ff5656",
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
            this.activatedRoute.params.subscribe( params => {

              let tipo= params['tipo'];
              let id= params['id_vuelo'];

              this.serviceVuelo.getVueloById(id).subscribe(vuelo=>{
                var r1: ReservaRequest =new ReservaRequest();
                r1.fechaIda=this.vuelo.fechaIda;
                r1. fechaVuelta=this.vuelo.fechaVuelta;
                r1.horaSalida=this.vuelo.horaSalida;
                r1.horaLlegada=this.vuelo.horaLlegada;
                r1.estado=1;
                r1. observacion="sin observaciones";
                r1.fechaRegistro=new Date();
                r1.origen=this.vuelo.origen;
                r1.destino=this.vuelo.destino;
                r1.pago=false;
                r1.idVuelo=this.vuelo.idVuelo;
                r1.idUsuario=JSON.parse(sessionStorage.getItem("user")+"").id;
                 console.log(r1.idUsuario);
                this.serviceReserva.register(r1).subscribe(reserva=>{

                  var asiento=new AsientoRequest();
                  asiento.nombre=tipo+"-"+vuelo.idVuelo;
                  asiento.estado=1;
                  asiento.idAvion=vuelo.idAvion;
                  asiento.precio=this.precio_por_asiento;


                  //asiento
                  this.service_asiento.registerAsient(asiento).subscribe(asiento=>{

                    var pasajero=new PasajeroRequest();
                    pasajero.nombres=JSON.parse(sessionStorage.getItem("user")+"").nombres+" "+JSON.parse(sessionStorage.getItem("user")+""). apellidos;
                    pasajero.docIdentificacion=JSON.parse(sessionStorage.getItem("user")+"").docIdentificacion;
                    pasajero.estado=false;
                    pasajero.equipaje=0;
                    pasajero.idReserva=reserva.idReserva;
                    pasajero.idAsiento=asiento.idAsiento;

                    //pasajero
                    this.pasajero_service.register(pasajero).subscribe(respuesta=>{
                        Swal.fire({
                          icon: 'success',
                          title: 'Registro Estado',
                          text: 'Registro Correcto',
                          confirmButtonColor: "#0c3255"
                        }).then(async (result) => {
                          if(result.isConfirmed){
                            this.activatedRoute.params.subscribe( params => {
                              let id = params['email'];
                              this.router.navigate(['/reservas']);
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




                    },err=> {
                      console.log("asiento")
                    }
                  );
                  //_________________

                  },err=> {
                    console.log("reserva")
                  }
                );

              })
            })
            //__________-

      }
    })
  }

  cedula:any;
  numero:any;
  mes:any;
  continuar(){

  }

  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }


  durationInSeconds = 3;
  showSuccessCorrect(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
      panelClass: ['green-snackbar', 'login-snackbar']
    });
  }

  showSuccessInCorrect(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
      panelClass: ['red-snackbar', 'login-snackbar']
    });
  }

  back():void{
    this.router.navigate(['/reservas', JSON.parse(sessionStorage.getItem("user")+"").email]);
  }





}
