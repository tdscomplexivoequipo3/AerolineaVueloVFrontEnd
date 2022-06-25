import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";
import {UsuarioService} from "../../services/Usuario.service";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterRequest} from "../../models/Request/RegisterRequest";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public objeto:UsuarioResponse=new UsuarioResponse();
  error=false;

  public classReference = GlobalConstants;
  constructor(private service:UsuarioService,
              private router:Router
    ,private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar){
    this.classReference.apiURL="no_employe";
  }
  public user = GlobalConstants;
  ngOnInit(): void {


  }

  login():void{
    if(this.objeto.email!=null && this.objeto.clave!=null){
      this.service.login(this.objeto).subscribe(data => {
          //almacenar token_______________________________________
          sessionStorage.setItem('user', JSON.stringify(data));
        this.classReference.user=data;
        if( sessionStorage.getItem('volver') != null){
          location.href = sessionStorage.getItem('volver')
        }else{
          this.router.navigate(['']).then(value => {
            window.location.reload();
          });
        }
        },err=> {
          this.error=true;
          this.showSuccessInCorrect("Usuario no encontrado","USER")
          this.objeto.email="";
          this.objeto.clave=""
        }
      );
    }
  }

  durationInSeconds = 3;
  showSuccessInCorrect(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
      panelClass: ['red-snackbar', 'login-snackbar']
    });
  }

}


