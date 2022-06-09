import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {VueloResponse} from "../models/Response/VueloResponse";

@Injectable({
  providedIn: 'root'
})
export  class VueloService {

  private urlEndPoint="http://localhost:8080/api/vuelo";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.getItem("user")+"").token});
  private url: string = this.urlEndPoint + "/vueloAll" ;
  private url_getId: string = this.urlEndPoint +"/vuelo" ;

  constructor(private http_client:HttpClient) { }

  listAll():Observable<VueloResponse[]>{
    return this.http_client.get<VueloResponse[]>(this.url,{headers:this.httpHeaders});
  }

  getVueloById(id:number):Observable<VueloResponse>{
    return this.http_client.get<VueloResponse>(`${this.url_getId}/${id}`,{headers:this.httpHeaders});
  }

}
