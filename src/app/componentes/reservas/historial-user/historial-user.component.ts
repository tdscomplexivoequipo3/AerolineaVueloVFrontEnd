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
import {VueloService} from "../../../services/Vuelo.service";

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
  @ViewChild('sortCol1') sort_: MatSort;
  list_:ReservaRequest[]=[];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator_: MatPaginator;

  numero_procesos_notificacion:number=0;
  constructor(private service_reserva:ReservaService,private  user_service:UserTokenService,
              private router:Router,private service_vuelo:VueloService) { }

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
      a.forEach(result=>{
        if(result.idVuelo!=null){
          this.service_vuelo.getVueloById(result.idVuelo).subscribe(vuelo=>{
           if(vuelo.idTipoVuelo==2){
             this.list.push(result);
           }
          })
        }
      })

      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  consultaPendientes():void{
    this.service_reserva.getByid(this.classReference.user.id).subscribe(a=>{
      a.forEach(result=>{
        if(result.idVuelo!=null){
          this.service_vuelo.getVueloById(result.idVuelo).subscribe(vuelo=>{
            if(vuelo.idTipoVuelo==1 && result.estado==2){
              this.list_.push(result);
            }
          })
        }
      })
      this.dataSource_ = new MatTableDataSource(this.list_);
      this.dataSource_.paginator = this.paginator_;
      this.dataSource_.sort = this.sort_;
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
