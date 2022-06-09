import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequest} from "../models/Request/RegisterRequest";
import {UsuarioResponse} from "../models/Response/UsuarioResponse";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export  class  UsuarioService  {

  private urlEndPoint="http://localhost:8080/api/usuario";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  private httpHeaders_permition = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.getItem("user")+"").token});
  private url: string = this.urlEndPoint + '/signup';
  private url_l: string = this.urlEndPoint + '/login';

  constructor(private http_client:HttpClient) { }

  register(object:RegisterRequest):Observable<RegisterRequest>{
    return this.http_client.post<RegisterRequest>(this.url,object,{headers:this.httpHeaders});
  }

  login(object:UsuarioResponse):Observable<UsuarioResponse>{
    return this.http_client.post<UsuarioResponse>(this.url_l,object,{headers:this.httpHeaders});
  }

  getUser(email:string):Observable<UsuarioResponse>{
    return this.http_client.get<UsuarioResponse>(`${this.urlEndPoint}/${email}`,{headers:this.httpHeaders_permition});
  }

}
