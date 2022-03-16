import { DialogProductComponent } from './../../../components/dialog/dialog-product/dialog-product.component';
import { DatePipe, Location } from '@angular/common';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item-sales-report',
  templateUrl: './item-sales-report.component.html',
  styleUrls: ['./item-sales-report.component.css'],
  providers:[DatePipe]
})
export class ItemSalesReportComponent implements OnInit {

  dataItem:any;
  filter="";
  startDate:any;
  endDate:any;
  disable=true;
  start:any;
  end:any;
  item="";
  barcode = "";
  constructor(
    private dataService : DataService,
    private location : Location,
    private restApi : RestApiService,
    private datePipe : DatePipe,
    private dialog : MatDialog
  ) {
    dataService.setLoading(false);
   }

  ngOnInit(): void {
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

  async getItemSalesReport(){
    this.dataService.setLoading(true);
    if(this.filter ==='today'){
      this.startDate = await this.datePipe.transform(new Date(),'yyyy-MM-dd');
      let date = new Date();
      date.setDate(date.getDate() + 1);
      this.endDate = await this.datePipe.transform(date,'yyyy-MM-dd');
    }else if(this.filter === 'this-month'){
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      // this.startDate = await  firstDay;
      // this.endDate = await lastDay;
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
      this.end.setDate(this.end.getDate() + 1);
      this.endDate = await this.datePipe.transform(this.end,'yyyy-MM-dd');
    }

    this.restApi.getItemSalesReport(this.startDate,this.endDate,this.barcode).then((res:any)=>{
      this.dataItem = res.data;
      this.dataService.setLoading(false);

    }).catch(err=>{
      console.log(err);

    });

  }

  onOpenDialogItem(){
    const dialogRef = this.dialog.open(DialogProductComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.item = res.data.description +' '+ res.data.merkMobil +' '+ res.data.tipeMobil;
        this.barcode = res.data.barcode;
      }
    });
  }

}
