import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GlobalConstants} from "../../common/GlobalConstants";
import {RegisterRequest} from "../../models/Request/RegisterRequest";
import {UsuarioService} from "../../services/Usuario.service";
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistroComponent {

  @ViewChild('dialoguser')
  dialoguser!: TemplateRef<any>;
  hide=true;
  hide_r=true;
  public classReference = GlobalConstants;
  public objeto:RegisterRequest=new RegisterRequest();
  error=false;

  constructor(public dialog: MatDialog,private service:UsuarioService,private router:Router
    ,private activatedRoute: ActivatedRoute) {
    this.classReference.apiURL="no_employe";
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(this.dialoguser);
  }

  closeDialog():void{
    this.dialog.closeAll();
  }

  registrar(clave_r:string):void{
    console.log(clave_r+"  "+this.objeto.clave+" pito")
    if(clave_r==this.objeto.clave){
      this.service.register(this.objeto).subscribe(data => {
          Swal.fire({
            icon: 'success',
            title: 'Registro Estado',
            text: 'Registro Correcto',
            confirmButtonColor: "#0c3255"
          })
        //almacenar token_______________________________________
       /* sessionStorage.setItem('user', JSON.stringify(data));
        this.classReference.user.nombres=data.nombres;
        this.classReference.user.apellidos=data.apellidos;
        this.classReference.user.id=data.id;
        this.classReference.user.email=data.email;*/

          this.closeDialog();
        this.router.navigate(['/login']);


        },err=> {
          Swal.fire({
            icon: 'warning',
            title: 'Acceso Denegado',
            text: err.error.message,
            confirmButtonColor: "#0c3255"
          })
        }
      );
    }else{
      this.error=true;
    }
  }

  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

}


