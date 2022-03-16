import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { RestApiService } from './../../../services/rest-api.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dialog-add-supplier',
  templateUrl: './dialog-add-supplier.component.html',
  styleUrls: ['./dialog-add-supplier.component.css']
})
export class DialogAddSupplierComponent implements OnInit {

  data={
    name:'',
    address:'',
    telp:'',
  }
  constructor(
    private restApi : RestApiService,
    private dialogRef : MatDialogRef<DialogAddSupplierComponent>,
    private snackbar : MatSnackBar,
    private dataService : DataService

  ) { }

  ngOnInit(): void {
  }

  onSaveSupplier(){
    if(this.data.name ){
      this.dataService.setLoading(true);
      this.restApi.saveSupplier(this.data).then((res:any)=>{
        this.dialogRef.close({
          id : res.data.idSupplier,
          name : res.data.name
        })
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.snackbar.open("Lengkapi data nama terlebih dahulu","",{
        duration: 2000
      })
    }
  }

}
