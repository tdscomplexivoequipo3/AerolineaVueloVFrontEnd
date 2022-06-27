import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rol} from "../models/Rol";

@Injectable({
  providedIn: 'root'
})
export class RolService{

  private base_url="https://aerolineavuelov.herokuapp.com/api/rol";

  constructor(private httpClient:HttpClient) {
  }

  getAll():Observable<Rol[]>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.httpClient.get<Rol[]>(this.base_url+"/rolAll", {headers:reqHeader});
  }

  edit(rol:Rol, id:String){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.httpClient.put(this.base_url+"/"+id, rol,{headers:reqHeader});
  }

  create(rol:Rol):Observable<Rol>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.httpClient.post<Rol>(this.base_url, rol,{headers:reqHeader});
  }

  getByCodigo(codigo:String):Observable<Rol>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.httpClient.get<Rol>(this.base_url+"/codigo/"+codigo, {headers:reqHeader});
  }

}
