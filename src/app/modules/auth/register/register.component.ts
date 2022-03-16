import { DataService } from './../../../services/data.service';
import { RestApiService } from './../../../services/rest-api.service';
import { DialogInformationComponent } from './../../../components/dialog/dialog-information/dialog-information.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
    email = "";
    password="";
    role="";
    deptCode="";
    constructor(
        private restApi : RestApiService,
        private router : Router,
        private dialog :MatDialog,
        public dataService : DataService
    ) {
      dataService.setLoading(false);
    }

    ngOnInit(): void {
    }

    onLogin(){
        if(this.email && this.password){
          this.dataService.setLoading(true);
            this.restApi.Register({
                email:this.email,
                deptCode:this.deptCode,
                role:this.role,
                password:this.password
            }).then((res:any)=>{
                if(res){
                  localStorage.setItem("token-sion",res.token);
                  this.router.navigate(['/']);
                }
            }).catch(err=>{
              if(err.error.message === "User not found !"){
                this.dataService.dialogSuccess("Login","User tidak terdaftar");
                this.dialog.open(DialogInformationComponent);

              }else if(err.error.message === "Password dont match"){
                this.dataService.dialogSuccess("Login","Password salah, silahkan coba lagi");
                this.dialog.open(DialogInformationComponent);
              }else{
                console.log(err.error);
              }
              this.dataService.setLoading(false);

            })
        }else{
          this.dataService.dialogSuccess("Login","Email dan password tidak boleh kosong");
          this.dialog.open(DialogInformationComponent);
        }
    }

}
