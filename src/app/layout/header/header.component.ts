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
  isloggin=false;
  public classReference = GlobalConstants;
  user:UsuarioResponse=new UsuarioResponse();
  constructor(private router:Router) {
    this.user=JSON.parse(sessionStorage.getItem("user")+"");
    if (!this.user){
      this.router.navigate(['/'])
    }else{
      this.isloggin=true;
      if (this.user.rol!='cliente'){
        this.btnadmin=true;
      }
    }
  }

  ngOnInit(): void {
  }

  vuelocharter(){
    if (this.user){
      this.router.navigate(['/reservas',this.user.email])
    }else{
      this.router.navigate(['/login'])
    }
  }
  cerrarSession(){
    sessionStorage.clear();
    window.location.reload();
  }
}
