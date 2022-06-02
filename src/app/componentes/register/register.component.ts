import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  usuario: string;
  clave: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistroComponent {

  usuario?: string;
   clave?: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistroUserComponent, {
      width: '450px',
      data: {name: this.usuario, animal: this.clave},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.usuario = result;
    });
  }
}

@Component({
  selector: 'dialog-register',
  templateUrl: 'dialog_users.html',
  styleUrls: ['./register.component.css']
})
export class RegistroUserComponent {
  constructor(
    public dialogRef: MatDialogRef<RegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
