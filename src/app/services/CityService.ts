import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CityService{

  base_url="http://localhost:9898/api/ciudad/";

  constructor(private httpClient:HttpClient) {
  }

  getAll():Observable<any>{
    return this.httpClient.get<any>(this.base_url);
  }

  edit(cliente:any, id:String){
    return this.httpClient.put(this.base_url+"update-client/"+id, cliente);
  }

  create(cliente:any){
    return this.httpClient.post(this.base_url+"create-client/", cliente);
  }

  getByid(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  deleteC(cliente:any, id:String){
    return this.httpClient.put(this.base_url+"delete/"+id, cliente);
  }
}
