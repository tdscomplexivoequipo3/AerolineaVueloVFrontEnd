import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Rol} from "../../models/Rol";
import {RolService} from "../../services/RolService";
import {GlobalConstants} from "../../common/GlobalConstants";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsuarioService} from "../../services/Usuario.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UsuarioRequest} from "../../models/Request/UsuarioRequest";

@Component({
  selector: 'app-designation-roles',
  templateUrl: './designation-roles.component.html',
  styleUrls: ['./designation-roles.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DesignationRolesComponent implements OnInit {

  displayedColumns: string[] = ['identificacion', 'nombres', 'apellidos','rol', 'edit','delete','cambio_rol'];
  // @ts-ignore
  dataSourceus: MatTableDataSource<UsuarioRequest>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('dialogrol')
  dialogrol!: TemplateRef<any>;

  @ViewChild('dialogasignarrol')
  dialogasignarrol!: TemplateRef<any>;

  // @ts-ignore
  dataSourcerol: MatTableDataSource<Rol>;
  columnsToDisplay = ['codigo'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'edit','expand'];
  // @ts-ignore
  expandedElement: Rol | null;

  public classReference = GlobalConstants;
  constructor(private rolService:RolService,
              private userService:UsuarioService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.classReference.apiURL="employe";
  }

  rol:Rol=new Rol();
  usuario:UsuarioRequest=new UsuarioRequest();
  listRoles:Rol[]=[];

  listUsers:Array<UsuarioRequest>=[];

  ngOnInit(): void {
    this.listarRoles();
    this.listarUser();
  }

  openDialogoNUsuario(){

  }


  listarRoles(){
    this.rolService.getAll().subscribe(data=>{
      this.listRoles=data;

      this.listRoles = this.listRoles.map((element) => ({
        ...element,
        isExpanded: false
      }));

      this.dataSourcerol = new MatTableDataSource(this.listRoles);
    })

  }

  listarUser(){
    this.userService.getAll().subscribe((data:any)=>{
      this.listUsers=data;
      console.log(this.listUsers)
      this.dataSourceus = new MatTableDataSource(this.listUsers);
      this.dataSourceus.paginator = this.paginator;
      this.dataSourceus.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceus.filter = filterValue.trim().toLowerCase();
  }

  openDialogoRol(){
    this.dialog.open(this.dialogrol);
  }
  openDialogoRolAsig(user:UsuarioRequest){
    console.log(user)
    this.dialog.open(this.dialogasignarrol);
    this.usuario=user;
  }

  guardarrol(){
    this.rolService.create(this.rol).subscribe(x=>{
      this.snackBar.open("SERVICIO CREADO", "",{
        duration: 1 * 1000,
      });
      this.listarRoles();
    })
  }

  guardarAsignacion(){
    console.log(this.usuario.id_cliente)
    /*this.userService.update(this.usuario).subscribe(m=>{
      this.listarUser();
    })*/
  }

  editarRol(id:any){
    console.log(id)
  }

  editarAsignacion(id:any){
    console.log(id)
  }

  eliminarAsignacion(id:any){
    console.log(id)
  }

  nuevorol(id:any){

  }

}

