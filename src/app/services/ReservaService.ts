import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {VueloResponse} from "../models/Response/VueloResponse";
import {Router} from "@angular/router";
import {UnAuthorizedInterceptor} from "../UnAuthorizedInterceptor";
import {RegisterRequest} from "../models/Request/RegisterRequest";
import {ReservaRequest} from "../models/Request/ReservaRequest";
import {ReservaResponse} from "../models/Response/ReservaResponse";

@Injectable({
  providedIn: 'root'
})
export  class ReservaService {

  @Injectable( {
    providedIn: 'root'
  })
  private urlEndPoint="https://aerolineavuelov.herokuapp.com/api/reserva";
  private url: string = this.urlEndPoint +"";
  private url_R: string = this.urlEndPoint + "/reservasAll" ;
  private url_idR: string = this.urlEndPoint + "/reservasByVuelo" ;
  private url_sv: string = this.urlEndPoint +"/createSinVuelo";
  private url_getId: string = this.urlEndPoint +"/reservasByUsuario";
  private url_getById: string = this.urlEndPoint +"/reserva";

  constructor(private http_client:HttpClient,private router:Router) {
    if(sessionStorage.getItem("user")==null){
      this.router.navigate(['']);
    }
  }

  listAll():Observable<ReservaResponse[]>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.get<ReservaResponse[]>(this.url_R,{headers:reqHeader});
  }

  register(object:ReservaRequest):Observable<ReservaRequest>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.post<ReservaRequest>(this.url,object,{headers:reqHeader});
  }

  registerSinVuelo(object:ReservaRequest):Observable<ReservaRequest>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.post<ReservaRequest>(this.url_sv,object,{headers:reqHeader});
  }

  update(object:ReservaRequest):Observable<ReservaRequest>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.put<ReservaRequest>(this.url,object,{headers:reqHeader});
  }

  getByid(id:String):Observable<ReservaRequest[]>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });

    id=JSON.parse(sessionStorage.getItem("user")+"").id;
    return this.http_client.get<ReservaRequest[]>(`${this.url_getId}/${JSON.parse(sessionStorage.getItem("user")+"").id}`,{headers:reqHeader});
  }

  getByvueloid(id:String):Observable<ReservaResponse>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });

    id=JSON.parse(sessionStorage.getItem("user")+"").id;
    return this.http_client.get<ReservaResponse>(`${this.url_getId}/${id}`,{headers:reqHeader});
  }

  getReservaByid(id:String):Observable<ReservaRequest>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http_client.get<ReservaRequest>(`${this.url_getById}/${id}`,{headers:reqHeader});
  }

  getReservasAll():Observable<ReservaRequest[]>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });


    return this.http_client.get<ReservaRequest[]>(`${this.urlEndPoint}/${"reservasAll"}`,{headers:reqHeader});
  }

  getReservaByIdVuelo(id:String):Observable<ReservaRequest>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.get<ReservaRequest>(`${this.url_idR}/${id}`,{headers:reqHeader});
  }


}
