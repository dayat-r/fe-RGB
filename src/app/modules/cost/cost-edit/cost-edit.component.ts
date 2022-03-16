import { DialogAddCoaComponent } from './../../../components/dialog/dialog-add-coa/dialog-add-coa.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cost-edit',
  templateUrl: './cost-edit.component.html',
  styleUrls: ['./cost-edit.component.css']
})
export class CostEditComponent implements OnInit {

  data={
    amount : '',
    date : '',
    description : '',
    noCoa:''
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
    dataService.setLoading(true);
    route.params.subscribe(res=>{
      this.id = res.id
    })
  }

  ngOnInit(): void {
    this.getCoa();
    this.getCostById();
  }

  back(){
    this.location.back();
  }

  getCostById(){
    this.restApi.getCostById(this.id).then((res:any)=>{
      this.data = res.data;
      this.dataService.setLoading(false)
    }).catch(err=>{
      console.log(err);
    })
  }

  onUpdateCost(){
    if(this.data.noCoa && this.data.amount && this.data.date ){
      this.restApi.updateCost(this.id,this.data).then((res:any)=>{
        if(res){
          this.snackbar.open("Cost update successfuly","",{
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

  getCoa(){
    this.restApi.getCoaByNo(5000).then((res:any)=>{
      this.dataCoa = res.data;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
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
