import { DataService } from 'src/app/services/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RestApiService } from './../../../services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.css']
})
export class DialogAddCustomerComponent implements OnInit {
  data={
    name:'',
    address:'',
    telp:'',
    deptCode:''
  }
  constructor(
    private restApi : RestApiService,
    private dialogRef : MatDialogRef<DialogAddCustomerComponent>,
    private snackbar : MatSnackBar,
    private dataService : DataService

  ) { }

  ngOnInit(): void {
  }

  onSaveCustomer(){
    if(this.data.name && this.data.deptCode){
      this.dataService.setLoading(true);
      this.restApi.saveCustomer(this.data).then((res:any)=>{
        if(res){
          this.dialogRef.close({
            id : res.data.idCustomer,
            name : res.data.name
          })
        }else{
          console.log(res);

        }
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.snackbar.open("Lengkapi data nama atau kota terlebih dahulu","",{
        duration: 2000
      })
    }
  }
}
