import { DataService } from './../../../services/data.service';
import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import decode from 'jwt-decode';
import { DialogUpdateQtyComponent } from './../../../components/dialog/dialog-update-qty/dialog-update-qty.component';
import { environment } from './../../../../environments/environment';
import { DialogPayComponent } from './../../../components/dialog/dialog-pay/dialog-pay.component';
import { DialogOrderQtyComponent } from './../../../components/dialog/dialog-order-qty/dialog-order-qty.component';
import { DialogProductComponent } from './../../../components/dialog/dialog-product/dialog-product.component';
import { DialogCustomerComponent } from './../../../components/dialog/dialog-customer/dialog-customer.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-sales-add',
	templateUrl: './sales-add.component.html',
	styleUrls: ['./sales-add.component.css']
})
export class SalesAddComponent implements OnInit,OnDestroy {
	data = {
		credit: 0,
		paymentMethod: 'CASH',
		limitDate: '',
		dp: '',
		ppn: 10,
		ppnStatus: 'BEFORE',
		ppnCheck: false,
		customerId: '',
		customerName: '',
    note : ''
	}
	scan="";

	dataItem: any = [];
	totalPrice = 0;
	totalCredit = 0;

  dataUser:any;
	constructor(
		private dialog: MatDialog,
		private restApi : RestApiService,
    private router : Router,
    private snackbar : MatSnackBar,
    public dataService : DataService

	) {
		if (JSON.parse(localStorage.getItem("order-draft")!) && JSON.parse(localStorage.getItem("order-draft")!).dataItem) {
			const dataItemLocal = { ...JSON.parse(localStorage.getItem("order-draft")!) }

			this.dataItem = dataItemLocal.dataItem;
			this.totalPrice = dataItemLocal.totalPrice;
      if(dataItemLocal.totalCredit){
        this.totalCredit = dataItemLocal.totalCredit;
      }
      if(dataItemLocal.dataOrder){
        this.data = dataItemLocal.dataOrder;
      }
		} else {
			console.log('kosong');

		}
    this.dataService.setLoading(false);
	}



	ngOnInit(): void {
    this.getUser();
	}

  getUser(){
    const token = localStorage.getItem('token-sion');
    this.dataUser = decode(token!);


  }

  ngOnDestroy(){
    this.onStorage();
  }


