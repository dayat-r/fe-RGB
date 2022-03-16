import { RestApiService } from 'src/app/services/rest-api.service';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-is-report',
  templateUrl: './is-report.component.html',
  styleUrls: ['./is-report.component.css'],
  providers:[DatePipe]
})
export class IsReportComponent implements OnInit {
  pendapatan=0;
  hargaPokok = 0;
  dataPengeluaran:any;
  pengeluaran=0;
  filter="this-month"
  startDate:any;
  endDate:any;
  disable=true;
  start:any;
  end:any;
  constructor(
    private dataService : DataService,
    private location : Location,
    private restApi : RestApiService,
    private datePipe : DatePipe
  ) {
    dataService.setLoading(false);
  }

  ngOnInit(): void {
    this.getIsReport();
  }

  back(){
    this.location.back();
  }

  cekFilter(){
    if(this.filter === 'this-month'){
      this.disable = false;
    }else if(this.filter === 'this-year'){
      this.disable = false;
    }else if(this.filter === 'range-date' && this.start!=undefined && this.end!=undefined){
      this.disable = false;
    }else{
      this.disable = true;
    }
  }

  async getIsReport(){
    if(this.filter === 'this-month'){
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.startDate = await  this.datePipe.transform(firstDay,'yyyy-MM-dd');
      this.endDate = await this.datePipe.transform(lastDay,'yyyy-MM-dd');
    }else if(this.filter === 'this-year'){
      var date = new Date();
      var firstDay = new Date(new Date().getFullYear(), 0, 1);
      var lastDay = new Date(new Date().getFullYear(), 11, 31);
      this.startDate = await  this.datePipe.transform(firstDay,'yyyy-MM-dd');
      this.endDate = await this.datePipe.transform(lastDay,'yyyy-MM-dd');
    }else if(this.filter === 'range-date'){
      this.startDate = await this.datePipe.transform(this.start,'yyyy-MM-dd');
      this.endDate = await this.datePipe.transform(this.end,'yyyy-MM-dd');
    }
    this.restApi.getIsReport(this.startDate,this.endDate).then((res:any)=>{
      this.pendapatan = res.sales;
      this.hargaPokok = res.hargaPokok;
      this.dataPengeluaran = res.pengeluaran;
      this.pengeluaran = res.sumPengeluaran;
    }).catch(err=>{
      console.log(err);

    })
  }

}
