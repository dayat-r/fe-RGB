import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DialogInformationComponent } from './../../../components/dialog/dialog-information/dialog-information.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../../environments/environment.prod';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {
  id="";

  dataPurchase:any;

  constructor(
    private location : Location,
    private restApi : RestApiService,
    private route : ActivatedRoute,
    private dataService : DataService,
    private snackbar : MatSnackBar,
    private dialog : MatDialog
  ) {
    route.params.subscribe(res=>{
      this.id = res.id;
    });
    dataService.setLoading(true);
   }

  ngOnInit(): void {
    this.getDetail();
  }

  back(){
    this.location.back();
  }

  getDetail(){
    this.restApi.getPurchaseById(this.id).then((res:any)=>{
      this.dataPurchase = res.dataPurchase;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

  getImageItem(path: string) {
		if (path) {
			return environment.urlImage + path;

		} else {
			return '';
		}
	}

  onDelete(){
    if(this.dataPurchase?.qty === this.dataPurchase?.qtyOut){
      this.dataService.dialogSuccess("Delete Purchase","Yakin akan menghapus purchase ?");
      const dialogRef =  this.dialog.open(DialogConfirmationComponent);
      dialogRef.afterClosed().subscribe(res=>{
        if(res){
          this.dataService.setLoading(true);
          this.restApi.deletePurchase(this.id).then((res:any)=>{
            if(res){
              this.back();
            }else{
              this.snackbar.open("Gagal menghapus purchase","",{
                duration:2000
              });
            }
          });
        }
      });
    }else{
      this.dataService.dialogSuccess("Peringatan","Purchase ini telah digunakan pada transaksi, harap hapus transaksi terlebih dahulu !");
      this.dialog.open(DialogInformationComponent);
    }
  }

}
