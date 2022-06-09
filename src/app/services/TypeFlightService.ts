import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeFlight} from "../models/TypeFlight";

@Injectable({
  providedIn: 'root'
})
export class TypeFlightService {

  private base_url="http://localhost:8080/api/tipoVuelo";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem("user")+"").token})

  constructor(private httpClient:HttpClient) {
  }

  getAll():Observable<any>{
    return this.httpClient.get<any>(this.base_url);
  }

  edit(cliente:any, id:String){
    return this.httpClient.put(this.base_url+"update-client/"+id, cliente);
  }

  create(tipov:TypeFlight):Observable<TypeFlight>{
    return this.httpClient.post<TypeFlight>(this.base_url, tipov,{headers:this.httpHeaders});
  }

  getByid(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  deleteC(cliente:any, id:String){
    return this.httpClient.put(this.base_url+"delete/"+id, cliente);
  }
}