	onOpenDialogCustomer() {
		const dialogRef = this.dialog.open(DialogCustomerComponent);
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.data.customerId = res.id,
				this.data.customerName = res.name
        this.onStorage();
			}
		})
	}

	onOpenDialogItem() {
		const dialogRef = this.dialog.open(DialogProductComponent);
		dialogRef.afterClosed().subscribe(res => {
			if(res){
				if (JSON.parse(localStorage.getItem("order-draft")!) && JSON.parse(localStorage.getItem("order-draft")!).dataItem) {
					const dataItemLocal = { ...JSON.parse(localStorage.getItem("order-draft")!) }

					this.dataItem = dataItemLocal.dataItem;
				}
				this.calculatePrice();

			}
		})
	}

  calculateCredit(){
    this.totalCredit = this.totalPrice - parseInt(this.data.dp);

    localStorage.setItem("order-draft", JSON.stringify({
			...JSON.parse(localStorage.getItem("order-draft")!),
			totalCredit: this.totalCredit
		}));
  }

	calculatePrice(){
    if(this.data.ppnCheck && this.data.ppnStatus === 'BEFORE'){

      this.totalPrice = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount']==="Amount")? (acc + (((cur['qty'] * cur['price'])+((this.data.ppn/100) * (cur['qty'] * cur['price']))) - (cur['diskon']))):(acc + ((cur['qty'] * cur['price'] + ((this.data.ppn/100) * (cur['qty'] * cur['price']))) - ((cur['qty'] * cur['price'])*(cur['diskon']/100)))), 0);
    }else if(this.data.ppnCheck && this.data.ppnStatus === 'AFTER'){
      this.totalPrice = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount']==="Amount")? (acc + ((cur['qty'] * cur['price']) - (cur['diskon'])+((this.data.ppn/100) * ((cur['qty'] * cur['price'])-cur['diskon'])))): (acc + ((cur['qty'] * cur['price']) - ((cur['qty'] * cur['price'])*(cur['diskon']/100))+ (( (cur['qty'] * cur['price']) -( (cur['qty'] * cur['price']) * (cur['diskon']/100) ) ) * (this.data.ppn/100) )) ), 0);
    }else{
      this.totalPrice = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount']==="Amount")? (acc + ((cur['qty'] * cur['price']) - (cur['diskon']))):(acc + ((cur['qty'] * cur['price']) - ((cur['qty'] * cur['price'])*(cur['diskon']/100)))), 0);
    }
    this.calculateCredit();
		localStorage.setItem("order-draft", JSON.stringify({
			...JSON.parse(localStorage.getItem("order-draft")!),
			totalPrice: this.totalPrice
		}));
	}

	onDeleteOrder() {
		localStorage.removeItem("order-draft");
		this.dataItem = [];
		this.data.credit = 0;
		this.data.paymentMethod = "CASH";
		this.data.limitDate = '';
		this.data.dp = '';
		this.data.ppnCheck = false;
		this.data.ppn = 10;
		this.data.ppnStatus = 'BEFORE';
		this.data.customerId = '';
		this.data.customerName = '';

	}

	onRemoveItem(index:any){

		this.dataItem = this.dataItem.filter((m:any,i:number)=>i !== index);
		localStorage.setItem("order-draft", JSON.stringify({
			...JSON.parse(localStorage.getItem("order-draft")!),
			dataItem: this.dataItem
		}));
		this.calculatePrice();

	}

	onBarcode(){

		this.restApi.getItemById(this.scan).then((res:any)=>{
      console.log(res.data[0].total);

      if(res.data[0].total > 0){

        const dialogRef =this.dialog.open(DialogOrderQtyComponent,{
          data : {
            item : res.data[0]
          }
        });
        dialogRef.afterClosed().subscribe(res=>{
          if(res){
            if (JSON.parse(localStorage.getItem("order-draft")!) && JSON.parse(localStorage.getItem("order-draft")!).dataItem) {
              const dataItemLocal = { ...JSON.parse(localStorage.getItem("order-draft")!) }

              this.dataItem = dataItemLocal.dataItem;
            }
            this.calculatePrice();

          }
        })
      }else{
        this.snackbar.open("Stok produk tidak tersedia","",{
          duration:2000
        })
      }

		}).catch(err=>{
			console.log(err);

		})
	}

  onEditOrder(arr:any){
    const dialogRef = this.dialog.open(DialogUpdateQtyComponent,{
      data : arr
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        if (JSON.parse(localStorage.getItem("order-draft")!) && JSON.parse(localStorage.getItem("order-draft")!).dataItem) {
          const dataItemLocal = { ...JSON.parse(localStorage.getItem("order-draft")!) }

          this.dataItem = dataItemLocal.dataItem;
        }
        this.calculatePrice();
      }
    })
  }

  onStorage(){
    localStorage.setItem("order-draft", JSON.stringify({
			...JSON.parse(localStorage.getItem("order-draft")!),
			dataOrder: this.data
		}));
  }

  onOrder(){
    if(this.data.paymentMethod === "CASH"){
      this.data.credit = 0;
      this.data.limitDate = "";
      this.data.dp = "";
    }
    this.calculateCredit();
    if(!this.data.ppnCheck){
      this.data.ppnStatus = "";
      this.data.ppn = 0;
    }
    this.calculatePrice();
    if(this.data.paymentMethod === 'CASH'){
      const dialogRef = this.dialog.open(DialogPayComponent);
      dialogRef.afterClosed().subscribe(res=>{
        if(res){
          this.dataService.setLoading(true);

          localStorage.setItem("order-draft", JSON.stringify({
            ...JSON.parse(localStorage.getItem("order-draft")!),
            pay: res.nominal,
            cashback: res.kembali,
            dataOrder: this.data,
            totalPrice : this.totalPrice,
            totalCredit : this.totalCredit
          }));
          this.restApi.saveOrder({
            idCustomer : this.data.customerId,
            paymentMethod : this.data.paymentMethod,
            ppn : this.data.ppn,
            ppnStatus : this.data.ppnStatus,
            ppnCheck : this.data.ppnCheck,
            note : this.data.note,
            total : this.totalPrice,
            dataItem : this.dataItem,
            pay : res.nominal,
            cashback : res.kembali,
            userSales : this.dataUser.user
          }).then((res:any)=>{
            localStorage.setItem("order-draft", JSON.stringify({
              ...JSON.parse(localStorage.getItem("order-draft")!),
              idSales: res.idSales
            }));
            this.router.navigate(['/sales/end-page'])
          }).catch(err=>{
            console.log(err);

          })
        }
      })
    }else{
      if(!this.data.dp){
        this.data.dp = "0";
        this.calculatePrice();

      }
      this.dataService.dialogSuccess("Save Order","Simpan Transaksi dengan metode pembayaran kredit ? ");
      const dialogRef = this.dialog.open(DialogConfirmationComponent);
      dialogRef.afterClosed().subscribe(res=>{
        if(res){
          this.dataService.setLoading(true);
          this.restApi.saveOrder({
            idCustomer : this.data.customerId,
            paymentMethod : this.data.paymentMethod,
            note : this.data.note,
            limitDate : this.data.limitDate,
            dp : this.data.dp,
            credit : this.totalCredit,
            ppn : this.data.ppn,
            ppnStatus : this.data.ppnStatus,
            ppnCheck : this.data.ppnCheck,
            total : this.totalPrice,
            dataItem : this.dataItem,
            userSales : this.dataUser.user
          }).then((res:any)=>{
            let saldo;
            this.restApi.getCustomerById(this.data.customerId).then((res:any)=>{
              if(res){
                saldo = res.data.piutang | 0;
                let piutang = saldo + this.totalCredit;
                this.restApi.updateCustomer(this.data.customerId,{
                  piutang : piutang
                }).then((res)=>{
                  console.log(res);

                })
              }
            })
            localStorage.setItem("order-draft", JSON.stringify({
              ...JSON.parse(localStorage.getItem("order-draft")!),
              idSales: res.idSales
            }));
            this.router.navigate(['/sales/end-page'])
          }).catch(err=>{
            console.log(err);

          })
        }
      })

    }

  }

  getImage(path:string){
    if(path){
      return environment.urlImage+path;
    }
    else{
      return
    }
  }

}
