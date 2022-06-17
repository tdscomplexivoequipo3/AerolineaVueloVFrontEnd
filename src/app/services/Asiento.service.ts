import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AsientoRequest} from "../models/Request/AsientoRequest";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AsientoService{
  private urlEndPoint="http://localhost:8080/api/asiento";
  private url: string = this.urlEndPoint;


  constructor(private http_client:HttpClient,private router:Router) {
    if(sessionStorage.getItem("user")==null){
      this.router.navigate(['']);
    }
  }

  registerAsient(object:AsientoRequest):Observable<AsientoRequest>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.post<AsientoRequest>(this.url,object,{headers:reqHeader});
  }


}
