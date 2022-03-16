import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {
  data={
    name:'',
    address:'',
    telp:''
  }
  idSupplier="";
  constructor(
    private route : ActivatedRoute,
    private restApi : RestApiService,
    private location : Location,
    private snackbar : MatSnackBar,
    public dataService : DataService
  ) {
    route.params.subscribe((res:any)=>{
      this.idSupplier = res.id;
    });
    dataService.setLoading(true);
   }

  ngOnInit(): void {
    this.getSupplierById();
  }

  back(){
    this.location.back();
  }

  getSupplierById(){
    if(this.idSupplier){
      this.restApi.getSupplierById(this.idSupplier).then((res:any)=>{
        this.data = res.data;
        this.dataService.setLoading(false);
      }).catch(err=>{
        console.log(err);

      })
    }
  }

  onUpdate(){
    if(this.data.name && this.data.address && this.data.telp){
      this.dataService.setLoading(true);
      this.restApi.updateSupplier(this.idSupplier,this.data).then((res:any)=>{
        if(res){
          this.location.back();
          this.snackbar.open("Supplier berhasil di ubah","",{
            duration:2000
          });
        }else{
          this.dataService.setLoading(false);
        }
      }).catch(err=>{
        console.log(err);
        this.dataService.setLoading(false);

      })
    }
  }

}
