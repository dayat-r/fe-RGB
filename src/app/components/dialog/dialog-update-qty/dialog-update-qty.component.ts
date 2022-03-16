import { DataService } from 'src/app/services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-update-qty',
  templateUrl: './dialog-update-qty.component.html',
  styleUrls: ['./dialog-update-qty.component.css']
})
export class DialogUpdateQtyComponent implements OnInit {
  barcode = '';
  description='';
  tipeMobil='';
  merkMobil='';
  location= '';
  qty= 1;
  price= '';
  diskon= '';
  path='';
  typeDiscount= "Amount";

	status = {
		qty : false,
		price:false
	}

	dataLocation: any;

	dataItem:any=[];
	totalPrice = 0
	maxQty=0;
	priceUnit=0;
	scan="";
	constructor(
		private restApi: RestApiService,
		@Inject(MAT_DIALOG_DATA) public data2: any,
    private dataService : DataService
	) {
    if (JSON.parse(localStorage.getItem("order-draft")!) && JSON.parse(localStorage.getItem("order-draft")!).dataItem) {
			this.dataItem = this.getDataLocalStorage("order-draft").dataItem;

		}
	}

	async ngOnInit(){
    this.barcode = this.data2.barcode;
    this.description = this.data2.description;
    this.tipeMobil = this.data2.tipeMobil;
    this.merkMobil = this.data2.merkMobil;
    this.location = this.data2.location;
    this.qty = this.data2.qty;
    this.price = this.data2.price;
    this.diskon = this.data2.diskon;
    this.path = this.data2.path;
    this.typeDiscount = this.data2.typeDiscount;
    this.calculate();
		await this.getLocation();
	}

	getLocation() {
		this.restApi.getActualStockByBarcode(this.barcode).then((res: any) => {
			this.dataLocation = res.data;
      this.dataLocation.map((res:any)=>{
        if(this.location === res.locCode){
          this.priceUnit = res.priceUnit
          this.maxQty = res.qty
        }
      });
      this.dataService.setLoading(false);

		}).catch(err => {
			console.log(err);

		});
	}

	calculate() {
    const harga = parseInt(this.price) * this.qty;
      if (this.typeDiscount === "Amount") {
        this.totalPrice = harga - parseInt(this.diskon)
      } else {
        this.totalPrice = harga - (harga * (parseInt(this.diskon) / 100));
      }
	}

	matSelectChange() {
		this.diskon = "0";
		this.calculate();
	}


	onOrder() {
		if(this.dataItem && !this.status.qty && !this.status.price){
			this.dataItem.map(async(res:any,index:any)=>{
				if(this.location === res.location && this.barcode === res.barcode ){
          this.dataItem = this.dataItem.filter((m:any,i:any)=>i!=index);
				}
			});

      this.dataItem.push({
        barcode : this.barcode,
        description:this.description,
        tipeMobil:this.tipeMobil,
        merkMobil:this.merkMobil,
        location: this.location,
        qty: this.qty,
        price: this.price,
        diskon: this.diskon,
        path:this.path,
        typeDiscount: this.typeDiscount,
      });

      localStorage.setItem("order-draft", JSON.stringify({
        ...JSON.parse(localStorage.getItem("order-draft")!),
      dataItem: this.dataItem
      }));




		}




	}

    getDataLocalStorage(key: string) {
        return JSON.parse(localStorage.getItem(key)!);
    }

	setMaxQty(qty:any,price:any){
		this.priceUnit = price
		this.maxQty = qty;
		this.cekInputQty();
    this.cekPrice();
	}
	cekInputQty(){
		if(this.qty>this.maxQty){
			this.status.qty = true;
		}else{
			this.status.qty = false;
		}
    this.calculate();

	}

	cekPrice(){
		if(parseInt(this.price)<this.priceUnit){
			this.status.price = true;
		}else{
			this.status.price = false;
		}
		this.calculate()

	}

}
