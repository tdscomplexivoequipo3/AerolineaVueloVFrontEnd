import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";
import {RegisterRequest} from "../../models/RegisterRequest";
import {MatDialog} from "@angular/material/dialog";
import {UsuarioService} from "../../services/Usuario.service";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public objeto:UsuarioResponse=new UsuarioResponse();

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog,
              private service:UsuarioService,
              private router:Router
    ,private activatedRoute: ActivatedRoute){
    this.classReference.apiURL="no_employe";
  }

  ngOnInit(): void {
  }

  login():void{
    this.service.login(this.objeto).subscribe(data => {
      //almacenar token_______________________________________
      sessionStorage.setItem('user', JSON.stringify(data));

        Swal.fire({
          icon: 'success',
          title: 'Logeo',
          text: 'Logeo Correcto',
          confirmButtonColor: "#0c3255"
        })

      this.router.navigate(['/reservas']);


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
