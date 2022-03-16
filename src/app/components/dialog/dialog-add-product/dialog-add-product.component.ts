import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSupplierComponent } from '../dialog-supplier/dialog-supplier.component';

@Component({
  selector: 'app-dialog-add-product',
  templateUrl: './dialog-add-product.component.html',
  styleUrls: ['./dialog-add-product.component.css']
})
export class DialogAddProductComponent implements OnInit {
  barcode="";
  dataActual:any;
  data = {
    location:'',
    qty:1,
    priceUnit:'',
    diskon:0,
    typeDiskon:'Amount',
    dp:'',
    ppn : 10,
    ppnCheck : false,
    ppnStatus : "BEFORE",
    paymentMethod:'CASH',
    credit: 0,
    limitDate:'',
    idSupplier: '',
		nameSupplier: '',

  }
  totalPrice=0;
  limitPrice = 0;
  error={
    price:false
  }
  math = Math.round;
  constructor(
    private restApi : RestApiService,
    @Inject(MAT_DIALOG_DATA) public dataBarcode: any,
    private snackbar : MatSnackBar,
    public dialogRef: MatDialogRef<DialogAddProductComponent>,
    private dialog : MatDialog,
    private dataService : DataService
  ) {
    this.barcode = dataBarcode.barcode;
    this.limitPrice = dataBarcode.price;
  }

  ngOnInit(): void {
    this.getLocation();
  }

  onOpenDialogSupplier() {
		const dialogRef = this.dialog.open(DialogSupplierComponent);
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.data.idSupplier = res.id,
				this.data.nameSupplier = res.name
			}
		})
	}

  matSelectChange() {
		this.data.diskon = 0;
		this.calculate();
	}

  calculateModal(){
    // if(parseInt(this.data.priceUnit)  >= this.limitPrice){
    //   this.error.price = true;
    // }else{
    //   this.error.price = false;
    // }
    this.calculate();
  }

  calculate(){
    let total = parseInt(this.data.priceUnit) * this.data.qty;
    if(this.data.ppnCheck && this.data.ppnStatus === 'BEFORE'){
      if(this.data.diskon && this.data.typeDiskon === 'Amount'){
        this.totalPrice = total + (total * (this.data.ppn/100)) - this.data.diskon;
      }else if(this.data.diskon && this.data.typeDiskon === 'Percentage'){
        this.totalPrice = total + (total * (this.data.ppn/100)) - (total * (this.data.diskon/100));
      }else{
        this.totalPrice = total + (total * (this.data.ppn/100));

      }
    }else if(this.data.ppnCheck && this.data.ppnStatus === 'AFTER'){
      if(this.data.diskon && this.data.typeDiskon === 'Amount'){
        const tot = total - this.data.diskon;
        this.totalPrice = tot + (tot*this.data.ppn/100);
      }else if(this.data.diskon && this.data.typeDiskon === 'Percentage'){
        const tot = total - (total * (this.data.diskon/100))
        this.totalPrice = tot + (tot*this.data.ppn/100);
      }else{
        this.totalPrice = total + (total*this.data.ppn/100);

      }
    }else{
      if(this.data.diskon && this.data.typeDiskon === 'Amount'){
        this.totalPrice = total -  this.data.diskon;
      }else if(this.data.diskon && this.data.typeDiskon ==='Percentage'){
        this.totalPrice = total - (total * (this.data.diskon/100));
      }else{
        this.totalPrice = total;
      }
    }
    if(this.data.paymentMethod === 'CREDIT'){
      this.data.credit = this.totalPrice - parseFloat(this.data.dp) ;
    }
  }

  getLocation(){
    this.restApi.getActualStockByBarcode(this.barcode).then((res:any)=>{
      this.dataActual = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    });
  }

  onRestock(){
    if(this.data.location && this.data.priceUnit && this.data.qty && this.data.idSupplier ){
      this.dataService.setLoading(true);
      this.restApi.restockProduct(this.data.location,{
        qty : this.data.qty,
        date : new Date(),
        priceUnit : parseFloat(this.data.priceUnit),
        diskon :  this.data.diskon,
        dp : parseFloat(this.data.dp),
        credit : this.data.credit,
        paymentMethod : this.data.paymentMethod,
        limitDate : this.data.limitDate,
        total : this.totalPrice,
        ppn : this.data.ppn,
        ppnStatus : this.data.ppnStatus,
        ppnCheck : this.data.ppnCheck,
        barcode : this.barcode,
        typeDiskon : this.data.typeDiskon,
        idSupplier : this.data.idSupplier,

      }).then((res:any)=>{
        if(res){
          if(this.data.paymentMethod === 'CREDIT'){

            let saldo;
            this.restApi.getSupplierById(this.data.idSupplier).then((res:any)=>{
              saldo = res.data.hutang | 0;
              let hutang = saldo + this.data.credit;
              this.restApi.updateSupplier(this.data.idSupplier,{
                hutang : hutang
              })
            })
          }
          this.snackbar.open("Stok produk berhasil di tambahkan","",{
            duration:2000
          });
          this.dialogRef.close(true);
        }else{
          this.snackbar.open("Stok produk gagal","",{
            duration:2000
          });
        }
      }).catch(err=>{
        this.snackbar.open("Stok produk gagal","",{
          duration:2000
        });
      })
    }else{
      this.snackbar.open("Lengkapi data terlebih dahulu","",{
        duration:2000
      });
    }
  }

}
