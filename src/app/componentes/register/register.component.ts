import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GlobalConstants} from "../../common/GlobalConstants";
import {RegisterRequest} from "../../models/RegisterRequest";
import {UsuarioService} from "../../services/Usuario.service";
import Swal from 'sweetalert2';

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

  constructor(public dialog: MatDialog,private service:UsuarioService) {
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

  registrar():void{
    this.service.register(this.objeto).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Registro Estado',
          text: 'Registro Correcto',
          confirmButtonColor: "#0c3255"
        })
    },err=> {
        Swal.fire({
          icon: 'warning',
          title: 'Acceso Denegado',
          text: err.error.message,
          confirmButtonColor: "#0c3255"
        })
      }
    );
  }

}


