import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {VueloResponse} from "../../models/Response/VueloResponse";
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {TypeFlightService} from "../../services/TypeFlightService";
import {VueloService} from "../../services/Vuelo.service";
import {ReservaService} from "../../services/ReservaService";
import {ReservaRequest} from "../../models/Request/ReservaRequest";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Flight} from "../../models/Flight";
import {G_pasajero} from "../../models/Response/G_pasajero";
import {G_Vuelo} from "../../models/Response/G_Vuelo";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {PasajeroService} from "../../services/Pasajero.service";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from "@angular/common";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-gestion-reservas',
  templateUrl: './gestion-reservas.component.html',
  styleUrls: ['./gestion-reservas.component.css']
})
export class GestionReservasComponent implements OnInit {

  carga=true;

  displayedColumns: string[] = ['origen', 'destino', 'fechas', 'fechal','horas','horal','estado','gestion'];

  // @ts-ignore
  dataSource: MatTableDataSource<ReservaRequest>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('dialogaprobados')
    //Dialogo
  dialogaprobados!: TemplateRef<any>;

  listreservas:Array<ReservaRequest>=[];
  //Fitro
  listvuelos=[];
  listreservascharter:Array<ReservaRequest>=[];

  flight:Flight=new Flight();
  listvuelosL:G_Vuelo=new G_Vuelo();
  listpasajeros:Array<G_pasajero> = [];
  form: FormGroup;
  listpass=[];
  fechanow:Date=new Date();

  vuelo:VueloResponse=new VueloResponse();

  public classReference = GlobalConstants;
  constructor(public dialog: MatDialog, private typeflightService:TypeFlightService,
              private reservaService:ReservaService,
              private vueloService:VueloService, private pasajeroService:PasajeroService,
              private fb: FormBuilder) {
    this.classReference.apiURL="employe";
    this.form = fb.group({
      pasajeros:  new FormArray([])
    });
  }

  ngOnInit(): void {
    this.listarreservas();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.carga=false;
    },2000)
  }


  listarreservas(){
    this.listreservascharter=new Array<ReservaRequest>();
    this.reservaService.getReservasAll().subscribe(
      data=>{
      this.listreservas=data;
        for (let r of this.listreservas){
          r.fechaIda=new Date(r.fechaIda);
          if (r.idVuelo==null && r.estado==1){
            this.listreservascharter.push(r);
          }
          if (r.idVuelo!=null){
            this.vueloService.getVueloById(r.idVuelo).subscribe(v =>{
              if (v.idTipoVuelo==1){
                this.listreservascharter.push(r);
                this.dataSource = new MatTableDataSource(this.listreservascharter);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            })
          }
        }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarPasajeros(id:any){
    this.listpasajeros=new Array<G_pasajero>();
    this.vueloService.getVueloById(id).subscribe(valu =>{
      this.vuelo=valu;
      console.log(this.vuelo)
      let datos;
      this.listvuelosL= new G_Vuelo();
      this.pasajeroService.listPasajerosAllReservaVueloId(id).subscribe(value => {
        this.listvuelosL=value;
        datos=this.listvuelosL.list.filter(value1 => {return value1});
        for (let p of datos){
          this.listpasajeros.push(p);
        }
        console.log(this.listpasajeros)
        this.dialog.open(this.dialogaprobados);
      });
    })
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
