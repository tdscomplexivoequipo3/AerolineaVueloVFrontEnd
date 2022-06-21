import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {ReservaService} from "../../services/ReservaService";
import {VueloResponse} from "../../models/Response/VueloResponse";
import {ReservaResponse} from "../../models/Response/ReservaResponse";


@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  constructor(public dialog: MatDialog,private service:ReservaService) { }
  respuesta=new ReservaResponse();
  id:String='';
  openDialog() {
    this.Buscarid();
    console.log(this.respuesta);
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
  }
  Buscarid(){
    this.service.getByvueloid(this.id).subscribe(e=>this.respuesta=e);
  }
}






