import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Cities} from "../../models/Cities";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register-cities',
  templateUrl: './register-cities.component.html',
  styleUrls: ['./register-cities.component.css']
})
export class RegisterCitiesComponent implements OnInit {
  city:Cities=new Cities();

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  // @ts-ignore
  dataSource: MatTableDataSource<Cities>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  listcities:Cities[]=[];

  @ViewChild('dialogcities')
  dialogcities!: TemplateRef<any>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
