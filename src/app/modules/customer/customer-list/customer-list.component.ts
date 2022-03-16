import decode from 'jwt-decode';
import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  dataCustomer:any;
  cari="";
  role="";
  constructor(
    private restApi : RestApiService,
    private router : Router,
    public dataService : DataService,
    private dialog : MatDialog,
    private snackbar : MatSnackBar
  ) {
    dataService.setLoading(true);
   }

  ngOnInit(): void {
    const storage:any = decode(localStorage.getItem('token-sion')!);
    this.role = storage.role;
    this.getCustomer();
  }

  search(){
    this.dataService.setLoading(true);
    this.getCustomer();
  }

  resetSearch(){
    this.cari="";
    this.dataService.setLoading(true);
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

  toEdit(id:any){
    this.router.navigate(['/customer/edit/'+id]);
  }

  onDelete(id :any){
    this.dataService.dialogSuccess("Delete","Apakah anda yakin menghapus data ?");
    const dialogRef = this.dialog.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res){
        this.restApi.deleteCustomer(id).then((res:any)=>{
          this.getCustomer();
          this.snackbar.open("Customer berhasil di hapus","",{
            duration:2000
          });

        }).catch(err=>{
          console.log(err);

        })
      }
    })
  }

}
