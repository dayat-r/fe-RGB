import { DialogAddCoaComponent } from './../../../components/dialog/dialog-add-coa/dialog-add-coa.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-income-edit',
  templateUrl: './income-edit.component.html',
  styleUrls: ['./income-edit.component.css']
})
export class IncomeEditComponent implements OnInit {
  data={
    noCoa :0,
    amount : '',
    date : '',
    description : ''
  }
  id="";
  dataCoa:any;
  constructor(
    private restApi : RestApiService,
    private location : Location,
    private snackbar : MatSnackBar,
    private route : ActivatedRoute,
    public dataService : DataService,
    private dialog : MatDialog
  ) {
    route.params.subscribe(res=>{
      this.id = res.id
    })
    dataService.setLoading(true);
    this.getCoa();
  }

  ngOnInit(): void {

    this.getIncomeById();
  }

  back(){
    this.location.back();
  }

  getIncomeById(){
    this.restApi.getIncomeById(this.id).then((res:any)=>{
      this.data = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);
    })
  }

  onUpdateIncome(){
    if(this.data.noCoa && this.data.amount && this.data.date ){
      this.dataService.setLoading(true);
      this.restApi.updateIncome(this.id,this.data).then((res:any)=>{
        if(res){
          this.snackbar.open("Income update successfuly","",{
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
