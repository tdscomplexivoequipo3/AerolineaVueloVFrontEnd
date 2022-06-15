import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Cities} from "../../models/Cities";
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlightService} from "../../services/TypeFlightService";
import {VueloService} from "../../services/Vuelo.service";
import {Flight} from "../../models/Flight";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {VueloResponse} from "../../models/Response/VueloResponse";

@Component({
  selector: 'app-watch-flights',
  templateUrl: './watch-flights.component.html',
  styleUrls: ['./watch-flights.component.css']
})
export class WatchFlightsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'origen', 'destino', 'precio', 'tvuelo', 'estado', 'edit','delete'];
  // @ts-ignore
  dataSource: MatTableDataSource<VueloResponse>;

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listflights:Array<VueloResponse>=[];

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog, private typeflightService:TypeFlightService,
              private vueloService:VueloService) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
    this.listarflights();
  }

  listarflights(){
    this.vueloService.listAll().subscribe(data=>{
      this.listflights=data;
      this.dataSource = new MatTableDataSource(this.listflights);
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
