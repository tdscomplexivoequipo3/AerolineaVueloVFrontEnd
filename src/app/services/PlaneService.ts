import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plane} from "../models/Plane";

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

  private base_url="https://aerolineavuelov.herokuapp.com/api/avion";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json',
  'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem("user")+"").token});

  constructor(private httpClient:HttpClient) {  }

  getAll():Observable<Plane[]>{
    return this.httpClient.get<Plane[]>(this.base_url+"/vueloAll", {headers: this.httpHeaders});
  }

  edit(plane:Plane){
    return this.httpClient.put(this.base_url,plane, {headers: this.httpHeaders});
  }

  create(plane:Plane):Observable<Plane>{
    return this.httpClient.post<Plane>(this.base_url, plane,{headers:this.httpHeaders});
  }

  getByid(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+"/avion/"+id,{headers:this.httpHeaders});
  }

  deleteC(cliente:any, id:String){
    return this.httpClient.put(this.base_url+"delete/"+id, cliente);
  }
}
