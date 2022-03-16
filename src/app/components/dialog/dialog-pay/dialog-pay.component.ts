import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-pay',
  templateUrl: './dialog-pay.component.html',
  styleUrls: ['./dialog-pay.component.css']
})
export class DialogPayComponent implements OnInit {
  nominal='';
  kembali=0;
  totalPrice=0;
  errorNominal=false;
  constructor(
    private dialogRef : MatDialogRef<DialogPayComponent>,
    public router : Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.totalPrice = JSON.parse(localStorage.getItem("order-draft")!).totalPrice
    this.calculate();

  }

  onPay(){
    if(this.kembali>=0){

      this.dialogRef.close({
        nominal : this.nominal,
        kembali : this.kembali
      });
    }else if (this.router.url !== '/sales/new-order' && this.nominal >= this.data.total){
      this.dialogRef.close({
        nominal : this.nominal
      });
    }else{
      this.errorNominal = true;
    }
  }

  calculate(){
    this.kembali = parseInt(this.nominal) -  this.totalPrice ;
    if(this.kembali>=0){
      this.errorNominal = false;
    }
  }

}
