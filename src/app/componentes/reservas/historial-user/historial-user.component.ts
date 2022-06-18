import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ReservaRequest} from "../../../models/Request/ReservaRequest";
import {MatSort} from "@angular/material/sort";
import {TypeFlight} from "../../../models/TypeFlight";
import {ReservaService} from "../../../services/ReservaService";
import {GlobalConstants} from "../../../common/GlobalConstants";
import {UserTokenService} from "../../../services/UserTokenService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-historial-user',
  templateUrl: './historial-user.component.html',
  styleUrls: ['./historial-user.component.css']
})
export class HistorialUserComponent implements OnInit {

  displayedColumns: string[] = ['estado', 'fechaVuelta', 'horaSalida','horaLlegada'];
  displayedColumns_: string[] = ['estado', 'fechaVuelta', 'horaSalida','accion'];

  public classReference = GlobalConstants;

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  // @ts-ignore
  dataSource :MatTableDataSource<ReservaRequest>;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  list:ReservaRequest[]=[];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //__________________________________________________
  // @ts-ignore
  dataSource_ :MatTableDataSource<ReservaRequest>;
  // @ts-ignore
  @ViewChild(MatSort) sort_: MatSort;
  list_:ReservaRequest[]=[];

  numero_procesos_notificacion:number=0;

  constructor(private service_reserva:ReservaService,private  user_service:UserTokenService,
              private router:Router) { }

  ngOnInit(): void {
    this.service_reserva.getByid(this.classReference.user.id).subscribe(a=>{
      this.numero_procesos_notificacion=a.filter((obj) => {
        return obj.estado==2;
      }).length;
    })
    this.procesar();
  }

  consultar():void{
      this.service_reserva.getByid(this.classReference.user.id).subscribe(a=>{
        console.log(a);
        this.list=a.filter((obj) => {
          return obj.estado!=2;
        });;
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  consultaPendientes():void{
    this.service_reserva.getByid(this.classReference.user.id).subscribe(a=>{
      this.list_=a.filter((obj) => {
        return obj.estado==2;
      });;
      this.dataSource_ = new MatTableDataSource(this.list_);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  procesar():void{
    this.consultar();
    this.consultaPendientes();
  }

  establecerListadoPasajeros(id:any):void{
    this.router.navigate(['/lista_pasajeros/',id]);
  }

}
