import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  data={
    name:'',
    address:'',
    telp:'',
    deptCode:''
  }
  constructor(
    private restApi : RestApiService,
    private snackbar : MatSnackBar,
    private location : Location,
    public dataService : DataService
  ) {
    dataService.setLoading(false);
  }

  ngOnInit(): void {
  }

  back(){
    this.location.back();
  }

  onSaveCustomer(){
    if(this.data.name && this.data.address && this.data.telp && this.data.deptCode){
      this.dataService.setLoading(true);
      this.restApi.saveCustomer(this.data).then((res:any)=>{
        if(res){
          this.location.back();
          this.snackbar.open("Customer berhasil di tambahkan","",{
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
