import { Location } from '@angular/common';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit {
  dataAlert:any;
  constructor(
    private dataService : DataService,
    private restApi : RestApiService,
    private location : Location,
    private router : Router
  ) {
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    this.getAlert();
  }

  getAlert(){
    this.restApi.getAlert().then((res:any)=>{
      this.dataAlert = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

  back(){
    this.location.back();
  }

  toNext(type:string){
    if(type === 'HUTANG'){
      this.router.navigate(['/payment/debt']);
    }else{
      this.router.navigate(['/payment/ar']);
    }
  }

}
