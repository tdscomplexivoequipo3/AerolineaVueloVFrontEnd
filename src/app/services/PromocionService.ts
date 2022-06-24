import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequest} from "../models/Request/RegisterRequest";
import {UsuarioResponse} from "../models/Response/UsuarioResponse";
import {Injectable} from "@angular/core";
import {TypeFlight} from "../models/TypeFlight";
import {VueloResponse} from "../models/Response/VueloResponse";
import {UsuarioRequest} from "../models/Request/UsuarioRequest";
import {PromocionResponse} from "../models/Response/PromocionResponse";
import {PromocionRequest} from "../models/Request/PromocionRequest";

@Injectable({
  providedIn: 'root'
})
export  class PromocionService  {

  private urlEndPoint="https://aerolineavuelov.herokuapp.com/api/promocion";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http_client:HttpClient) { }

  getAllPromociones():Observable<PromocionResponse[]>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });

    return this.http_client.get<PromocionResponse[]>(this.urlEndPoint+"/promocionAll", {headers:reqHeader});
  }

  getByid(id:any):Observable<PromocionRequest[]>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });

    return this.http_client.get<PromocionRequest[]>(this.urlEndPoint+"/id/"+id, {headers:reqHeader});
  }

  save(object:PromocionRequest):Observable<RegisterRequest>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
      });
    return this.http_client.post<RegisterRequest>(this.urlEndPoint,object,{headers:reqHeader});
  }

  update(object:UsuarioRequest):Observable<UsuarioResponse>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.put<UsuarioResponse>(this.urlEndPoint,object,{headers:reqHeader});
  }
}
