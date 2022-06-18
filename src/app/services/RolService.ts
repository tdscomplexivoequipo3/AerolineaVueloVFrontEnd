import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rol} from "../models/Rol";

@Injectable({
  providedIn: 'root'
})
export class RolService{

  private base_url="http://localhost:8080/api/rol";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem("user")+"").token})

  constructor(private httpClient:HttpClient) {
  }

  getAll():Observable<Rol[]>{
    return this.httpClient.get<Rol[]>(this.base_url+"/rolAll", {headers: this.httpHeaders});
  }

  edit(rol:Rol, id:String){
    return this.httpClient.put(this.base_url+"/"+id, rol);
  }

  create(rol:Rol):Observable<Rol>{
    return this.httpClient.post<Rol>(this.base_url, rol,{headers:this.httpHeaders});
  }

  getByid(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  deleteC(cliente:any, id:String){
    return this.httpClient.put(this.base_url+"delete/"+id, cliente);
  }
}
