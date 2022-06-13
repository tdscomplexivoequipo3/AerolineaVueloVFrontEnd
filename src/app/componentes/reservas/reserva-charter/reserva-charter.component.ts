import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UsuarioResponse} from "../../../models/Response/UsuarioResponse";
import {VueloResponse} from "../../../models/Response/VueloResponse";
import {VueloService} from "../../../services/Vuelo.service";
import {ReservaRequest} from "../../../models/Request/ReservaRequest";

@Component({
  selector: 'app-reserva-charter',
  templateUrl: './reserva-charter.component.html',
  styleUrls: ['./reserva-charter.component.css']
})
export class ReservaCharterComponent implements OnInit {

  observable_user?:Observable<UsuarioResponse>;
  vuelo:ReservaRequest=new ReservaRequest();

  constructor(private service:VueloService) { }

  ngOnInit(): void {
  }

  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

}
