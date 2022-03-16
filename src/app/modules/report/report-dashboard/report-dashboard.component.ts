import { RestApiService } from './../../../services/rest-api.service';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent implements OnInit {
  cost=0;
  income=0;
  sales=0;
  purchase=0;
  hutang=0;
  piutang=0;
  sumSales=0;
  sumPurchase=0;
  asetIdr=0;
  constructor(
    public dataService : DataService,
    public restApi : RestApiService
  ) {
    dataService.setLoading(false)
  }

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary(){
    this.restApi.getDashboardReport().then((res:any)=>{
      this.cost = res.cost;
      this.income = res.income;
      this.purchase = res.purchase;
      this.sales = res.sales;
      this.hutang = res.supplier;
      this.piutang = res.customer;
      this.sumSales = res.sumSales;
      this.sumPurchase = res.sumPurchase;
      this.asetIdr = res.sumAset
    }).catch(err=>{
      console.log(err);

    })
  }

}
