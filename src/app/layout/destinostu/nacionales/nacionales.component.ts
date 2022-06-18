import { Component, OnInit } from '@angular/core';
import {VueloService} from "../../../services/Vuelo.service";
import {VueloResponse} from "../../../models/Response/VueloResponse";

@Component({
  selector: 'app-nacionales',
  templateUrl: './nacionales.component.html',
  styleUrls: ['./nacionales.component.css']
})
export class NacionalesComponent implements OnInit {
     vuelos:VueloResponse[]=[];
  constructor(private vuelosservice:VueloService) {

  }

  ngOnInit(): void {
    this.todosVuelos();
  }
  todosVuelos(){
    this.vuelosservice.listAll().subscribe(v =>this.vuelos=v);
  }


}
