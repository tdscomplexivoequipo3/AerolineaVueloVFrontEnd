import { Component, OnInit } from '@angular/core';
import {PasajeroRequest} from "../../../models/Request/PasajeroRequest";
import {ReservaService} from "../../../services/ReservaService";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaRequest} from "../../../models/Request/ReservaRequest";
import {PasajeroService} from "../../../services/Pasajero.service";
import {G_Vuelo} from "../../../models/Response/G_Vuelo";
import {NgxSpinnerService} from "ngx-spinner";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-listado-pasajeros',
  templateUrl: './listado-pasajeros.component.html',
  styleUrls: ['./listado-pasajeros.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ListadoPasajerosComponent implements OnInit {

  pasajerosList:G_Vuelo;
  option:any="lista"

  constructor(private service_reserva:ReservaService,
              private router: Router,private pasajero_service:PasajeroService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    this.activatedRoute.params.subscribe( params => {
      let vuelo = params['id_vuelo'];
      this.pasajero_service.listPasajerosAllReservaVueloId(vuelo).subscribe(pasajeros=>{
        this.pasajerosList=pasajeros;
      })

    })


  }

}
