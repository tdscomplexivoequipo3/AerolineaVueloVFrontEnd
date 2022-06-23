import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {MatTableDataSource} from "@angular/material/table";
import {ReservaRequest} from "../../models/Request/ReservaRequest";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ReservaService} from "../../services/ReservaService";
import {GlobalConstants} from "../../common/GlobalConstants";
import {VueloService} from "../../services/Vuelo.service";
import {RegisterRequest} from "../../models/Request/RegisterRequest";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-validation-pasajeros',
  templateUrl: './validation-pasajeros.component.html',
  styleUrls: ['./validation-pasajeros.component.css']
})
export class ValidationPasajerosComponent implements OnInit {

  displayedColumns: string[] = ['estado', 'fechaVuelta', 'horaSalida','horaLlegada','aceptar'];
  // @ts-ignore
  dataSource :MatTableDataSource<ReservaRequest>;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  list:ReservaRequest[]=[];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('dialoguser')
  dialoguser!: TemplateRef<any>;

  constructor(public dialog: MatDialog,private service_reserva:ReservaService,private service_vuelo:VueloService) { }
  public classReference = GlobalConstants;
  public objeto:RegisterRequest=new RegisterRequest();

  ngOnInit(): void {
    this.service_reserva.getByid(this.classReference.user.id).subscribe(a=>{
      a.forEach(result=>{
        if(result.idVuelo!=null){
          this.service_vuelo.getVueloById(result.idVuelo).subscribe(vuelo=>{
              this.list.push(result);
          })
        }
      })

      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultar(id:any){
  }

  openDialog(): void {
    this.dialog.open(this.dialoguser);
  }

  closeDialog():void{
    this.dialog.closeAll();
  }

}
