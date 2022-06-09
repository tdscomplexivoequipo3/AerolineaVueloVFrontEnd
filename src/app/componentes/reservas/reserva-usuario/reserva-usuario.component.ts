import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalConstants} from "../../../common/GlobalConstants";

@Component({
  selector: 'app-reserva-usuario',
  templateUrl: './reserva-usuario.component.html',
  styleUrls: ['./reserva-usuario.component.css']
})
export class ReservaUsuarioComponent implements OnInit {


  public classReference = GlobalConstants;
  constructor(private router: Router,private activatedRoute: ActivatedRoute) {
    this.classReference.apiURL="no_employe";
  }

  ngOnInit(): void {
  }

  onClickVuelos():void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['email'];
      this.router.navigate(['/ofertas/vuelos',id]);
    })
  }

}
