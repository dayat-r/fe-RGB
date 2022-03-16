import { DataService } from 'src/app/services/data.service';
import { DialogAddCustomerComponent } from './../dialog-add-customer/dialog-add-customer.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-customer',
  templateUrl: './dialog-customer.component.html',
  styleUrls: ['./dialog-customer.component.css']
})
export class DialogCustomerComponent implements OnInit {
  dataCustomer:any;
  cari='';
  constructor(
    private restApi : RestApiService,
    private dialogRef : MatDialogRef<DialogCustomerComponent>,
    private dialog : MatDialog,
    private dataService : DataService
  ) {
    dataService.setLoading(true);
   }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(){
    this.restApi.getCustomer(this.cari).then((res:any)=>{
      this.dataCustomer = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

  onSelect(id:string, name : string){
    this.dialogRef.close({
      id : id,
      name : name
    })
  }

  dialogAddCustomer(){
    const dialogRef1 = this.dialog.open(DialogAddCustomerComponent);
    dialogRef1.afterClosed().subscribe(res=>{
      if(res){
        this.dialogRef.close({
          id : res.id,
          name : res.name
        });
      }
    })
  }

}
