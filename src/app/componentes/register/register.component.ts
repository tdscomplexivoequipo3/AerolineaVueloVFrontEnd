import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GlobalConstants} from "../../common/GlobalConstants";

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistroComponent {

  @ViewChild('dialoguser')
  dialoguser!: TemplateRef<any>;

  hide=true;
  hide_r=true;

  public classReference = GlobalConstants;

  constructor(public dialog: MatDialog) {
    this.classReference.apiURL="no_employe";
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(this.dialoguser);
  }

  closeDialog():void{
    this.dialog.closeAll();
  }

}


