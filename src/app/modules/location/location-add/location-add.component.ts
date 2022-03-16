import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
  data={
    locCode:'',
    name:'',
    address:'',
    telp:'',
    deptCode:''
  }
  constructor(
    private restApi : RestApiService,
    private router : Router,
    private location : Location,
    private snackbar : MatSnackBar,
    public dataService : DataService
  ) {
    dataService.setLoading(false);
  }

  ngOnInit(): void {
  }

  onSaveLocation(){
    if(this.data.locCode && this.data.name && this.data.address && this.data.telp && this.data.deptCode){
      this.dataService.setLoading(true);
      this.restApi.saveLocationCode(this.data).then((res:any)=>{
        if(res){

          this.back();
          this.snackbar.open("Location save successfuly","",{
            duration:2000
          })
        }else{
          this.dataService.setLoading(false);
        }
      }).catch(err=>{
        console.log(err);
        this.dataService.setLoading(false);
      })
    }
  }
  back(){
    this.location.back();
  }

}
