import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeFlight} from "../models/TypeFlight";
import {Plane} from "../models/Plane";

@Injectable({
  providedIn: 'root'
})
export class TypeFlightService {

  private base_url="https://aerolineavuelov.herokuapp.com/api/tipoVuelo";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem("user")+"").token})

  constructor(private httpClient:HttpClient) {
  }

  getAll():Observable<TypeFlight[]>{
    return this.httpClient.get<TypeFlight[]>(this.base_url+"/rolAll", {headers: this.httpHeaders});
  }

  edit(tipov:TypeFlight){
    return this.httpClient.put(this.base_url, tipov, {headers:this.httpHeaders});
  }

  create(tipov:TypeFlight):Observable<TypeFlight>{
    return this.httpClient.post<TypeFlight>(this.base_url, tipov,{headers:this.httpHeaders});
  }

  getByid(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+"/id/"+id, {headers:this.httpHeaders});
  }

  deleteC(cliente:any, id:String){
    return this.httpClient.put(this.base_url+"delete/"+id, cliente);
  }
}
