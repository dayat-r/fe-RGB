import { DialogPayComponent } from './../../../components/dialog/dialog-pay/dialog-pay.component';
import { DatePipe, Location } from '@angular/common';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from '../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DataService } from 'src/app/services/data.service';
import { DialogOrderQtyComponent } from 'src/app/components/dialog/dialog-order-qty/dialog-order-qty.component';
import { DialogProductComponent } from 'src/app/components/dialog/dialog-product/dialog-product.component';
import { DialogCustomerComponent } from 'src/app/components/dialog/dialog-customer/dialog-customer.component';
import { DialogUpdateQtyComponent } from 'src/app/components/dialog/dialog-update-qty/dialog-update-qty.component';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.css'],
  providers: [DatePipe]
})
export class SalesEditComponent implements OnInit {
  companyName = "Sion Glass ";
  branchAddress = "Jl. Kp. Nias V No.18.A, Belakang Pd., Kec. Padang Sel., Kota Padang, Sumatera Barat 25134";
  telpCompany = "0852-6329-7411";
  data = {
    credit: 0,
    paymentMethod: 'CASH',
    limitDate: '',
    dp: 0,
    ppn: 0,
    ppnStatus: 'BEFORE',
    ppnCheck: false,
    customerId: '',
    customerName: '',
    note: '',
    pay: 0,
    cashback: 0,
    date: '',
    userSales: '',
    userName: '',
    customerAddress: '',
    total:0
  }

  dataItem: any = [];
  totalPrice = 0;
  totalCredit = 0;
  idSales = "";
  totalDiskon = 0;
  dpp=0;
  constructor(
    private dialog: MatDialog,
    private restApi: RestApiService,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private dataService: DataService,
    private datePipe: DatePipe,
    private location: Location

  ) {
    route.params.subscribe(res => {
      this.idSales = res.id;
    })
  }



  ngOnInit(): void {
    this.getSalesDetail();
  }

  back() {
    this.location.back();
  }

  getSalesDetail() {
    this.restApi.getSalesDetail(this.idSales)
      .then((res: any) => {
        this.data = res.sales;
        let dataItemLoop = res.order;
        dataItemLoop.map((res: any) => {
          this.dataItem.push({
            barcode: res.barcode,
            description: res.description,
            merkMobil: res.merkMobil,
            tipeMobil: res.tipeMobil,
            price: res.price,
            path: res.path,
            diskon: res.diskon,
            location: res.location,
            qty: res.qty,
            typeDiscount: res.typeDiscount
          })
          if (res.typeDiscount === "Persentage") {
            this.totalDiskon = this.totalDiskon + ((res.diskon / 100) * (res.qty * res.price));
          } else {
            this.totalDiskon = this.totalDiskon + (res.diskon);
          }
        })
        this.totalCredit = res.sales.credit | 0;
        this.calculatePrice()
        this.dataService.setLoading(false);

      }).catch(err => {
        console.log(err);

      })
  }

  getImage(path: string) {
    if (path) {
      return environment.urlImage + path;
    }
    else {
      return
    }
  }

