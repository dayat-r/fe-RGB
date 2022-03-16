import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-order-qty',
	templateUrl: './dialog-order-qty.component.html',
	styleUrls: ['./dialog-order-qty.component.css']
})
export class DialogOrderQtyComponent implements OnInit {

	data = {
		barcode : '',
		description:'',
		tipeMobil:'',
		merkMobil:'',
		location: '',
		qty: 1,
		price: '',
		diskon: '',
    path:'',
		typeDiscount: "Amount"
	}

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
    private dataService : DataService,
    public dialogRef: MatDialogRef<DialogOrderQtyComponent>,
	) {
    dataService.setLoading(true);
    if (JSON.parse(localStorage.getItem("order-draft")!) && JSON.parse(localStorage.getItem("order-draft")!).dataItem) {
			this.dataItem = this.getDataLocalStorage("order-draft").dataItem;

		}
	}

	async ngOnInit(){
    this.data.barcode = this.data2.item.barcode;
    this.data.description = this.data2.item.description;
    this.data.tipeMobil = this.data2.item.tipeMobil;
    this.data.merkMobil = this.data2.item.merkMobil;
    this.data.price = this.data2.item.price;
    this.data.path = this.data2.item.path;
		await this.getLocation();
	}

	getLocation() {
		this.restApi.getActualStockByBarcode(this.data.barcode).then((res: any) => {
			this.dataLocation = res.data;
      this.dataService.setLoading(false);
		}).catch(err => {
			console.log(err);

		});
	}

	calculate() {
    const harga = parseInt(this.data.price) * this.data.qty;
      if (this.data.typeDiscount === "Amount") {
        this.totalPrice = harga - parseInt(this.data.diskon)
      } else {
        this.totalPrice = harga - (harga * (parseInt(this.data.diskon) / 100));
      }
	}

	matSelectChange() {
		this.data.diskon = "0";
		this.calculate();
	}


	onOrder() {
		if(this.dataItem && !this.status.qty ){
			this.dataItem.map(async(res:any,index:any)=>{
				if(this.data.location === res.location && this.data.barcode === res.barcode ){
          this.dataItem = this.dataItem.filter((m:any,i:any)=>i!=index);
				}
			});

      this.dataItem.push(this.data);

      localStorage.setItem("order-draft", JSON.stringify({
        ...JSON.parse(localStorage.getItem("order-draft")!),
      dataItem: this.dataItem
      }));
      this.dialogRef.close(true);
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
		if(this.data.qty>this.maxQty){
			this.status.qty = true;
		}else{
			this.status.qty = false;
		}
    this.calculate();
	}

	cekPrice(){
		if(parseInt(this.data.price)<this.priceUnit){
			this.status.price = true;
		}else{
			this.status.price = false;
		}
		this.calculate()
	}



}
