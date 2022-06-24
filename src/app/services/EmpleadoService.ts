import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequest} from "../models/Request/RegisterRequest";
import {UsuarioResponse} from "../models/Response/UsuarioResponse";
import {Injectable} from "@angular/core";
import {UsuarioRequest} from "../models/Request/UsuarioRequest";
import {EmpleadoRequest} from "../models/Request/EmpleadoRequest";

@Injectable({
  providedIn: 'root'
})
export  class  EmpleadoService {

  private urlEndPoint = "https://aerolineavuelov.herokuapp.com/api/empleado";

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http_client: HttpClient) {
  }

  getAll(): Observable<EmpleadoRequest[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user") + "").token
    });

    return this.http_client.get<EmpleadoRequest[]>(this.urlEndPoint + "/empleadoAll", {headers: reqHeader});
  }

  save(object: EmpleadoRequest): Observable<EmpleadoRequest> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user") + "").token
    });
    return this.http_client.post<EmpleadoRequest>(this.urlEndPoint, object, {headers: reqHeader});
  }

  update(object: EmpleadoRequest): Observable<EmpleadoRequest> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user") + "").token
    });
    return this.http_client.put<EmpleadoRequest>(this.urlEndPoint, object, {headers: reqHeader});
  }

}
