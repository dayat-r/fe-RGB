import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {
  cari="";
  dataIncome:any;
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
    this.getIncome();
  }

  search(){
    this.dataService.setLoading(true);
    this.getIncome();
  }

  resetSearch(){
    this.cari = "";
    this.dataService.setLoading(true);
    this.getIncome();
  }

  getIncome(){
    this.restApi.getIncome(this.cari).then((res:any)=>{
      this.dataIncome = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

  onDelete(id:any){
    this.dataService.dialogSuccess("Delete Income","Yakin akan Menghapus data ?");
    const dialogRef = this.dialog.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.restApi.deleteIncome(id).then((res:any)=>{
          if(res){
            this.snackbar.open("Income berhasil di hapus","",{
              duration:2000
            });
            this.getIncome();
          }
        })
      }
    })
  }

  toEdit(id:any){
    this.router.navigate(['/income/edit/'+id]);
  }

}
