import { MatSnackBar } from '@angular/material/snack-bar';
import decode from 'jwt-decode';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  changePassword = false;
  data = {
    email : '',
    name : '',

  }
  password ='';
  passwordConfirm='';
  oldPassword='';

  user:any
  constructor(
    private location : Location,
    public dataService : DataService,
    private restApi : RestApiService,
    private snackbar : MatSnackBar,
    private router : Router
  ) {
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    const dataUser = localStorage.getItem("token-sion");
		this.user = decode(dataUser!);

    this.getProfile();
  }

  getProfile(){
    this.restApi.getUserById(this.user.user).then((res:any)=>{
      this.data = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);
      this.dataService.setLoading(false);

    })
  }

  updateProfile(){
    if(this.changePassword){
      if(this.data.name && this.password && this.oldPassword && this.passwordConfirm){
        if(this.password === this.passwordConfirm){
          // this.dataService.setLoading(true);
          this.restApi.updateUserPassword(this.user.user,{
            name : this.data.name,
            password : this.password,
            oldPassword : this.oldPassword
          }).then((res:any)=>{
            if(res){
              this.dataService.setLoading(false);
              this.snackbar.open("Profile berhasil di perbaharui, Silahkan login kembali","",{
                duration:2000
              });
              localStorage.clear();
              this.router.navigate(['/login']);
            }else{
              this.snackbar.open(res.message,"",{
                duration:2000
              });
            }
          }).catch(err=>{
            this.snackbar.open(err.error.message,"",{
              duration:2000
            });
          })
        }else{
          this.snackbar.open("Password baru tidak sama","",{
            duration:2000
          });
        }
      }else{
        this.snackbar.open("Lengkapi data terlebih dahulu","",{
          duration:2000
        });
      }
    }else{
      if(this.data.name){
        this.dataService.setLoading(true);
        this.restApi.updateUser(this.user.user,{
          name : this.data.name
        }).then((res:any)=>{
          this.dataService.setLoading(false);
          this.snackbar.open("Profile berhasil di perbaharui, Silahkan login kembali","",{
            duration:2000
          });
          localStorage.clear();
		      this.router.navigate(['/login']);
        });
      }
    }
  }

  back(){
    this.location.back();
  }

}
