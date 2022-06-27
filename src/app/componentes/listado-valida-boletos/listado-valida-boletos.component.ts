import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {DatePipe} from "@angular/common";
import {G_pasajero} from "../../models/Response/G_pasajero";
import {G_Vuelo} from "../../models/Response/G_Vuelo";
import {PasajeroService} from "../../services/Pasajero.service";
import {AsientoService} from "../../services/Asiento.service";
import {Asientos} from "../../services/Asientos";
import {VueloService} from "../../services/Vuelo.service";
import {Flight} from "../../models/Flight";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {PasajeroRequest} from "../../models/Request/PasajeroRequest";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listado-valida-boletos',
  templateUrl: './listado-valida-boletos.component.html',
  styleUrls: ['./listado-valida-boletos.component.css']
})
export class ListadoValidaBoletosComponent implements OnInit {

  idvuelo: any;
  displayedColumns: string[] = ['cedula', 'nombre', 'cancelar', 'boleto'];
  asignacionasientoP:Number[]=[];
  asignacionasientoB:Number[]=[];
  asignacionasientoL:Number[]=[];
  asiento=[];
  numsasi=[];
  datos:any;

  @ViewChild('dialogboletos')
    //Dialogo
  dialogboletos!: TemplateRef<any>;

  // @ts-ignore
  dataSource: MatTableDataSource<G_pasajero>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  user: UsuarioResponse;

  listvuelos:G_Vuelo = new G_Vuelo();
  listpasajeros:Array<G_pasajero> = [];
  asientom:Asientos=new Asientos();
  fligth:Flight=new Flight();
  pasajeroRequest:PasajeroRequest=new PasajeroRequest();
  public classReference = GlobalConstants;

  constructor(public dialog: MatDialog,
              private asientoService: AsientoService,
              private route: ActivatedRoute,
              private pasajeroService:PasajeroService,
              private vueloService:VueloService) {
    this.classReference.apiURL = "employe";
  }

  ngOnInit(): void {
    this.idvuelo = this.route.snapshot.params['idvuelo'];
    this.idvuelo = this.idvuelo.substring(5);
    console.log(this.idvuelo)
    this.listarpasajeros();
  }

  listarpasajeros() {
    let datos;
    this.listvuelos= new G_Vuelo();
    this.pasajeroService.listPasajerosAllReservaVueloId(this.idvuelo).subscribe(value => {
      this.listvuelos=value;
      datos=this.listvuelos.list.filter(value1 => {return value1.estado==false});
      for (let p of datos){
        this.listpasajeros.push(p);
        console.log(p)
        this.dataSource = new MatTableDataSource(this.listpasajeros);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openBoleto(datos:G_pasajero) {
    this.numsasi=new Array();
    this.asiento=new Array();
    if  (this.asignacionasientoB.length==0){
      this.asignacionasientoB.push(-1);
    }
    if  (this.asignacionasientoP.length==0){
      this.asignacionasientoP.push(-1);
    }
    if  (this.asignacionasientoL.length==0){
      this.asignacionasientoL.push(-1);
    }
    let idv;
    datos.asientoList.forEach(value => {
      idv=value.nombre.substring(2)
      this.asiento.push(value.nombre.substring(-20,1))
    });
    let numa;
      for (let as of this.asiento){
         if (as=='b'){
            numa=Number(this.asignacionasientoB[this.asignacionasientoB.length-1])+1;
           this.asignacionasientoB.push(numa);
           this.numsasi.push(this.asientom.asientoB[numa]);
          }else if (as=='p'){
           numa=Number(this.asignacionasientoP[this.asignacionasientoP.length-1])+1;
           this.asignacionasientoP.push(numa);
           this.numsasi.push(this.asientom.asientoP[numa]);
          }else if (as=='l'){
           numa=Number(this.asignacionasientoL[this.asignacionasientoL.length-1])+1;
           this.asignacionasientoL.push(numa);
           this.numsasi.push(this.asientom.asientoL[numa]);
          }
      }
    this.datos=datos;
    console.log(this.idvuelo)
    console.log(this.numsasi)
    console.log(datos.documento_identificacion)
    console.log(datos.datos)
    this.dialog.open(this.dialogboletos);
  }

  generarboleto(puesto:any, datos:any) {
    this.pasajeroRequest.idPasajero=datos.id;
    this.pasajeroRequest.nombres=datos.datos;
    this.pasajeroRequest.docIdentificacion=datos.documento_identificacion;
    this.pasajeroRequest.estado=true;
    console.log(this.pasajeroRequest)
    this.pasajeroService.updatePasajero(this.pasajeroRequest).subscribe(x => {
      this.vueloService.getVueloById(this.idvuelo).subscribe((value:any) => {
        this.openBoleto(datos);
        this.fligth=value;
        var datePipe = new DatePipe("en-US");

        const pdf: any = {
          background: [
            {
              //image: await this.getBase64ImageFromURL('https://d500.epimg.net/cincodias/imagenes/2015/03/24/lifestyle/1427217388_716421_1427217969_noticia_normal.jpg'),
              //width: 600, height: 200
            }
          ],
          content: [
            {
              columns: [
                [
                  {
                    columns: [
                      //{image:await this.getBase64ImageFromURL('assets/icons/vuela_v1.png'),width: 50},
                      {text: 'PASE DE VUELO', width: 300, alignment: 'center', fontSize: 20, bold: true,},
                    ],
                  },
                  {
                    columns: [
                      {text: 'CODIGO: ' + this.idvuelo, width: 370, fontSize: 15},
                    ],
                  },
                  {
                    columns: [
                      {text: 'CEDULA: ' + this.datos.documento_identificacion, width: 370, fontSize: 15},
                    ],
                  },
                  {
                    columns: [
                      {text: 'PASAJERO NOMBRES: ' + this.datos.datos, width: 370, fontSize: 15},
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'FECHA SALIDA: ' + datePipe.transform(this.fligth.fechaIda, 'dd/MM/yyyy'),
                        width: 370,
                        fontSize: 15
                      },
                    ],
                  },
                  {
                    columns: [
                      {text: 'HORA DE SALIDA : ' + this.fligth.horaSalida, width: 370, fontSize: 15},
                    ],
                  },
                  {
                    columns: [
                      {text: 'ASIENTO: '+ puesto , width: 370, fontSize: 15},
                    ],
                  },
                  {
                    columns: [
                      {text: 'DE: ' + this.fligth.origen + '    A:'+ this.fligth.destino, width: 370, fontSize: 15},
                    ],
                  },
                  {
                    columns: [
                      {text: 'PRECIO: $' + this.fligth.precio , width: 370, fontSize: 15},
                    ],
                  }
                ],
                {
                  qr: 'Vuelav-0000'+this.fligth.idVuelo+' - '+this.datos.datos,fit: '180'
                },
              ]
            },
          ],
          pageSize: {width: 600, height: 200},
          pageMargins: [10, 10, 10, 10],
        }
        const pdfM = pdfMake.createPdf(pdf);
        pdfM.open();
      })
    })

    }
}