  onOpenDialogCustomer() {
    const dialogRef = this.dialog.open(DialogCustomerComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.data.customerId = res.id,
          this.data.customerName = res.name
        // this.onStorage();
      }
    })
  }

  onOpenDialogItem() {
    const dialogRef = this.dialog.open(DialogProductComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (JSON.parse(localStorage.getItem("order-draft")!) && JSON.parse(localStorage.getItem("order-draft")!).dataItem) {
          const dataItemLocal = { ...JSON.parse(localStorage.getItem("order-draft")!) }

          this.dataItem = dataItemLocal.dataItem;
        }
        this.calculatePrice();

      }
    })
  }

  calculateCredit() {
    this.totalCredit = this.totalPrice - this.data.dp;

    this.data.credit = this.totalCredit;
  }

  calculatePrice() {
    if (this.data.ppnCheck && this.data.ppnStatus === 'BEFORE') {

      this.totalPrice = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount'] === "Amount") ? (acc + ((cur['qty'] * cur['price']) + ((this.data.ppn / 100) * (cur['qty'] * cur['price'])) - (cur['diskon']))) : (acc + ((cur['qty'] * cur['price'] + ((this.data.ppn / 100) * (cur['qty'] * cur['price']))) - ((cur['qty'] * cur['price']) * (cur['diskon'] / 100)))), 0);
      this.dpp = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount'] === "Amount") ? (acc + ((cur['qty'] * cur['price']) - (cur['diskon']))) : (acc + (cur['qty'] * cur['price']  - ((cur['qty'] * cur['price']) * (cur['diskon'] / 100)))), 0);
    } else if (this.data.ppnCheck && this.data.ppnStatus === 'AFTER') {
      this.totalPrice = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount'] === "Amount") ? (acc + ((cur['qty'] * cur['price']) - (cur['diskon']) + ((this.data.ppn / 100) * ((cur['qty'] * cur['price']) - cur['diskon'])))) : (acc + ((cur['qty'] * cur['price']) - ((cur['qty'] * cur['price']) * (cur['diskon'] / 100)) + ((this.data.ppn / 100) * ((cur['qty'] * cur['price']) - cur['diskon'] / 100)))), 0);
      this.dpp = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount'] === "Amount") ? (acc + ((cur['qty'] * cur['price']) - (cur['diskon']) )) : (acc + (cur['qty'] * cur['price']) - ((cur['qty'] * cur['price']) * (cur['diskon'] / 100)) ), 0);
      this.dpp = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount'] === "Amount") ? (acc + ((cur['qty'] * cur['price']) - (cur['diskon']) )) : (acc + (cur['qty'] * cur['price']) - ((cur['qty'] * cur['price']) * (cur['diskon'] / 100)) ), 0);
    } else {
      this.totalPrice = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount'] === "Amount") ? (acc + ((cur['qty'] * cur['price']) - (cur['diskon']))) : (acc + ((cur['qty'] * cur['price']) - ((cur['qty'] * cur['price']) * (cur['diskon'] / 100)))), 0);
      this.dpp = this.dataItem.reduce((acc: any, cur: any) => (cur['typeDiscount'] === "Amount") ? (acc + ((cur['qty'] * cur['price']) - (cur['diskon']))) : (acc + ((cur['qty'] * cur['price']) - ((cur['qty'] * cur['price']) * (cur['diskon'] / 100)))), 0);
    }
    this.calculateCredit();

    this.data.total = this.totalPrice;
  }

  onDeleteOrder() {
    localStorage.removeItem("order-draft");
    this.dataItem = [];
    this.data.credit = 0;
    this.data.paymentMethod = "CASH";
    this.data.limitDate = '';
    this.data.dp = 0;
    // this.data.ppnCheck = false;
    this.data.ppn = 10;
    this.data.ppnStatus = 'BEFORE';
    this.data.customerId = '';
    this.data.customerName = '';

  }

  onRemoveItem(index: any) {

    this.dataItem = this.dataItem.filter((m: any, i: number) => i !== index);

    localStorage.setItem("order-draft", JSON.stringify({
      ...JSON.parse(localStorage.getItem("order-draft")!),
      dataItem: this.dataItem
    }));
    this.calculatePrice();

  }

  onEditOrder(arr: any) {
    const dialogRef = this.dialog.open(DialogUpdateQtyComponent, {
      data: arr
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (JSON.parse(localStorage.getItem("order-draft")!) && JSON.parse(localStorage.getItem("order-draft")!).dataItem) {
          const dataItemLocal = { ...JSON.parse(localStorage.getItem("order-draft")!) }

          this.dataItem = dataItemLocal.dataItem;
        }
        this.calculatePrice();
      }
    })
  }

  async updateOrder() {
    if(this.data.total>0){

      try {
        const updateData = { ...this.data, dataItem: this.dataItem }

        this.dataService.setLoading(true);
        const updateSales = await this.restApi.updateSalesDetail(this.idSales, updateData);
        if (updateSales) {
          this.dataService.setLoading(false);
          this.snackbar.open("Order update successfuly", "", {
            duration: 2000
          });
          this.router.navigate(['/sales']);
        }
      } catch (error: any) {
        this.dataService.setLoading(false);
        console.log(error.message)
      }
    }else{
      this.snackbar.open("Nominal pembayaran tidak mencukupi","",{
        duration:2000
      });
    }
  }

  dialogPay(){
    const dialogRef = this.dialog.open(DialogPayComponent,{
      data : {
        total : this.data.total
      }
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.data.pay = res.nominal;
        this.data.cashback = res.nominal -this.data.total ;
      }
    })
  }

}
