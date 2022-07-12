import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Cities} from "../../models/Cities";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlight} from "../../models/TypeFlight";
import {TypeFlightService} from "../../services/TypeFlightService";
import Swal from "sweetalert2";

@Component({
  selector: 'app-type-flights',
  templateUrl: './type-flights.component.html',
  styleUrls: ['./type-flights.component.css']
})
export class TypeFlightsComponent implements OnInit {

  carga=true;
  typeflight:TypeFlight=new TypeFlight();

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'edit',];
  // @ts-ignore
  dataSource: MatTableDataSource<TypeFlight>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  listtypeflight:TypeFlight[]=[];

  @ViewChild('dialogtypeflight')
  dialogtypeflight!: TemplateRef<any>;

  title="";
  edit=true;
  actu=false;

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog, private typeflightService:TypeFlightService) {
    this.classReference.apiURL="employe";
  }


  ngOnInit(): void {
    this.listarTypeflight();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.carga=false;
    },2000)
  }

  listarTypeflight(){
    this.typeflightService.getAll().subscribe(data=>{
      this.listtypeflight=data;
      this.dataSource = new MatTableDataSource(this.listtypeflight);
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

  abridialogotype(){
    this.title="Crear tipo de Vuelo";
    this.typeflight=new TypeFlight();
    this.actu=false;
    this.edit=true;
    this.dialog.open(this.dialogtypeflight);
  }

  guardartypeflight(){
    this.typeflightService.create(this.typeflight).subscribe(m=>{
      Swal.fire({
        icon: 'success',
        title: 'Ingreso de Tipo de Vuelo',
        text: 'Registro Correcto',
        confirmButtonColor: "#0c3255"
      })

     this.listarTypeflight();
      this.dialog.closeAll();


    },err=> {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: err.error.message,
        confirmButtonColor: "#0c3255"
      })
    })
  }

  editartipoVueloAbrir(id:any){
    this.typeflightService.getByid(id).subscribe(value => {
      this.typeflight=value;
      this.title="Editar tipo de Vuelo";
      this.dialog.open(this.dialogtypeflight);
      this.edit=false;
      this.actu=true;
    })
  }

  editartypeflight(){
    this.typeflightService.edit(this.typeflight).subscribe(value => {
      Swal.fire({
        icon: 'success',
        title: 'Actualización de Tipo de Vuelo',
        text: 'Actualización Correcto',
        confirmButtonColor: "#0c3255"
      })

      this.listarTypeflight();
      this.dialog.closeAll();
    },error => {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: error.error.message,
        confirmButtonColor: "#0c3255"
      })
    })
  }
}
