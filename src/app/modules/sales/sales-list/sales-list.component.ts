import { DataService } from './../../../services/data.service';
import { RestApiService } from './../../../services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
  cari="";
  dataSales:any;
  datafilter:any=[]
  math = Math.round;
  constructor(
    private restApi : RestApiService,
    private router : Router,
    public dataService : DataService
  ) {
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    this.getListSales();
  }

  search(){
    this.dataService.setLoading(true);
    this.getListSales();
  }

  resetSearch(){
    this.cari = "";
    this.dataService.setLoading(true);
    this.getListSales();
  }


  getListSales(){
    this.restApi.getListSales(this.cari,this.datafilter).then((res:any)=>{
      this.dataSales = res.data;
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
    this.datafilter = [];
    this.getListSales();
    // localStorage.setItem("filter", JSON.stringify({
    //   ...JSON.parse(localStorage.getItem("filter")!),
    //   payment: this.datafilter
    // }));
  }

  onFilter(event:any,value:any){
    if(event){
      this.datafilter.push(value)
    }else{
      this.datafilter = this.datafilter.filter((m:any)=>m!=value);
    }
    this.getListSales();

    // localStorage.setItem("filter", JSON.stringify({
    //   ...JSON.parse(localStorage.getItem("filter")!),
    //   payment: this.datafilter
    // }));
  }

  toDetail(id:string){
    this.router.navigate(['/sales/detail/'+id]);
  }

}
