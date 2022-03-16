import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coa-edit',
  templateUrl: './coa-edit.component.html',
  styleUrls: ['./coa-edit.component.css']
})
export class CoaEditComponent implements OnInit {

  data={
    noCoa :'',
    description : ''
  }
  id="";
  constructor(
    private restApi : RestApiService,
    private location : Location,
    private snackbar : MatSnackBar,
    public dataService : DataService,
    private route : ActivatedRoute,
  ) {
    dataService.setLoading(false);
    dataService.setLoading(true);
    route.params.subscribe(res=>{
      this.id = res.id
    })
   }

  ngOnInit(): void {
    this.getCoaById();
  }

  getCoaById(){
    this.restApi.getCoaById(this.id).then((res:any)=>{
      this.data = res.data;
      this.dataService.setLoading(false)
    }).catch(err=>{
      console.log(err);
    })
  }

  back(){
    this.location.back();
  }

  onUpdateCoa(){
    if(this.data.noCoa && this.data.description ){
      this.dataService.setLoading(true);
      this.restApi.updateCoa(this.id,this.data).then((res:any)=>{
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
