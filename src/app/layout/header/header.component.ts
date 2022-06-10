import { Component, OnInit } from '@angular/core';
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {GlobalConstants} from "../../common/GlobalConstants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public classReference = GlobalConstants;

  constructor() {
  }

  ngOnInit(): void {
  }

}
