import {Component, OnInit, ViewChild} from '@angular/core';
import {VueloResponse} from "../../models/Response/VueloResponse";
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlightService} from "../../services/TypeFlightService";
import {VueloService} from "../../services/Vuelo.service";
import {ReservaService} from "../../services/ReservaService";
import {ReservaRequest} from "../../models/Request/ReservaRequest";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-gestion-reservas',
  templateUrl: './gestion-reservas.component.html',
  styleUrls: ['./gestion-reservas.component.css']
})
export class GestionReservasComponent implements OnInit {
  displayedColumns: string[] = ['origen', 'destino', 'fechas', 'fechal','horas','horal','estado','gestion'];

  // @ts-ignore
  dataSource: MatTableDataSource<ReservaRequest>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  listreservas:Array<ReservaRequest>=[];
  //Fitro
  listreservasF:Array<ReservaRequest>=[];

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog, private typeflightService:TypeFlightService,
              private reservaService:ReservaService) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
    this.listarreservas();
  }

  listarreservas(){
    this.reservaService.getReservasAll().subscribe(data=>{
      this.listreservas=data;
      this.dataSource = new MatTableDataSource(this.listreservas);
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
