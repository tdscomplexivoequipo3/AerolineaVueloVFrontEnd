import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogerrorComponent} from "../../dialogerror/dialogerror.component";
import {DialogComponent} from "../../dialog/dialog.component";
import {UsuarioService} from "../../../services/Usuario.service";
import {UsuarioResponse} from "../../../models/Response/UsuarioResponse";


@Component({
  selector: 'app-solicitarv',
  templateUrl: './solicitarv.component.html',
  styleUrls: ['./solicitarv.component.css']
})
export class SolicitarvComponent  {
  @ViewChild('dialogpositive')
  dialogpositive!: TemplateRef<any>;
  @ViewChild('dialognegative')
  dialognegative!: TemplateRef<any>;
  usuarios?:UsuarioResponse;
  email:String='';
  listUsuarios:Array<UsuarioResponse>=[];
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(public dialog:MatDialog,private service:UsuarioService) { }
  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(this.dialogpositive);
  }
  closeDialog():void{
    this.dialog.closeAll();
  }
  openDialogNo(){
this.dialog.open(this.dialognegative);
  }
  TraerCorreo(){
        this.service.getAllEmail(this.email).subscribe(contenedor=>{
          this.usuarios=contenedor
          console.log(this.usuarios);
          if (this.usuarios.rol.toLowerCase()=='cliente'){
            this.openDialog();
          }else {
            this.openDialogNo();
          }
        })
  }

 /* BuscarCorreo(){
    let exist=false;
      for(let em of this.listUsuarios){
        if(this.email==em.email){
          console.log(em.rol)
          if(em.rol==='cliente'){
            this.openDialog()

          }else {
            this.openDialogNo();
          }
          exist=true;
          break;
        }
      }
      if(exist==false){
        this.openDialogNo();
      }
  }*/
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

