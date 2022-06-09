import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {VueloResponse} from "../models/Response/VueloResponse";
import {Router} from "@angular/router";
import {UnAuthorizedInterceptor} from "../UnAuthorizedInterceptor";
import {RegisterRequest} from "../models/Request/RegisterRequest";
import {ReservaRequest} from "../models/Request/ReservaRequest";

@Injectable({
  providedIn: 'root'
})
export  class ReservaService {

  private urlEndPoint="http://localhost:8080/api/reserva";
  private url: string = this.urlEndPoint;
  private url_getId: string = this.urlEndPoint ;

  constructor(private http_client:HttpClient,private router:Router) {
    if(sessionStorage.getItem("user")==null){
      this.router.navigate(['']);
    }
  }

  register(object:ReservaRequest):Observable<ReservaRequest>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.post<ReservaRequest>(this.url,object,{headers:reqHeader});
  }

}
