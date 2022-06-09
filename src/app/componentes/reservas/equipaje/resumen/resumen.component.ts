import { Component, OnInit } from '@angular/core';
import {VueloResponse} from "../../../../models/Response/VueloResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {VueloService} from "../../../../services/Vuelo.service";
import {Observable} from "rxjs";
import {UsuarioResponse} from "../../../../models/Response/UsuarioResponse";
import {UsuarioService} from "../../../../services/Usuario.service";

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  observable?:Observable<VueloResponse>;
  observable_user?:Observable<UsuarioResponse>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private serviceVuelo:VueloService,
              private serviceUsuario:UsuarioService) {

    this.activatedRoute.params.subscribe( params => {
      let mail = params['email'];
      let id= params['id_vuelo'];
      this.observable=serviceVuelo.getVueloById(id);
      this.observable_user=serviceUsuario.getUser(mail);
    })

    this.observable?.subscribe(
      _objet=>{
        this.vuelo=_objet
      }, error => console.log(error));

    this.observable_user?.subscribe(
      _objet=>{
        console.log(_objet.nombres)
      }, error => console.log(error));

  }

  vuelo:VueloResponse=new VueloResponse();

  ngOnInit(): void {
  }

}
