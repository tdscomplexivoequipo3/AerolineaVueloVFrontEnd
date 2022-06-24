import {Component, Inject, OnInit} from '@angular/core';
import {VueloResponse} from "../../models/Response/VueloResponse";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:VueloResponse) {
    this.respuesta1=data;
    console.log(this.respuesta1+"hola mundo")
  }
  respuesta1:any;
  ngOnInit(): void {
  }
}
