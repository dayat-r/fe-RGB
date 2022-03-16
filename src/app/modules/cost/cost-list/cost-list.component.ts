import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cost-list',
  templateUrl: './cost-list.component.html',
  styleUrls: ['./cost-list.component.css']
})
export class CostListComponent implements OnInit {
  cari="";
  dataCost:any;
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
    this.getCost();
  }

  search(){
    this.dataService.setLoading(true);
    this.getCost();
  }

  resetSearch(){
    this.cari = "";
    this.dataService.setLoading(true);
    this.getCost();
  }

  getCost(){
    this.restApi.getCost(this.cari).then((res:any)=>{
      this.dataCost = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

  onDelete(id:any){
    this.dataService.dialogSuccess("Delete Cost","Yakin akan Menghapus data ?");
    const dialogRef = this.dialog.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.restApi.deleteCost(id).then((res:any)=>{
          if(res){
            this.snackbar.open("Cost berhasil di hapus","",{
              duration:2000
            });
            this.getCost();
          }
        })
      }
    })
  }

  toEdit(id:any){
    this.router.navigate(['/cost/edit/'+id]);
  }

}
