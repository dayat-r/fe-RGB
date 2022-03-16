import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestApiService } from 'src/app/services/rest-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.css']
})
export class DialogPaymentComponent implements OnInit {
  nominal=0;
  remaining=0;
  note="";
  date="";
  credit=0;
  type="";
  id="";
  idPerson="";
  status=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restApi : RestApiService,
    private snackbar : MatSnackBar,
    private dialogRef : MatDialogRef<DialogPaymentComponent>,
    private dataService : DataService
  ) {
    this.credit = data.credit;
    this.type = data.type;
    this.id = data.id;
    this.idPerson = data.idPerson
    this.status = data.status;
  }

  ngOnInit(): void {
    this.calculate();
  }

  calculate(){
    this.remaining = this.credit - this.nominal;
  }
  onPayment(){
    if(this.nominal && this.date){
      this.dataService.setLoading(true);
      if(this.type ==='HUTANG'){
        this.restApi.paymentPurchase({
          id : this.id,
          type : this.type,
          sumCredit : this.credit,
          nextDate : this.date,
          amount : this.nominal,
          remainingCredit : this.remaining,
          note : this.note,
          idSupplier : this.idPerson,
          status : this.status

        }).then((res:any)=>{
          this.snackbar.open("Hutang berhasil dibayarkan","",{
            duration:2000
          });
          this.dialogRef.close(true);
        }).catch(err=>{
          console.log(err);

        })
      }else{
        this.restApi.paymentSales({
          id : this.id,
          type : this.type,
          nextDate : this.date,
          sumCredit : this.credit,
          amount : this.nominal,
          remainingCredit : this.remaining,
          note : this.note,
          idCustomer: this.idPerson,
          status : this.status


        }).then((res:any)=>{
          this.snackbar.open("Piutang berhasil dibayarkan","",{
            duration:2000
          });
          this.dialogRef.close(true);
        }).catch(err=>{
          console.log(err);

        })
      }
    }else{
      this.snackbar.open("Lengkapi data terlebih dahulu","",{
        duration:2000
      });
    }
  }

}
