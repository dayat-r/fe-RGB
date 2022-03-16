import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  dataLocation:any;
  cari="";
  constructor(
    private restApi : RestApiService,
    private router : Router,
    private dataService : DataService,
    private dialog : MatDialog,
    private snackbar : MatSnackBar
  ) {
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    this.getLocation();
  }

  search(){
    this.dataService.setLoading(true);
    this.getLocation();
  }

  resetSearch(){
    this.cari="";
    this.dataService.setLoading(true);
    this.getLocation()
  }

  getLocation(){
    this.restApi.getLocationCode(this.cari).then((res:any)=>{
      this.dataLocation = res.data;
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
        this.restApi.deleteLocationCode(id).then((res:any)=>{
          this.getLocation();
          this.snackbar.open("Location berhasil di hapus","",{
            duration:2000
          });

        }).catch(err=>{
          console.log(err);

        })
      }
    })
  }

  toEdit(id:any){
    this.router.navigate(['/location-code/edit/'+id]);
  }

}
