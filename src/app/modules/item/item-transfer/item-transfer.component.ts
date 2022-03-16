import { MatSnackBar } from '@angular/material/snack-bar';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DialogProductComponent } from 'src/app/components/dialog/dialog-product/dialog-product.component';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item-transfer',
  templateUrl: './item-transfer.component.html',
  styleUrls: ['./item-transfer.component.css']
})
export class ItemTransferComponent implements OnInit {
  dataActual:any;
  dataActualTo:any;
  data = {
    location:'',
    locationTo:'',
    qty:1,
    qtySumTo:0,
    barcode:'',
    itemDescription:'',
    qtyAvailable:0
  }
  constructor(
    private location : Location,
    public dataService : DataService,
    private dialog : MatDialog,
    private restApi : RestApiService,
    private snackbar : MatSnackBar
  ) {
    dataService.setLoading(false)
  }

  ngOnInit(): void {
  }

  back(){
    this.location.back();
  }

  onOpenDialogProduct(){
    this.dataService.setLoading(true);
    const dialogRef = this.dialog.open(DialogProductComponent);
    dialogRef.afterClosed().subscribe(async(res)=>{
      this.data.barcode = await res.data.barcode;
      this.data.itemDescription = res.data.description + ' ' +res.data.merkMobil+ ' ' +res.data.tipeMobil;
      this.getLocation();
      this.getLocationTo();
    })
  }

  getLocation(){
    this.restApi.getActualStockByBarcode(this.data.barcode).then((res:any)=>{
      this.dataActual = res.data;
    }).catch(err=>{
      console.log(err);

    });
  }
  getLocationTo(){
    this.restApi.getActualStockByBarcodeNo(this.data.barcode).then((res:any)=>{
      this.dataActualTo = res.data;
    }).catch(err=>{
      console.log(err);

    });
  }

  onTransfer(){
    if(this.data.barcode && this.data.location && this.data.locationTo && this.data.qty){
      this.dataService.setLoading(true);
      this.restApi.transferProduct(this.data.barcode,this.data).then((res:any)=>{
        this.snackbar.open("Produk berhasil di pindahkan","",{
          duration:2000
        });
        this.dataService.setLoading(false);
        this.back();
      }).catch(err=>{
        console.log(err);

      })
    }else{
      this.snackbar.open("Lengkapi data terlebih dahulu","",{
        duration:2000
      });
    }
  }

}
