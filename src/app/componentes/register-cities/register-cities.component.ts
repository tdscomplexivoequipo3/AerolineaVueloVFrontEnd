import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Cities} from "../../models/Cities";
import {MatDialog} from "@angular/material/dialog";
import {GlobalConstants} from "../../common/GlobalConstants";

@Component({
  selector: 'app-register-cities',
  templateUrl: './register-cities.component.html',
  styleUrls: ['./register-cities.component.css']
})
export class RegisterCitiesComponent implements OnInit {
  city:Cities=new Cities();

  displayedColumns: string[] = ['id', 'nombre', 'estado', 'edit','delete'];
  // @ts-ignore
  dataSource: MatTableDataSource<Cities>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  listcities:Cities[]=[];

  @ViewChild('dialogcities')
  dialogcities!: TemplateRef<any>;

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog) {
    this.classReference.apiURL="employe";
  }


  ngOnInit(): void {
    this.city.id=1;
    this.city.nombre="Cuenca";
    this.city.estado=true;
    this.listcities.push(this.city);
    this.dataSource = new MatTableDataSource(this.listcities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abridialogocities(){
    this.dialog.open(this.dialogcities);
  }

}
