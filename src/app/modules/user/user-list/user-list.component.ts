import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  dataUser:any;
  cari="";
  constructor(
    private restApi : RestApiService,
    private router : Router,
    private dataService : DataService,
    private dialog : MatDialog,
    private snackbar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.restApi.getUser(this.cari).then((res:any)=>{
      this.dataUser = res.data;
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
        this.dataService.setLoading(true);
        this.restApi.deleteUser(id).then((res:any)=>{
          this.getUser();
          this.snackbar.open("User berhasil di hapus","",{
            duration:2000
          });

        }).catch(err=>{
          console.log(err);

        })
      }
    })
  }

  toEdit(id:any){
    this.router.navigate(['/user/edit/'+id]);
  }

}
