import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService{

  constructor() {
  }

  carga(archivos:String[]){
    for (let arvicho of archivos){
      let script=document.createElement("script");
      script.src="./assets/js/"+arvicho + ".js";
      let body=document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
}
