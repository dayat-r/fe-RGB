import { RestApiService } from 'src/app/services/rest-api.service';
import { DatePipe, Location } from '@angular/common';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css'],
  providers:[DatePipe]
})


export class SalesReportComponent implements OnInit {
  dataSales:any;
  filter="this-month"
  startDate:any;
  endDate:any;
  disable=true;
  start:any;
  end:any;
  math = Math.round;
  constructor(
    private dataService : DataService,
    private location : Location,
    private restApi : RestApiService,
    private datePipe : DatePipe
  ) {
    dataService.setLoading(false);
   }

  ngOnInit(): void {
    this.getSalesReport();
  }

  back(){
    this.location.back();
  }

  cekFilter(){
    if(this.filter === 'today'){
      this.disable = false;
    }else if(this.filter === 'this-month'){
      this.disable = false;
    }else if(this.filter === 'this-year'){
      this.disable = false;
    }else if(this.filter === 'range-date' && this.start!=undefined && this.end!=undefined){
      this.disable = false;
    }else{
      this.disable = true;
    }




  }

  async getSalesReport(){
    if(this.filter ==='today'){
      this.startDate = await this.datePipe.transform(new Date(),'yyyy-MM-dd');
      let date = new Date();
      date.setDate(date.getDate() + 1);
      this.endDate = await this.datePipe.transform(date,'yyyy-MM-dd');
    }else if(this.filter === 'this-month'){
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.startDate = await  this.datePipe.transform(firstDay,'yyyy-MM-dd');
      this.endDate = await this.datePipe.transform(lastDay,'yyyy-MM-dd');
    }if(this.filter === 'this-year'){
      var date = new Date();
      var firstDay = new Date(new Date().getFullYear(), 0, 1);
      var lastDay = new Date(new Date().getFullYear(), 11, 31);
      this.startDate = await  this.datePipe.transform(firstDay,'yyyy-MM-dd');
      this.endDate = await this.datePipe.transform(lastDay,'yyyy-MM-dd');
    }else if(this.filter === 'range-date'){
      this.startDate = await this.datePipe.transform(this.start,'yyyy-MM-dd');
      this.endDate = await this.datePipe.transform(this.end,'yyyy-MM-dd');
    }

    this.restApi.getSalesReport(this.startDate,this.endDate).then((res:any)=>{
      this.dataSales = res.data;

    }).catch(err=>{
      console.log(err);

    })

  }

}
