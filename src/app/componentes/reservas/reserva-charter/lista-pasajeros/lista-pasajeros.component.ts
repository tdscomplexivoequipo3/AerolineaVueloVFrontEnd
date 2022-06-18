import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UsuarioResponse} from "../../../../models/Response/UsuarioResponse";
import {UserTokenService} from "../../../../services/UserTokenService";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PasajeroService} from "../../../../services/Pasajero.service";
import {AsientoService} from "../../../../services/Asiento.service";
import {AsientoRequest} from "../../../../models/Request/AsientoRequest";
import {Asientos} from "../../../../services/Asientos";
import {PasajeroRequest} from "../../../../models/Request/PasajeroRequest";
import {ReservaService} from "../../../../services/ReservaService";
import {ActivatedRoute, Router} from "@angular/router";
import {VueloService} from "../../../../services/Vuelo.service";
import {ReservaRequest} from "../../../../models/Request/ReservaRequest";
import {GlobalConstants} from "../../../../common/GlobalConstants";
import {ReservaAsientoPajeroResponse} from "../../../../models/Response/ReservaAsientoPajeroResponse";
import {MatAccordion} from "@angular/material/expansion";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-lista-pasajeros',
  animations: [
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
      ])
    ])
  ],
  templateUrl: './lista-pasajeros.component.html',
  styleUrls: ['./lista-pasajeros.component.css']
})
export class ListaPasajerosComponent implements OnInit {

  displayedColumns: string[] = ['nombre_puesto', 'nombre_pasajero', 'id_pasajero'];

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  // @ts-ignore
  dataSource :MatTableDataSource<ReservaAsientoPajeroResponse>;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  resultado:ReservaAsientoPajeroResponse[]=[];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;



  @ViewChild('dialogregister')
  dialoguser!: TemplateRef<any>;

  public classReference = GlobalConstants;

  user: UsuarioResponse = new UsuarioResponse();
  id_busqueda: string = '';
  users: UsuarioResponse[] = [];
  if_onlyread=false;



  constructor(public dialog: MatDialog,
              private service_user: UserTokenService,
              private _snackBar: MatSnackBar,
              private service_reserva:ReservaService,
              private activatedRoute: ActivatedRoute,
              private service_vuelo:VueloService,
              private service_asiento:AsientoService,
              private service_pasajero:PasajeroService,private router:Router) {
  }

  ngOnInit(): void {
  }

  search(): void {
    this.service_user.getUserC(this.id_busqueda).subscribe(a => {
        if (a.nombres != null) {
          this.dialog.open(this.dialoguser);
          this.user = a;
          this.if_onlyread=true;
        } else {
          this.showSuccessInCorrect("Identificación no reconocida","ID");
        }
      }, err => {
      this.showSuccessInCorrect("Identificación no reconocida","ID");

        this.id_busqueda = '';
      }
    );
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

  guardar(): void {
    if (this.users.filter(x => x.docIdentificacion == this.user.docIdentificacion)[0] != null) {
      this.showSuccessInCorrect("Usuario ya ingresado","ID");
      this.user = new UsuarioResponse();
      this.dialog.closeAll();
      this.id_busqueda = '';
    } else {
      this.users.push(this.user);
      this.showSuccessCorrect("Usuario Añadido","ID");
      this.user = new UsuarioResponse();
      this.dialog.closeAll();
      this.id_busqueda = '';
    }
  }

  cancelar(): void {
    this.user = new UsuarioResponse();
    this.dialog.closeAll();
    this.id_busqueda = '';
  }

  borrar(id: any): void {
    this.users = this.users.filter((obj) => {
      return obj.docIdentificacion != id;
    });
  }

  anadir():void{
    this.user = new UsuarioResponse();
    this.id_busqueda = '';
    this.dialog.open(this.dialoguser);
    this.if_onlyread=false;
  }

  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

  guardarNewDates(){
    if (this.users.filter(x => x.docIdentificacion == this.user.docIdentificacion)[0] != null) {
      this.showSuccessInCorrect("Usuario ya ingresado","ID");
      this.user = new UsuarioResponse();
      this.dialog.closeAll();
      this.id_busqueda = '';
    } else {
      this.service_user.getUserC(this.user.docIdentificacion).subscribe(a => {
          if (a.nombres != null) {
            this.users.push(a);
            this.showSuccessCorrect("Usuario Añadido","ID");
            this.user = new UsuarioResponse();
            this.dialog.closeAll();
            this.id_busqueda = '';
          } else {
            this.users.push(this.user);
            this.showSuccessCorrect("Usuario Añadido","ID");
            this.user = new UsuarioResponse();
            this.dialog.closeAll();
            this.id_busqueda = '';
          }
        }, err => {
          this.users.push(this.user);
        this.showSuccessCorrect("Usuario Añadido","ID");
          this.user = new UsuarioResponse();
          this.dialog.closeAll();
          this.id_busqueda = '';
        }
      );
    }
  }

  registrarListado(){
    this.get();
    this.activatedRoute.params.subscribe( params => {

      console.log(params['reserva']+"pito")

      this.service_reserva.getReservaByid(params['reserva']).subscribe(reserva_obj=>{

        this.users.map(obj=>{

          this.service_vuelo.getVueloById(reserva_obj.idVuelo).subscribe(vuelo=>{

            var asiento=new AsientoRequest();
            asiento.nombre=this.getNombreAsiento();
            asiento.estado=1;
            asiento.idAvion=vuelo.idAvion;
            this.service_asiento.registerAsient(asiento).subscribe(asiento_=>{
              var pasajero=new PasajeroRequest();
              pasajero.nombres=obj.nombres+" "+obj.apellidos;
              pasajero.docIdentificacion=obj.docIdentificacion;
              pasajero.estado=false;
              pasajero.idReserva=params['reserva'];
              pasajero.idAsiento=asiento_.idAsiento;

              this.service_pasajero.register(pasajero).subscribe(pasajero_=>{
                var reserva_r=reserva_obj;
                reserva_r.idUsuario=this.classReference.user.id;
                reserva_r.estado=0;
                    this.service_reserva.update(reserva_r).subscribe(actualizacion=>{
                      //setiar Resltado
                      this.resultado.push({asiento:asiento_, pasajero:pasajero_});
                      this.get();
                    })
              })
            })
          })
        })
      })
    })

  }

  asientos:string[]=new Asientos().asientos;
   i:number=-1;
  getNombreAsiento():string{
      ++this.i;
       return this.asientos[this.i];
  }

  get():void{
    this.showSuccessCorrect("Pasajeros Registrados","OK");
      this.dataSource = new MatTableDataSource(this.resultado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  back():void{
    this.router.navigate(['/reservas', JSON.parse(sessionStorage.getItem("user")+"").email]);
  }

}

