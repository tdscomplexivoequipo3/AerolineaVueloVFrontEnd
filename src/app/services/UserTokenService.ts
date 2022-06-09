import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequest} from "../models/Request/RegisterRequest";
import {UsuarioResponse} from "../models/Response/UsuarioResponse";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export  class  UserTokenService  {

  private urlEndPoint="http://localhost:8080/api/usuario";
  private httpHeaders_permition = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.getItem("user")+"").token});

  constructor(private http_client:HttpClient) { }

  getUser(email:string):Observable<UsuarioResponse>{
    return this.http_client.get<UsuarioResponse>(`${this.urlEndPoint}/${email}`,{headers:this.httpHeaders_permition});
  }

}
