import { Component, OnInit } from '@angular/core';
import {PasajeroRequest} from "../../../models/Request/PasajeroRequest";
import {ReservaService} from "../../../services/ReservaService";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaRequest} from "../../../models/Request/ReservaRequest";

@Component({
  selector: 'app-listado-pasajeros',
  templateUrl: './listado-pasajeros.component.html',
  styleUrls: ['./listado-pasajeros.component.css']
})
export class ListadoPasajerosComponent implements OnInit {

  pasajerosList:PasajeroRequest[]=[];
  reservas:ReservaRequest[]=[];

  constructor(private service_reserva:ReservaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      let vuelo = params['id_vuelo'];

      this.service_reserva.getReservasAll().subscribe(all_reserv=>{

        this.reservas=all_reserv.filter(fil_r=>{
          return fil_r.idVuelo=vuelo;
        })

      })

    })


  }

}
