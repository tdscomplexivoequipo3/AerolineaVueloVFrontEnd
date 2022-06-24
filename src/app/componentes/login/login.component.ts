import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";
import {UsuarioService} from "../../services/Usuario.service";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterRequest} from "../../models/Request/RegisterRequest";


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
    ,private activatedRoute: ActivatedRoute){
    this.classReference.apiURL="no_employe";
  }
  public user = GlobalConstants;
  ngOnInit(): void {
  }

  login():void{
    sessionStorage.clear();
    if(this.objeto.email!=null && this.objeto.clave!=null){
      this.service.login(this.objeto).subscribe(data => {
          //almacenar token_______________________________________
          sessionStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['']).then(value => {
            window.location.reload();
          });
          this.classReference.user=data;
        },err=> {
          this.error=true;
          this.objeto.email="";
          this.objeto.clave=""
        }
      );
    }
  }

}
