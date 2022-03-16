import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  data={
    name:'',
    email:'',
    password:'',
    role:'',
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

  onSaveUser(){
    if(this.data.name && this.data.email && this.data.password && this.data.role && this.data.deptCode){
      this.dataService.setLoading(true);
      this.restApi.saveUser(this.data).then((res:any)=>{
        this.location.back();
        this.snackbar.open("User save successfuly","",{
          duration:2000
        })
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
