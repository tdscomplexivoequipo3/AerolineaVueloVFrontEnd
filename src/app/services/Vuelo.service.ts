import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {VueloResponse} from "../models/Response/VueloResponse";
import {Router} from "@angular/router";
import {UnAuthorizedInterceptor} from "../UnAuthorizedInterceptor";
import {Flight} from "../models/Flight";

@Injectable({
  providedIn: 'root'
})
export  class VueloService {

  private urlEndPoint="http://localhost:8080/api/vuelo";
  private url: string = this.urlEndPoint + "/vueloAll" ;
  private url_getId: string = this.urlEndPoint +"/vuelo" ;

  constructor(private http_client:HttpClient,private router:Router) {
     if(sessionStorage.getItem("user")==null){
       this.router.navigate(['']);
     }
  }

  listAll():Observable<VueloResponse[]>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.get<VueloResponse[]>(this.url,{headers:reqHeader});
  }

  getVueloById(id:number):Observable<VueloResponse>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.get<VueloResponse>(`${this.url_getId}/${id}`,{headers:reqHeader});
  }
  getVueloByIdNoToken(id:Number):Observable<VueloResponse>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http_client.get<VueloResponse>(`${this.url_getId}/${id}`,{headers:reqHeader});
  }

  create(vuelo:Flight):Observable<Flight>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+ JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.post<Flight>(this.urlEndPoint, vuelo,{headers:reqHeader});
  }

  update(vuelo:Flight):Observable<Flight>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+ JSON.parse(sessionStorage.getItem("user")+"").token
    });
    return this.http_client.put<Flight>(this.urlEndPoint, vuelo,{headers:reqHeader});
  }

}
