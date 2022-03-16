import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  data={
    name:'',
    email:'',
    role:'',
    deptCode:''
  }
  idUser="";
  constructor(
    private route : ActivatedRoute,
    private restApi : RestApiService,
    private location : Location,
    private snackbar : MatSnackBar,
    public dataService : DataService
  ) {
    route.params.subscribe((res:any)=>{
      this.idUser = res.id;
    });
   }
  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(){
    if(this.idUser){
      this.restApi.getUserById(this.idUser).then((res:any)=>{
        this.data = res.data;
        this.dataService.setLoading(false);
      }).catch(err=>{
        console.log(err);

      });
    }
  }

  onUpdateUser(){
    if(this.data.name && this.data.email && this.data.role && this.data.deptCode){
      this.dataService.setLoading(true);
      this.restApi.updateUser(this.idUser,this.data).then((res:any)=>{
        this.location.back();
        this.snackbar.open("Customer berhasil di ubah","",{
          duration:2000
        });
      }).catch(err=>{
        console.log(err);
        this.dataService.setLoading(false);

      })
    }
  }



}
