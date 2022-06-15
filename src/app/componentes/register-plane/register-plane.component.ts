import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Cities} from "../../models/Cities";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {Plane} from "../../models/Plane";
import {PlaneService} from "../../services/PlaneService";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-plane',
  templateUrl: './register-plane.component.html',
  styleUrls: ['./register-plane.component.css']
})
export class RegisterPlaneComponent implements OnInit {

  plane:Plane=new Plane();

  displayedColumns: string[] = ['id', 'placa', 'tipo', 'descripcion', 'estado', 'edit','delete'];
  // @ts-ignore
  dataSource: MatTableDataSource<Plane>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('dialogvuelo')
  dialogvuelo!: TemplateRef<any>;

  listplanes:Array<Plane>=[];

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog, private servicePlane:PlaneService) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
    this.listarPlanes()
  }

  listarPlanes(){
    this.servicePlane.getAll().subscribe(data=>{
      this.listplanes=data;
      this.dataSource = new MatTableDataSource(this.listplanes);
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

  abridialogovuelos(){
    this.dialog.open(this.dialogvuelo);
  }

  guardarPlane(){
    console.log(this.plane)
    if (this.plane.estado=='activo'){
      this.plane.estado=true;
    }else{
      this.plane.estado=false;
    }
    this.servicePlane.create(this.plane).subscribe(m=>{
      Swal.fire({
        icon: 'success',
        title: 'Ingreso de Nuevo Avion',
        text: 'Registro Correcto',
        confirmButtonColor: "#0c3255"
      })
    },err=> {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: err.error.message,
          confirmButtonColor: "#0c3255"
        })
      }
    );
  }

}
