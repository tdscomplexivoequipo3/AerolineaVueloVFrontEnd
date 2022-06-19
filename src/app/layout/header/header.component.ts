import { Component, OnInit } from '@angular/core';
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {GlobalConstants} from "../../common/GlobalConstants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  btnadmin=false;

  public classReference = GlobalConstants;
  user:UsuarioResponse=new UsuarioResponse();
  constructor(private router:Router) {
    this.user=JSON.parse(sessionStorage.getItem("user")+"");
    if (!this.user){
      this.router.navigate(['/'])
    }else{
      if (this.user.rol!='cliente'){
        this.btnadmin=true;
      }
    }
  }

  ngOnInit(): void {
  }

  cerrarSession(){
    sessionStorage.clear();
    window.location.reload();
  }
}
