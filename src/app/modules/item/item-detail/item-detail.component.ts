import { DialogPrintBarcodeComponent } from './../../../components/dialog/dialog-print-barcode/dialog-print-barcode.component';
import decode from 'jwt-decode';
import { DataService } from './../../../services/data.service';
import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from './../../../components/dialog/dialog-add-product/dialog-add-product.component';
import { Location } from '@angular/common';
import { environment } from './../../../../environments/environment';
import { RestApiService } from './../../../services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  barcode ="";
  dataItem:any;
  dataPrice : any;
  dataLocation: any;

  role="";
  constructor(
    private restApi  : RestApiService,
    private route  : ActivatedRoute,
    private location : Location,
    private dialog : MatDialog,
    private router : Router,
    private dataService : DataService,
    private snackbar : MatSnackBar
  ) {
    route.params.subscribe(res=>{
      this.barcode = res.id;
    })
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    const storage:any = decode(localStorage.getItem('token-sion')!);
    this.role = storage.role;

    this.getItemByBarcode();
    // setTimeout(() => {
    //   this.dataService.setLoading(false);
    // }, 1000);
  }

  calculate(item : any){
    let totalPrice=0;
    let total = item.priceUnit * item.qty;
    if(item.ppnCheck && item.ppnStatus === 'BEFORE'){
      if(item.diskon && item.typeDiskon === 'Amount'){
        totalPrice = total + (total * (item.ppn/100)) - item.diskon;
      }else if(item.diskon && item.typeDiskon === 'Percentage'){
        totalPrice = total + (total * (item.ppn/100)) - (total * (item.diskon/100));
      }else{
        totalPrice = total + (total * (item.ppn/100));

      }
    }else if(item.ppnCheck && item.ppnStatus === 'AFTER'){
      if(item.diskon && item.typeDiskon === 'Amount'){
        const tot = total - item.diskon;
        totalPrice = tot + (tot*item.ppn/100);
      }else if(item.diskon && item.typeDiskon === 'Percentage'){
        const tot = total - (total * (item.diskon/100))
        totalPrice = tot + (tot*item.ppn/100);
      }else{
        totalPrice = total + (total*item.ppn/100);

      }
    }else{
      if(item.diskon && item.typeDiskon === 'Amount'){
        totalPrice = total -  item.diskon;
      }else if(item.diskon && item.typeDiskon ==='Percentage'){
        totalPrice = total - (total * (item.diskon/100));
      }else{
        totalPrice = total;
      }
    }

    return totalPrice;
  }

  back(){
    this.location.back();
  }

  getItemByBarcode(){
    this.restApi.getItemById(this.barcode).then((res:any)=>{
      this.dataService.setLoading(false);
      this.dataItem = res.data[0];
      this.dataPrice = res.priceRef;

      this.dataLocation = res.location;

    }).catch(err=>{
      console.log(err);
      this.dataService.setLoading(false);
    });
  }

  getImage(){
    return environment.urlImage+this.dataItem?.path;
  }

  toAddProduct() {
    this.dataService.setLoading(true);
		const dialogRef = this.dialog.open(DialogAddProductComponent, {
			data: this.dataItem
    })
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
        this.dataService.setLoading(true);
				this.getItemByBarcode();

			}
		})
	}

  toEdit() {
		this.router.navigate(['item/edit/' + this.barcode]);
	}
  onDelete() {
		this.dataService.dialogSuccess("Delete Item", "Yakin akan menghapus data ?");
		const dialogRef = this.dialog.open(DialogConfirmationComponent);
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.restApi.deleteItem(this.barcode).then((res: any) => {
					if (res) {
						this.snackbar.open("Item deleted successfuly", "", {
							duration: 2000
						});
						this.back();
					} else {
						this.snackbar.open("Item fail deleted", "", {
							duration: 2000
						});
					}
				}).catch(err => {
					console.log(err);

				});
			}
		});
	}

  onPrintBarcode() {
		const dialogRef = this.dialog.open(DialogPrintBarcodeComponent, {
			data: this.barcode
    })
		dialogRef.afterClosed().subscribe(res => {
			if (res) {

			}
		})
	}


}
