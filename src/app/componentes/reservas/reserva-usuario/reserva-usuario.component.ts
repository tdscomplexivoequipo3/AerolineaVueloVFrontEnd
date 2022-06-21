import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalConstants} from "../../../common/GlobalConstants";
import {NgxSpinnerService} from "ngx-spinner";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-reserva-usuario',
  templateUrl: './reserva-usuario.component.html',
  styleUrls: ['./reserva-usuario.component.css']
})
export class ReservaUsuarioComponent implements OnInit {

  isloggin=false;
  public classReference = GlobalConstants;
  public c:boolean=true;

  constructor(private _snackBar: MatSnackBar,
    private router: Router,private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService){
    this.classReference.apiURL="no_employe";
    this.classReference.user=JSON.parse(sessionStorage.getItem("user")+"");
    if (!this.classReference.user){
      this.router.navigate(['/'])
    }else{
      this.isloggin=true;
    }
  }

  showSuccess() {
    if(this.isloggin){
      this.router.navigate(['/historial']);
    }else{
        this.showSuccessInCorrect("Inice Seción Primero","IN");
    }
  }

  durationInSeconds = 3;
  showSuccessInCorrect(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
      panelClass: ['red-snackbar', 'login-snackbar']
    });
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
      this.router.navigate(['/ofertas/vuelos',this.classReference.user.email]);
    })
  }

  onClickVuelosCharter():void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['email'];
      this.router.navigate(['/ofertas/charter',id]);
    })
  }


}
