import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsuarioResponse} from "../../../../models/Response/UsuarioResponse";
import {UserTokenService} from "../../../../services/UserTokenService";

@Component({
  selector: 'app-lista-pasajeros',
  templateUrl: './lista-pasajeros.component.html',
  styleUrls: ['./lista-pasajeros.component.css']
})
export class ListaPasajerosComponent implements OnInit {

  user: UsuarioResponse = new UsuarioResponse();
  id_busqueda: string = '';
  if_null = false;
  if_redunt = false;
  users: UsuarioResponse[] = [];
  if_form= false;
  if_onlyread=false;

  constructor(private service_user: UserTokenService) {
  }

  ngOnInit(): void {
  }

  search(): void {
    this.if_null = false;
    this.if_redunt = false;
    this.service_user.getUserC(this.id_busqueda).subscribe(a => {
        if (a.nombres != null) {
          this.if_form = true;
          this.user = a;
          this.if_onlyread=true;
        } else {
          this.if_null = true;
        }
      }, err => {
        this.if_null = true;
        this.id_busqueda = '';
      }
    );

  }

  guardar(): void {
    if (this.users.filter(x => x.docIdentificacion == this.user.docIdentificacion)[0] != null) {
      this.if_redunt = true;
      this.user = new UsuarioResponse();
      this.if_form = false;
      this.id_busqueda = '';
    } else {
      this.users.push(this.user);
      this.user = new UsuarioResponse();
      this.if_form = false;
      this.id_busqueda = '';
    }
  }

  cancelar(): void {
    this.user = new UsuarioResponse();
    this.if_form = false;
    this.id_busqueda = '';
  }

  borrar(id: any): void {
    this.users = this.users.filter((obj) => {
      return obj.docIdentificacion != id;
    });
  }

  anadir():void{
    this.if_null = false;
    this.if_redunt = false;
    this.user = new UsuarioResponse();
    this.id_busqueda = '';
    this.if_form = true;
    this.if_onlyread=false;
  }

  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

  guardarNewDates(){
    if (this.users.filter(x => x.docIdentificacion == this.user.docIdentificacion)[0] != null) {
      this.if_redunt = true;
      this.user = new UsuarioResponse();
      this.if_form = false;
      this.id_busqueda = '';
    } else {
      this.service_user.getUserC(this.user.docIdentificacion).subscribe(a => {
          if (a.nombres != null) {
            this.users.push(a);
            this.user = new UsuarioResponse();
            this.if_form = false;
            this.id_busqueda = '';
          } else {
            this.users.push(this.user);
            this.user = new UsuarioResponse();
            this.if_form = false;
            this.id_busqueda = '';
          }
        }, err => {
          this.users.push(this.user);
          this.user = new UsuarioResponse();
          this.if_form = false;
          this.id_busqueda = '';
        }
      );
    }
  }

}
