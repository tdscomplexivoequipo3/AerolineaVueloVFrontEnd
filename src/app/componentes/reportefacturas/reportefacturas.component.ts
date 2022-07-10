import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ReservaResponse } from 'src/app/models/Response/ReservaResponse';
import { ReservaService } from 'src/app/services/ReservaService';
//import { Table } from 'primeng/table'
import autoTable,{UserOptions} from 'jspdf-autotable';
import jsPDF, * as jspdf from 'jspdf';
import {GlobalConstants} from "../../common/GlobalConstants";

interface jsPDFWithPlugin extends jspdf.jsPDF{
  [x:string]:any;
  autotable:(options:UserOptions)=> jspdf.jsPDF;

}

@Component({
  selector: 'app-reportefacturas',
  templateUrl: './reportefacturas.component.html',
  styleUrls: ['./reportefacturas.component.css']
})
export class ReportefacturasComponent implements OnInit {


  //dataSourceus: MatTableDataSource<ReservaRequest>;
  dataSourceus!: MatTableDataSource<ReservaResponse>;
  ReservaReporte:ReservaResponse[]=[];
  idvuelo:string="";

  public classReference = GlobalConstants;
  constructor(private router:Router, private reservaService:ReservaService ) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(): void {
  this.GetAllReservas();
  }


  GetAllReservas(){
    this.reservaService.listAll().subscribe(data=>{
      this.ReservaReporte=data;
      console.log('imprimiendo la data de vuelos',data);


    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceus.filter = filterValue.trim().toLowerCase();
  }


  ReservafindByIdVuelo(id:any){
    this.reservaService.getReservaByIdVuelo(id).subscribe(data=>{
      this.ReservaReporte=data as any;
      console.log(data);


    });
  }
//   exportPdf() {
//     const doc = new jsPDF()
//     import("jspdf").then(jsPDF => {
//         import("jspdf-autotable").then(x => {
//             const doc = new jsPDF.default(0,0);
//             doc.autoTable(this.exportColumns, this.products);
//             doc.save('products.pdf');
//         })
//     })
// }

//   createPdfReport(){
//     const pdfDefinition:any ={
//       content:[
//         {
//           text: 'hola mundo'
//         }
//       ]
//     }
//     const pdf = pdfMake.createPdfReport(pdfDefinition);
//     pdf.open();
//   }

 }
