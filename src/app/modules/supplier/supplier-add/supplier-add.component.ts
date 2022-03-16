import { DataService } from './../../../services/data.service';
import { Location } from '@angular/common';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent implements OnInit {
  data={
    name:'',
    address:'',
    telp:''
  }
  constructor(
    private restApi : RestApiService,
    private router : Router,
    private location : Location,
    public dataService : DataService,
    private snackbar : MatSnackBar
  ) {
    dataService.setLoading(false);
  }

  ngOnInit(): void {
  }

  onSaveSupplier(){
    if(this.data.name && this.data.address && this.data.telp){
      this.dataService.setLoading(true);
      this.restApi.saveSupplier(this.data).then((res:any)=>{
        if(res){
          this.back();
          this.snackbar.open("Supplier berhasil di ubah","",{
            duration:2000
          });
        }else{
          this.dataService.setLoading(false)

        }
      }).catch(err=>{
        console.log(err);
        this.dataService.setLoading(false)
      })
    }
  }

  back(){
    this.location.back();
  }

}
