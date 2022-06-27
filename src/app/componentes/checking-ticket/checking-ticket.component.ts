import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ReservaRequest} from "../../models/Request/ReservaRequest";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlightService} from "../../services/TypeFlightService";
import {VueloService} from "../../services/Vuelo.service";
import {VueloResponse} from "../../models/Response/VueloResponse";
import {Flight} from "../../models/Flight";
import {G_Vuelo} from "../../models/Response/G_Vuelo";
import {PasajeroService} from "../../services/Pasajero.service";
import {G_pasajero} from "../../models/Response/G_pasajero";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from "@angular/common";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-checking-ticket',
  templateUrl: './checking-ticket.component.html',
  styleUrls: ['./checking-ticket.component.css']
})
export class CheckingTicketComponent implements OnInit {

  carga=true;
    displayedColumns: string[] = ['id','origen', 'destino', 'fechas', 'fechal','horas','horal','estado','listado'];

  // @ts-ignore
  dataSource: MatTableDataSource<VueloResponse>;

  fechaactual:Date=new Date;

  // @ts-ignore
  dataSource1: MatTableDataSource<G_pasajero>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginato1r: MatPaginator;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('dialogaprobados')
    //Dialogo
  dialogaprobados!: TemplateRef<any>;

  listvuelos:Array<VueloResponse>=[];
  listvuelosfe:Array<VueloResponse>=[];
  //Fitro
  listreservasF:Array<ReservaRequest>=[];

  flight:Flight=new Flight();
  listvuelosL:G_Vuelo=new G_Vuelo();
  listpasajeros:Array<G_pasajero> = [];
  form: FormGroup;
  listpass=[];
  user:UsuarioResponse=new UsuarioResponse();

  vuelo:Flight=new Flight();

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog, private typeflightService:TypeFlightService,
              private flightService:VueloService,private pasajeroService:PasajeroService,
              private fb: FormBuilder
              ) {
    this.classReference.apiURL="employe";
    this.form = fb.group({
      pasajeros:  new FormArray([])
    });
    this.user=JSON.parse(sessionStorage.getItem("user")+"");
  }

  ngOnInit(): void {
    this.listarvuelos();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.carga=false;
    },2000)
  }

  listarvuelos(){
    this.listvuelosfe=new Array<VueloResponse>();
      this.flightService.listAll().subscribe(data=>{
        this.listvuelos=data;
        for (let lv of this.listvuelos){
          lv.idVuelo="0000-"+lv.idVuelo;
          lv.fechaIda=new Date(lv.fechaIda);
          lv.fechaVuelta=new Date(lv.fechaVuelta);
          this.listvuelosfe.push(lv);
        }


        this.dataSource = new MatTableDataSource(this.listvuelosfe);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  listarPasajeros(vuelo:Flight){
    this.listpasajeros=new Array<G_pasajero>();
    let idv;
    this.vuelo=vuelo;
    idv=vuelo.idVuelo.substring(5);
    let datos;
    this.listvuelosL= new G_Vuelo();
    this.pasajeroService.listPasajerosAllReservaVueloId(idv).subscribe(value => {
      this.listvuelosL=value;
      datos=this.listvuelosL.list.filter(value1 => {return value1.estado==true});
      for (let p of datos){
        this.listpasajeros.push(p);
      }
      this.dialog.open(this.dialogaprobados);
    });
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.listpass.push(event.target.value);
    } else {
      var newArray = this.listpass.filter((item) => item !== event.target.value);
      this.listpass=newArray;
    }
  }

  newArray =  [];
  recorreArray(){
    this.listpass.map(ac =>
      this.newArray.push([
        ac,
      ])
    )
    return this.newArray;
  }

  submit() {
    var datePipe = new DatePipe("en-US");
    const reportePdf = {
     content:[
       {text: 'LISTADO DE PASAJEROS', fontSize: 16, bold: true, alignment: 'center'},
       {text: '\n'},
       {text: 'CÓDIGO AVIÓN: '+this.vuelo.idVuelo, fontSize: 13, bold: true, alignment: 'center'},
       {text: 'FECHA DE SALIDA: '+ datePipe.transform(this.vuelo.fechaIda, 'dd/MM/yyyy'), fontSize: 13, bold: true, alignment: 'center'},
       {text: 'HORA DE SALIDA: '+this.vuelo.horaSalida, fontSize: 13, bold: true, alignment: 'center'},
       {text: 'ORIGEN: '+this.vuelo.origen, fontSize: 13, bold: true, alignment: 'center'},
       {text: 'DESTINO: '+this.vuelo.destino, fontSize: 13, bold: true, alignment: 'center'},
       {text: '\n' },
       {
         fontSize: 13,
         table: {
           widths: ['100%'],
           body: [

             ['NOMBRE Y APELLIDO'],
             [
               {
                 stack: [
                   {
                     type: "none",
                     ol: [this.recorreArray()],
                   },

                 ],
               },
             ],
           ]
         }
       }
     ]
    };
    const pdf = pdfMake.createPdf(reportePdf);
    pdf.open();

  }
}
