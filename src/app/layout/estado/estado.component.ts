import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {ReservaService} from "../../services/ReservaService";
import {VueloResponse} from "../../models/Response/VueloResponse";
import {ReservaResponse} from "../../models/Response/ReservaResponse";
import {VueloService} from "../../services/Vuelo.service";
import {DialogerrorComponent} from "../dialogerror/dialogerror.component";


@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  constructor(public dialog: MatDialog,private service:VueloService) { }
  respuesta=new VueloResponse();
  id=new Number(1);
  fecha=new Date();
  openDialog() {

    console.log(this.respuesta);
    const dialogRef = this.dialog.open(DialogComponent,{
      data:this.respuesta}
    );


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogError() {

    console.log(this.respuesta);
    const dialogRef = this.dialog.open(DialogerrorComponent
    );


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
  }

  Buscarid(){
    let fechahoy=new Date();
    this.service.getVueloByIdNoToken(this.id).subscribe(e=> {
      this.respuesta = e
      let d=this.fecha.getFullYear()+"-"+(this.fecha.getMonth()+1)+"-"+this.fecha.getDate();
      this.respuesta.fechaIda=this.respuesta.fechaIda.replaceAll("-0","-");
      console.log(this.respuesta.fechaIda);
      console.log(d);
      console.log(fechahoy+"fecha de hoy");
      if(this.respuesta.fechaIda== (d) ){
        if (new Date(this.respuesta.fechaIda)>fechahoy) {
          this.respuesta.estado = " Vuelo Pendiente";
        } else if (new Date(this.respuesta.fechaIda)==fechahoy) {
          this.respuesta.estado = "Vuelo por partir";
        } else if (new Date(this.respuesta.fechaIda)<fechahoy) {
          this.respuesta.estado = "Vuelo Finalizado";
        }
        this.openDialog();
      }else {
        this.openDialogError();
      }
      if(Object.entries(this.respuesta).length==0){
        this.openDialogError();
      }

    },error => this.openDialogError());
  }
}






