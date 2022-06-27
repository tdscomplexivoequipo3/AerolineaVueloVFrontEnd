import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ReservaService} from "../../../services/ReservaService";
import {ReservaResponse} from "../../../models/Response/ReservaResponse";
import {ReservaRequest} from "../../../models/Request/ReservaRequest";
import {UsuarioService} from "../../../services/Usuario.service";
import {UsuarioResponse} from "../../../models/Response/UsuarioResponse";
import {VueloService} from "../../../services/Vuelo.service";
import {VueloResponse} from "../../../models/Response/VueloResponse";
import {UsuarioRequest} from "../../../models/Request/UsuarioRequest";

@Component({
  selector: 'app-ingresav',
  templateUrl: './ingresav.component.html',
  styleUrls: ['./ingresav.component.css']
})
export class IngresavComponent implements OnInit {
  formulario= new FormControl('', [Validators.required]);
  formulario1= new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  listReservas:ReservaResponse[]=[];
  listReservasporId:ReservaResponse[]=[];
  listUsuarios:UsuarioResponse[]=[];
  vuelos:VueloResponse[]=[];
  vuelo?:VueloResponse;
  reserva?:ReservaRequest;
  usuario?:UsuarioRequest;

  idreserva:any;
  apellidopasajero:any;
  user:UsuarioResponse;
  @ViewChild('dialogoBoleto')
  dialogoBoleto!: TemplateRef<any>;
  @ViewChild('dialognegative')
  dialognegative!: TemplateRef<any>;
  constructor(public dialog:MatDialog,private serviceReserva:ReservaService,private serviceUser:UsuarioService,private serviceVuelos:VueloService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(this.dialogoBoleto);
  }
  openDialogNo() {
    this.dialog.open(this.dialognegative);
  }
  traerVuelo(){
    this.serviceVuelos.listAll().subscribe( vu=>{
      this.vuelos=vu;
      this.vuelo=vu.filter(u=>u.idVuelo==this.listReservasporId[0].idVuelo).pop();
    });
  }
  TraerUsuario(){
    this.serviceUser.getAllsinToken().subscribe(us=>{
      this.listUsuarios=us;
      this.user=us.filter(u=>u.id==this.listReservasporId[0].idUsuario).pop();
    });
  }

   TraerReservas(){
    this.reserva=null;
    this.usuario=null;
    this.vuelo=null;
    this.serviceReserva.getReservaByid(this.idreserva).subscribe(re=>{
      this.reserva=re;
      if (!this.reserva){
        this.openDialogNo();
      }else {
        console.log(this.reserva);

        let idusuario = re.idUsuario;
        let vueloid = re.idVuelo;
        console.log(vueloid);
        console.log(idusuario);
        this.serviceUser.getByid(idusuario).subscribe(usu => {
          this.usuario = usu;
          console.log(this.usuario);
        });
        this.serviceVuelos.getVueloByIdNoToken(vueloid).subscribe(vue => {
          this.vuelo = vue;
          console.log(this.vuelo);
          this.openDialog();
        });

      }
    },error => this.openDialogNo());

   }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
