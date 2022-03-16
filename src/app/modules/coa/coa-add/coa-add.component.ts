import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coa-add',
  templateUrl: './coa-add.component.html',
  styleUrls: ['./coa-add.component.css']
})
export class CoaAddComponent implements OnInit {

  data={
    noCoa :'',
    description : ''
  }
  constructor(
    private restApi : RestApiService,
    private location : Location,
    private snackbar : MatSnackBar,
    public dataService : DataService
  ) {
    dataService.setLoading(false);
   }

  ngOnInit(): void {
  }

  back(){
    this.location.back();
  }

  onSaveCoa(){
    if(this.data.noCoa && this.data.description ){
      this.dataService.setLoading(true);
      this.restApi.saveCoa(this.data).then((res:any)=>{
        if(res){
          this.snackbar.open("Coa add successfuly","",{
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

}
