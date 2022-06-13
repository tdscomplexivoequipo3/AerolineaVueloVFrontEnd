import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalConstants} from "../../../common/GlobalConstants";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-reserva-usuario',
  templateUrl: './reserva-usuario.component.html',
  styleUrls: ['./reserva-usuario.component.css']
})
export class ReservaUsuarioComponent implements OnInit {


  public classReference = GlobalConstants;
  public c:boolean=true;

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService){
    this.classReference.apiURL="no_employe";
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  onClickVuelos():void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['email'];
      this.router.navigate(['/ofertas/vuelos',id]);
    })
  }

  onClickVuelosCharter():void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['email'];
      this.router.navigate(['/ofertas/charter',id]);
    })
  }


}
