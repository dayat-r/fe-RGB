import { DialogAddCoaComponent } from './../../../components/dialog/dialog-add-coa/dialog-add-coa.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-income-add',
  templateUrl: './income-add.component.html',
  styleUrls: ['./income-add.component.css']
})
export class IncomeAddComponent implements OnInit {
  data={
    noCoa :0,
    amount : '',
    date : '',
    description : ''
  }
  dataCoa:any;
  constructor(
    private restApi : RestApiService,
    private location : Location,
    private snackbar : MatSnackBar,
    public dataService : DataService,
    private dialog : MatDialog
  ) {
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    this.getCoa();
  }

  back(){
    this.location.back();
  }

  onSaveIncome(){
    if(this.data.noCoa && this.data.amount && this.data.date ){
      this.dataService.setLoading(true);
      this.restApi.saveIncome(this.data).then((res:any)=>{
        if(res){
          this.snackbar.open("Income add successfuly","",{
            duration:2000
          });
          this.back();
        }else{
          this.snackbar.open("failed","",{
            duration:2000
          });
          this.dataService.setLoading(false);
        }
      }).catch(err=>{
        console.log(err);

      });
    }else{
      this.snackbar.open("Data not complete","",{
        duration:2000
      });
    }
  }

  onOpenDialogAddCoa(){
    const dialogRef = this.dialog.open(DialogAddCoaComponent,{
      data: this.dataCoa[0]?.noCoa | 4000
    });
    dialogRef.afterClosed().subscribe(res=>{

      if(res){
        this.data.noCoa = res.noCoa;
        this.getCoa();
      }
    })

  }

  getCoa(){
    this.restApi.getCoaByNo(4000).then((res:any)=>{
      this.dataCoa = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

}
