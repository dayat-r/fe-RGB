import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestApiService } from './../../../services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coa-list',
  templateUrl: './coa-list.component.html',
  styleUrls: ['./coa-list.component.css']
})
export class CoaListComponent implements OnInit {

  cari="";
  dataCoa:any;
  constructor(
    private restApi : RestApiService,
    private snackbar : MatSnackBar,
    private dialog : MatDialog,
    public dataService : DataService,
    private router : Router
  ) {
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    this.getCoa();
  }

  search(){
    this.dataService.setLoading(true);
    this.getCoa();
  }

  resetSearch(){
    this.cari = "";
    this.dataService.setLoading(true);
    this.getCoa();
  }

  getCoa(){
    this.restApi.getCoa(this.cari).then((res:any)=>{
      this.dataCoa = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

  onDelete(id:any){
    this.dataService.dialogSuccess("Delete Coa","Yakin akan Menghapus data ?");
    const dialogRef = this.dialog.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.restApi.deleteCoa(id).then((res:any)=>{
          if(res){
            this.snackbar.open("Coa berhasil di hapus","",{
              duration:2000
            });
            this.getCoa();
          }
        })
      }
    })
  }

  toEdit(id:any){
    this.router.navigate(['/coa/coa-edit/'+id]);
  }

}
