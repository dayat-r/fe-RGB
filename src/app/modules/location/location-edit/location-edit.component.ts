import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {
  data={
    name:'',
    address:'',
    telp:'',
    deptCode:''
  }
  locCode="";
  constructor(
    private restApi : RestApiService,
    private router : Router,
    private location : Location,
    private snackbar : MatSnackBar,
    private route : ActivatedRoute,
    public dataService : DataService
  ) {
    route.params.subscribe((res:any)=>{
      this.locCode = res.id;
    });
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    this.getLocationById();
  }

  getLocationById(){
    if(this.locCode){
      this.restApi.getLocationCodeById(this.locCode).then((res:any)=>{
        this.data = res.data;
        this.dataService.setLoading(false);
      }).catch(err=>{
        console.log(err);
        this.dataService.setLoading(false);
      })
    }
  }

  onUpdateLocation(){
    if( this.data.name && this.data.address && this.data.telp && this.data.deptCode){
      this.dataService.setLoading(true);
      this.restApi.updateLocationCode(this.locCode,this.data).then((res:any)=>{
        if(res){
          this.back();
          this.snackbar.open("Location update successfuly","",{
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
