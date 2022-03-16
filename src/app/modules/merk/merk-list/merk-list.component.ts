import { environment } from './../../../../environments/environment';
import decode from 'jwt-decode';
import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-merk-list',
  templateUrl: './merk-list.component.html',
  styleUrls: ['./merk-list.component.css']
})
export class MerkListComponent implements OnInit {
  cari="";
  dataMerk:any;
  role="";
  arrSkeleton=[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5]
  constructor(
    private restApi : RestApiService,
    private router : Router,
    private dialog : MatDialog,
    public dataService : DataService,
    private snackbar : MatSnackBar
  ) {
    dataService.setLoading(false);
    dataService.setSkeleton(true);
  }

  ngOnInit(): void {
    const storage:any = decode(localStorage.getItem('token-sion')!);
    this.role = storage.role;
    this.getMerk();
  }

  search(){
    this.dataService.setSkeleton(true);
    this.getMerk();
  }

  resetSearch(){
    this.dataService.setSkeleton(true);
    this.cari="";
    this.getMerk();
  }

  getMerk(){
    this.restApi.getMerk(this.cari).then((res:any)=>{
      this.dataMerk = res.data;
      this.dataService.setSkeleton(false);
    }).catch(err=>{
      console.log(err);

    });
  }

  urlImage(url:any):SafeUrl{
    if(url){
      return environment.urlImage+url;
    }
    return '';
  }

  toEdit(id:any){
    this.router.navigate(['merk/edit/'+id]);
  }

  onDelete(id:string){
    this.dataService.dialogSuccess("Delete Merek","Yakin akan menghapus data "+id);
    const dialogRef = this.dialog.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.restApi.deleteMerk(id).then((res:any)=>{
          if(res){
            this.snackbar.open(id+" deleted","",{
              duration:2000
            });
            this.getMerk();
          }else{
            this.snackbar.open("fail delete "+id,"",{
              duration:2000
            });
          }
        })
      }
    })
  }

}
