import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  // cari="";
  dataPurchase:any;
  datafilter:any=[]
  constructor(
    private restApi : RestApiService,
    private router : Router,
    public dataService : DataService
  ) {

  }

  ngOnInit(): void {
    this.getListPurchase();
  }


  getListPurchase(){
    this.restApi.getPurchaseList(this.datafilter).then((res:any)=>{
      this.dataPurchase = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);
    })
  }

  onEdit(){

  }

  onDelete(){

  }

  onResetFilter(){
    this.dataService.setLoading(true);
    this.datafilter = [];
    this.getListPurchase();
  }

  onFilter(event:any,value:any){
    this.dataService.setLoading(true);
    if(event){
      this.datafilter.push(value)
    }else{
      this.datafilter = this.datafilter.filter((m:any)=>m!=value);
    }
    this.getListPurchase();

  }

  toDetail(id:string){
    this.router.navigate(['/purchase/detail/'+id]);
  }

}
