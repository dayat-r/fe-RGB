import { DialogAddCoaComponent } from './../../../components/dialog/dialog-add-coa/dialog-add-coa.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cost-add',
  templateUrl: './cost-add.component.html',
  styleUrls: ['./cost-add.component.css']
})
export class CostAddComponent implements OnInit {
  data={
    amount : '',
    date : '',
    description : '',
    noCoa:0
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

  getCoa(){
    this.restApi.getCoaByNo(5000).then((res:any)=>{
      this.dataCoa = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

  back(){
    this.location.back();
  }

  onSaveCost(){
    if( this.data.amount && this.data.date  && this.data.noCoa){
      this.dataService.setLoading(true);
      this.restApi.saveCost(this.data).then((res:any)=>{
        if(res){
          this.snackbar.open("Cost add successfuly","",{
            duration:2000
          });
          this.back();
        }else{
          this.snackbar.open("failed","",{
            duration:2000
          });
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
      data: this.dataCoa[0]?.noCoa | 5000
    });
    dialogRef.afterClosed().subscribe(res=>{

      if(res){
        this.data.noCoa = res.noCoa;
        this.getCoa();
      }
    })

  }

}
