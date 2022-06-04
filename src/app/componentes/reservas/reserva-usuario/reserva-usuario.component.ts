import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GlobalConstants} from "../../../common/GlobalConstants";

@Component({
  selector: 'app-reserva-usuario',
  templateUrl: './reserva-usuario.component.html',
  styleUrls: ['./reserva-usuario.component.css']
})
export class ReservaUsuarioComponent implements OnInit {


  public classReference = GlobalConstants;
  constructor(private _router: Router) {
    this.classReference.apiURL="no_employe";
  }

  ngOnInit(): void {
  }

}
