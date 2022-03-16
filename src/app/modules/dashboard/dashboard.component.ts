
import { DatePipe } from '@angular/common';
import { DataService } from './../../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
  ApexStroke,
  ApexYAxis,
  ApexTooltip,
} from "ng-apexcharts";

export type options = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
export type options1 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
  legend: ApexLegend;
  color : string[];
};



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DatePipe]
})
export class DashboardComponent implements OnInit {
  dataIncome:any;
  dataCost : any;
  sumSales=0;
  sumPurchase=0;
  sales=0;
  purchase=0;
  salesOfDay:any;

  month:any;

  day:string[] = [];
  dayData:any[]=[];


  filterAlertPurchase:any = [];
  filterAlertSales:any = [];


  // @ViewChild("chart1") chart1!: ChartComponent;
   chartOptions: ChartOptions;



  options:options ;
  options1:options1 = {
    series: [44, 55, 13, 43, 22],
    chart: {
      type: "donut"
    },
    labels: ["Variabel A", "Variabel B", "Variabel C", "Variabel D", "Variabel E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]

  };




  constructor(
    private restApi : RestApiService,
    public dataService : DataService,
    private datePipe : DatePipe
  ) {
    dataService.setLoading(true);
    this.getIncome();

    this.options= {
      series: [
        {
          name: "Jumlah Penjualan",
          data: this.dayData
        }
      ],
      chart: {
        height: 450,
        type: "bar",
        animations: {
            enabled: true,
            easing: 'easein',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
      },
      title: {
        text: "Grafik Penjualan Bulan Ini"
      },
      xaxis: {
        categories: this.day
      }

    };

    // var chart = new ApexCharts(document.querySelector("#chart"), this.options);

    // chart.render();




    this.chartOptions = {
      series: [
        {
          name: "",
          data: [100, ]
        },
        {
          name: "",
          data: [20]
        },
      ],
      chart: {
        type: "bar",
        height: 200,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        categories: [""],
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      },
      color : ['#EA3D2F', '#2492F4']
    };


  }

  ngOnInit(): void {
    this.month = new Date();
    this.getAlertActive();


  }



  async getIncome(){
    var date = new Date();
    // var firstDay = await new Date(date.getFullYear(),date.getMonth(),1);
    // var lastDay = new Date(date.getFullYear(), 11,31);
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var firstDay = await new Date();
    var lastDay = new Date();


    this.restApi.getDashboard(this.datePipe.transform(await firstDay,'YYYY-MM-dd 00:00:00'),this.datePipe.transform(lastDay,'YYYY-MM-dd 23:59:59')).then((res:any)=>{
      this.sumSales = res.sumSales | 0;
      this.sumPurchase = res.sumPurchase | 0;
      this.sales = res.sales | 0;
      this.purchase = res.purchase | 0;
      this.salesOfDay = res.dataSalesMonth;

      let dayInMonth = new Date(parseInt(this.datePipe.transform(firstDay,'YYYY')!), parseInt(this.datePipe.transform(firstDay,'MM')!), 0).getDate();

      let dateNow  = this.datePipe.transform(new Date(),'dd');

      for (let index = 0; index < dayInMonth-(dayInMonth-parseInt(dateNow!)); index++) {
        this.day.push((index+1).toString());
        this.dayData.push(0);
      }

      this.salesOfDay.forEach((element:any,index:number) => {
        this.dayData[element.day-1] = element.sum;
      });




      this.dataService.setLoading(false);

    }).catch(err=>{
      console.log(err);
      this.dataService.setLoading(false);

    })
  }

  getCheckDate(){
    this.restApi.getCheckDate(this.filterAlertPurchase,this.filterAlertSales).then((res:any)=>{
      let dataPurchase:any  = res.dataPurchase;
      let dataSales:any  = res.dataSales;
      if(dataPurchase?.length >0){
        dataPurchase.map((res:any)=>{

          this.restApi.saveAlert({
            description : 'Jatuh tempo hutang kepada supplier '+res.nameSupplier+' sebanyak '+res.credit.toLocaleString(['id']),
            type :'HUTANG',
            idPurchase : res.id,
          })
        })
      }
      if(dataSales?.length >0){
        dataSales.map((res:any)=>{
          this.restApi.saveAlert({
            description : 'Jatuh tempo hutang customer sebanyak '+res.credit.toLocaleString(['id']),
            type :'PIUTANG',
            idSales : res.idSales,
          })
        })
      }
    }).catch(err=>{
      console.log(err);

    })
  }

  getAlertActive(){
    this.restApi.getAlertActive().then((res:any)=>{
      let data = res.data;
      data.map((res:any)=>{
        if(res.idPurchase){
          this.filterAlertPurchase.push(res.idPurchase);
        }
        if(res.idSales){
          this.filterAlertSales.push(res.idSales);
        }
      })

      this.getCheckDate();
    }).catch(err=>{
      console.log(err);

    });
  }

}
