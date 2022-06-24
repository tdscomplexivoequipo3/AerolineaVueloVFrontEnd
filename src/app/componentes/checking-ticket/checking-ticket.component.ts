import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ReservaRequest} from "../../models/Request/ReservaRequest";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlightService} from "../../services/TypeFlightService";
import {ReservaService} from "../../services/ReservaService";
import {VueloService} from "../../services/Vuelo.service";
import {VueloResponse} from "../../models/Response/VueloResponse";
import {Flight} from "../../models/Flight";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-checking-ticket',
  templateUrl: './checking-ticket.component.html',
  styleUrls: ['./checking-ticket.component.css']
})
export class CheckingTicketComponent implements OnInit {

  displayedColumns: string[] = ['id','origen', 'destino', 'fechas', 'fechal','horas','horal','estado','listado'];

  // @ts-ignore
  dataSource: MatTableDataSource<VueloResponse>;

  fechaactual:Date=new Date;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  listvuelos:Array<VueloResponse>=[];
  listvuelosfe:Array<VueloResponse>=[];
  //Fitro
  listreservasF:Array<ReservaRequest>=[];

  flight:Flight=new Flight();


  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog, private typeflightService:TypeFlightService,
              private flightService:VueloService,
              ) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
    this.listarvuelos();
  }

  listarvuelos(){
    this.listvuelosfe=new Array<VueloResponse>();
      this.flightService.listAll().subscribe(data=>{
        this.listvuelos=data;
        for (let lv of this.listvuelos){
          lv.idVuelo="0000-"+lv.idVuelo;
          lv.fechaIda=new Date(lv.fechaIda);
          lv.fechaVuelta=new Date(lv.fechaVuelta);
          this.listvuelosfe.push(lv);
        }


        this.dataSource = new MatTableDataSource(this.listvuelosfe);
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
}
