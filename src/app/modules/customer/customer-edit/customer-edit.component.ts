import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  data={
    name:'',
    address:'',
    telp:'',
    deptCode:''
  }
  idCustomer="";
  constructor(
    private route : ActivatedRoute,
    private restApi : RestApiService,
    private location : Location,
    private snackbar : MatSnackBar,
    public dataService : DataService
  ) {
    route.params.subscribe((res:any)=>{
      this.idCustomer = res.id;
    });
    dataService.setLoading(true);
   }

  ngOnInit(): void {
    this.getCustomerById();
  }

  back(){
    this.location.back();
  }

  getCustomerById(){
    if(this.idCustomer){
      this.restApi.getCustomerById(this.idCustomer).then((res:any)=>{
        this.data = res.data;
        this.dataService.setLoading(false)
      }).catch(err=>{
        console.log(err);

      })
    }
  }

  onUpdateCustomer(){
    if(this.data.name && this.data.address && this.data.telp){
      this.dataService.setLoading(true);
      this.restApi.updateCustomer(this.idCustomer,this.data).then((res:any)=>{
        if(res){

          this.location.back();
          this.snackbar.open("Customer berhasil di ubah","",{
            duration:2000
          });
        }else{
          this.dataService.setLoading(false);
        }
      }).catch(err=>{
        console.log(err);

      })
    }
  }

}
