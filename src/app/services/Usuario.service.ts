import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequest} from "../models/Request/RegisterRequest";
import {UsuarioResponse} from "../models/Response/UsuarioResponse";
import {Injectable} from "@angular/core";
import {UsuarioRequest} from "../models/Request/UsuarioRequest";

@Injectable({
  providedIn: 'root'
})
export  class  UsuarioService {

  private urlEndPoint = "https://aerolineavuelov.herokuapp.com/api/usuario";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  private url: string = this.urlEndPoint + '/signup';
  private url_l: string = this.urlEndPoint + '/login';

  constructor(private http_client: HttpClient) {
  }

  getAll(): Observable<UsuarioResponse[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user") + "").token
    });

    return this.http_client.get<UsuarioResponse[]>(this.urlEndPoint + "/usuarioAll", {headers: reqHeader});
  }
  getAllsinToken(): Observable<UsuarioResponse[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http_client.get<UsuarioResponse[]>(this.urlEndPoint + "/usuarioAll", {headers: reqHeader});
  }
  getAllEmail(email:any): Observable<UsuarioResponse> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http_client.get<UsuarioResponse>(this.urlEndPoint + "/"+email, {headers: reqHeader});
  }

  getByid(id: any): Observable<UsuarioRequest[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user") + "").token
    });

    return this.http_client.get<UsuarioRequest[]>(this.urlEndPoint + "/user/id_user/" + id, {headers: reqHeader});
  }

  getBycedula(cedula: any): Observable<UsuarioRequest[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user") + "").token
    });

    return this.http_client.get<UsuarioRequest[]>(this.urlEndPoint + "/usuario/" + cedula, {headers: reqHeader});
  }

  register(object: RegisterRequest): Observable<RegisterRequest> {
    return this.http_client.post<RegisterRequest>(this.url, object, {headers: this.httpHeaders});
  }

  login(object: UsuarioResponse): Observable<UsuarioResponse> {
    return this.http_client.post<UsuarioResponse>(this.url_l, object, {headers: this.httpHeaders});
  }

  update(object: UsuarioRequest): Observable<UsuarioResponse> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user") + "").token
    });
    return this.http_client.put<UsuarioResponse>(this.urlEndPoint, object, {headers: reqHeader});
  }
}
