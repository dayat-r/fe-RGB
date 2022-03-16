import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-add-coa',
  templateUrl: './dialog-add-coa.component.html',
  styleUrls: ['./dialog-add-coa.component.css']
})
export class DialogAddCoaComponent implements OnInit {
  data ={
    description:''
  }
  constructor(
    private restApi : RestApiService,
    private dialogRef : MatDialogRef<DialogAddCoaComponent>,
    private snackbar : MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataCoa: any,
    private dataService : DataService
  ) {

  }

  ngOnInit(): void {
  }

  onSaveCoa(){
    if(this.dataCoa && this.data.description ){
      this.dataService.setLoading(true);
      this.restApi.saveCoa({
        noCoa : this.dataCoa+1,
        description : this.data.description
      }).then((res:any)=>{
        if(res){
          this.snackbar.open("Coa add successfuly","",{
            duration:2000
          });
          this.dialogRef.close({
            noCoa : this.dataCoa+1,
          });
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
