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
    this.service.getVueloByIdNoToken(this.id).subscribe(e=> {
      console.log(e);
      this.respuesta = e
      let d=this.fecha.getFullYear()+"-"+(this.fecha.getMonth()+1)+"-"+this.fecha.getDate();
      this.respuesta.fechaIda=this.respuesta.fechaIda.replaceAll("-0","-");
      console.log(this.respuesta.fechaIda);
      console.log(d);
      if(this.respuesta.fechaIda== (d)){
        if (this.respuesta.estado == 1) {
          this.respuesta.estado = "En vuelo";
        } else if (this.respuesta.estado == 3) {
          this.respuesta.estado = "Pendiente";
        } else if (this.respuesta.estado == 2) {
          this.respuesta.estado = "Aterrizo";
        }
        this.openDialog();
      }else {
        this.openDialogError();
      }


      }

    );

  }
}






