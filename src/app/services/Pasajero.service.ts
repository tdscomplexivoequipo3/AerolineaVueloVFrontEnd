import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PasajeroRequest} from "../models/Request/PasajeroRequest";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class PasajeroService{
  private urlEndPoint="https://aerolineavuelov.herokuapp.com/api/pasajero";
  private url: string = this.urlEndPoint;

  constructor(private http_client:HttpClient,private router:Router) {
    if(sessionStorage.getItem("user")==null){
      this.router.navigate(['']);
    }
  }

  register(object:PasajeroRequest):Observable<PasajeroRequest>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.post<PasajeroRequest>(this.url,object,{headers:reqHeader});
  }


}
