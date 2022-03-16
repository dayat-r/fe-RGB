import decode from 'jwt-decode';
import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  dataSupplier:any;
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
    this.getSupplier();
  }

  search(){
    this.dataService.setLoading(true);
    this.getSupplier();
  }

  resetSearch(){
    this.cari="";
    this.dataService.setLoading(true);
    this.getSupplier();
  }

  getSupplier(){
    this.restApi.getSupplier(this.cari).then((res:any)=>{
      this.dataSupplier = res.data;
      this.dataService.setLoading(false);

    }).catch(err=>{
      console.log(err);

    })
  }

  onDelete(id:any){
    this.dataService.dialogSuccess("Delete","Apakah anda yakin menghapus data ?");
    const dialogRef = this.dialog.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res){
        this.restApi.deleteSupplier(id).then((res:any)=>{
          this.getSupplier();
          this.snackbar.open("Supplier berhasil di hapus","",{
            duration:2000
          });

        }).catch(err=>{
          console.log(err);

        })
      }
    })
  }

  toEdit(id:any){
    this.router.navigate(['/supplier/edit/'+id]);
  }

}
