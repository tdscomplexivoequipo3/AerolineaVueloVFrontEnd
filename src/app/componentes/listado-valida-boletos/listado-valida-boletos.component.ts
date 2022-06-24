import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GlobalConstants} from "../../common/GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {ReservaService} from "../../services/ReservaService";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {UsuarioService} from "../../services/Usuario.service";
import {ReservaRequest} from "../../models/Request/ReservaRequest";
import pdfMake from 'pdfmake/build/pdfmake';
import pdffonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from "@angular/common";
pdfMake.vfs = pdffonts.pdfMake.vfs;

@Component({
  selector: 'app-listado-valida-boletos',
  templateUrl: './listado-valida-boletos.component.html',
  styleUrls: ['./listado-valida-boletos.component.css']
})
export class ListadoValidaBoletosComponent implements OnInit {

  idvuelo: any;
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'pais', 'telefono', 'gestion'];

  @ViewChild('dialogboletos')

    //Dialogo
  dialogboletos!: TemplateRef<any>;

  // @ts-ignore
  dataSource: MatTableDataSource<UsuarioResponse>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  listreservas: Array<ReservaRequest> = [];
  //Fitro
  listpasajeros: Array<UsuarioResponse> = [];

  user:UsuarioResponse=new UsuarioResponse();

  public classReference = GlobalConstants;

  constructor(public dialog: MatDialog,
              private usuarioService: UsuarioService,
              private reservaService: ReservaService,
              private route: ActivatedRoute) {
    this.classReference.apiURL = "employe";
  }

  ngOnInit(): void {
    this.idvuelo = this.route.snapshot.params['idvuelo'];
    this.idvuelo = this.idvuelo.substring(5);
    console.log(this.idvuelo)
    this.listarpasajeros();
  }

  listarpasajeros() {
    this.listpasajeros = new Array<UsuarioResponse>();
    this.reservaService.getReservasAll().subscribe(data => {
      this.listreservas = data.filter(value => value.idVuelo == this.idvuelo);
      for (let us of this.listreservas) {
        this.usuarioService.getByid(Number(us.idUsuario)).subscribe((value1: any) => {
          this.user=value1;
          this.listpasajeros.push(this.user);
          this.dataSource = new MatTableDataSource(this.listpasajeros);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
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

  openBoleto(us:UsuarioResponse) {
    this.user=us;
    console.log(us)
    this.dialog.open(this.dialogboletos);
  }

  generarboleto(userpdf: UsuarioResponse) {
    console.log(userpdf)
    var pipe: DatePipe = new DatePipe('en-US')
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
                  {text: 'Pass Boarding', width: 350, alignment: 'center', fontSize: 20, bold: true, color: 'white'},
                ],
              },
              {
                columns: [
                  {text: 'CODIGO: ' + userpdf.docIdentificacion, width: 450, fontSize: 15, background: 'white'},
                ],
              },
              {
                columns: [
                  {text: 'NOMBRE: ' + userpdf.nombres, width: 450, fontSize: 15},
                ],
              },
              {
                columns: [
                  {text: 'PASAJERO NOMBRES: ' + userpdf.apellidos, width: 450, fontSize: 15},
                ],
              },
              {
                columns: [
                  {text: 'VUELO: Vuelo' + userpdf.telefono, width: 450, fontSize: 15},
                ],
              },
              {
                columns: [
                  {
                    text: 'FECHA Y HORA DE SALIDA: ' + pipe.transform(userpdf.fechaNacimiento, 'medium'),
                    width: 450,
                    fontSize: 15
                  },
                ],
              },
              {
                columns: [
                  {text: 'ASIENTO: ' + userpdf.genero, width: 450, fontSize: 15},
                ],
              },
              {
                columns: [
                  {text: 'RUTA: ' + userpdf.pais, width: 450, fontSize: 15},
                ],
              }
            ],
            {
              qr: 'prueba QR'//'https://vuelovc1g1.github.io/VuelaVG1C1fFront/inicio/buscarboleto/'+boleto.id,fit: '160'
            },
          ]
        },
      ],
      pageSize: {width: 600, height: 200},
      pageMargins: [10, 10, 10, 10],
    }
    const pdfs = pdfMake.createPdf(pdf);
    pdfs.open();
  }


}
