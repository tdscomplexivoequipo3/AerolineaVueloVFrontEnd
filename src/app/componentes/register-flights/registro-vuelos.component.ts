import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatTableDataSource} from "@angular/material/table";
import {Cities} from "../../models/Cities";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register-flights',
  templateUrl: './registro-vuelos.component.html',
  styleUrls: ['./registro-vuelos.component.css']
})
export class RegistroVuelosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'origen', 'destino', 'precio', 'tvuelo', 'estado', 'edit','delete'];
  // @ts-ignore
  dataSource: MatTableDataSource<Cities>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('dialogvuelo')
  dialogvuelo!: TemplateRef<any>;

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abridialogovuelos(){
    this.dialog.open(this.dialogvuelo);
  }

}
