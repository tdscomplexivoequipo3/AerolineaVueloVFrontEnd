import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table/table-data-source';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { GlobalConstants } from 'src/app/common/GlobalConstants';
import { Flight } from 'src/app/models/Flight';
import { VueloService } from 'src/app/services/Vuelo.service';
import {VueloResponse} from "../../models/Response/VueloResponse";
import {ReservaResponse} from "../../models/Response/ReservaResponse";
import {ReservaService} from "../../services/ReservaService";

@Component({
  selector: 'app-flights-stadistics',
  templateUrl: './flights-stadistics.component.html',
  styleUrls: ['./flights-stadistics.component.css']
})
export class FlightsStadisticsComponent implements OnInit {

  vista:Vista=new Vista();

  listavistas=[];
  chart=[];
  chartL=[];

  listareservas:ReservaResponse[]=[];

  mes=['Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  listaVuelos:VueloResponse[]=[];
  salesData: ChartData<'line'> = {
    labels: this.mes,
    datasets: [
      { label: 'Cuenca', data: [5, 3, 8, 5, 4, 2], tension: 0.5 },
      { label: 'Quito', data: [2, 1, 4, 5, 9, 3], tension: 0.5 },
      { label: 'Guayaquil', data: [5, 4, 3, 2, 6, 1], tension: 0.5 },
      { label: 'Esmeraldas', data: [4, 2, 3, 2, 4, 1], tension: 0.5 },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Vuelos Mensuales',
      },
    },
  };

  public classReference = GlobalConstants;
  constructor(private _vuelos: VueloService, private reservaService: ReservaService) {
    this.classReference.apiURL="employe";
  }

  ngOnInit(){
    this.listarVuelosE();
    this.listarReservaidvuelo();
  }

  listarVuelosE(){
    this._vuelos.listAll().subscribe(data => {
      this.listaVuelos=data;
      this.reservaService.getReservasAll().subscribe(value => {})
    });
  }

  listarReservaidvuelo(){
    this.reservaService.listAll().subscribe(value => {
      this.listareservas=value;
      const ciudades=value.map(res=>res.origen)
      const vuelos=value.map(res=>this.listarVuelobyid(res.idVuelo))
      console.log(vuelos)
      // @ts-ignore
      this.chart=new Chart('canvas',{
        type:'bar',
        data:{
          labels:ciudades,
          datasets:[
            {
              data:vuelos,
              backgroundColor:[
                'green',
                'green',
                'green',
                'green',
                'green',
                'green',
              ],
            }
          ]
        },options:{
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          },
          plugins:{
            legend: {
              display: false
            }
          }
        }
      })

      // @ts-ignore
      this.chartL=new Chart('canvasl',{
        type:'line',
        data:{
          labels:ciudades,
          datasets:[
            {
              data:vuelos,
              backgroundColor:[
                'green',
                'green',
                'green',
                'green',
                'green',
                'green',
              ],
            }
          ]
        },options:{
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          },
          plugins:{
            legend: {
              display: false
            }
          }
        }
      })
    })
  }

  listarVuelobyid(idvuelo:any):Number{
    let cont=0;
      for (let i of this.listareservas) {
        if (i.idVuelo=idvuelo){
          cont++;
        }
      }
    return cont;
  }


}

export class Vista{
  name:any;
  value:any;
}



