import { DialogPaymentComponent } from './../../../../components/dialog/dialog-payment/dialog-payment.component';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-ar',
  templateUrl: './list-ar.component.html',
  styleUrls: ['./list-ar.component.css']
})
export class ListArComponent implements OnInit {

  cari="";
  dataPiutang:any;
  constructor(
    private location : Location,
    private dataService : DataService,
    private restApi : RestApiService,
    private dialog : MatDialog
  ) {
    dataService.setLoading(true);
   }

  ngOnInit(): void {
    this.getPiutang();
  }

  back(){
    this.location.back();
  }
  resetSearch(){
    this.cari="";
    this.dataService.setLoading(true);
    this.getPiutang();
  }

  search(){
    this.dataService.setLoading(true);
    this.getPiutang();
  }

  getPiutang(){
    this.restApi.getListSalesCredit(this.cari).then((res:any)=>{
      this.dataPiutang = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    });
  }

  onOpenDialogPayment(credit:any,id:any,idPerson:any,status:boolean){
    const dialogRef = this.dialog.open(DialogPaymentComponent,{
      data: {
        credit : credit,
        type : 'PIUTANG',
        id:id,
        idPerson : idPerson,
        status:status
      }
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.search();
      }
    })
  }

}
