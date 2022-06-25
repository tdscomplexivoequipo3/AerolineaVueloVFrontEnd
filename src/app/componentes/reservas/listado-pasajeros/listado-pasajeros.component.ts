import { Component, OnInit } from '@angular/core';
import {PasajeroRequest} from "../../../models/Request/PasajeroRequest";
import {ReservaService} from "../../../services/ReservaService";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaRequest} from "../../../models/Request/ReservaRequest";
import {PasajeroService} from "../../../services/Pasajero.service";
import {G_Vuelo} from "../../../models/Response/G_Vuelo";

@Component({
  selector: 'app-listado-pasajeros',
  templateUrl: './listado-pasajeros.component.html',
  styleUrls: ['./listado-pasajeros.component.css']
})
export class ListadoPasajerosComponent implements OnInit {

  pasajerosList:G_Vuelo;

  constructor(private service_reserva:ReservaService,
              private router: Router,private pasajero_service:PasajeroService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      //let vuelo = params['id_vuelo'];
      let vuelo=1;
      this.pasajero_service.listPasajerosAllReservaVueloId(vuelo).subscribe(pasajeros=>{
        console.log(pasajeros.id_vuelo)
        this.pasajerosList=pasajeros;
      })

    })


  }

}
