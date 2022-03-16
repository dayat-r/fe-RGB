import { DialogAddSupplierComponent } from './../dialog-add-supplier/dialog-add-supplier.component';
import { DataService } from './../../../services/data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-supplier',
  templateUrl: './dialog-supplier.component.html',
  styleUrls: ['./dialog-supplier.component.css']
})
export class DialogSupplierComponent implements OnInit {
  dataSupplier:any;
  cari='';
  arrSkeleton=[1,2,3,4,5,6,7]
  constructor(
    private restApi : RestApiService,
    private dialogRef : MatDialogRef<DialogSupplierComponent>,
    public dataService : DataService,
    private dialog : MatDialog
  ) {
    dataService.setLoading(false);
    dataService.setSkeleton(true);
   }

  ngOnInit(): void {
    this.getSupplier();
  }

  search(){
    this.dataService.setSkeleton(true);
    this.getSupplier();
  }

  resetSearch(){
    this.dataService.setSkeleton(true);
    this.cari = "";
    this.getSupplier();
  }

  getSupplier(){
    this.restApi.getSupplier(this.cari).then((res:any)=>{
      this.dataSupplier = res.data;
      this.dataService.setSkeleton(false);

    }).catch(err=>{
      console.log(err);

    })
  }

  onSelect(id:string, name : string){
    this.dialogRef.close({
      id : id,
      name : name
    })
  }

  dialogAddSupplier(){
    const dialogRef1 = this.dialog.open(DialogAddSupplierComponent);
    dialogRef1.afterClosed().subscribe(res=>{
      if(res){
        this.dialogRef.close({
          id : res.id,
          name : res.name
        });
      }
    })
  }
}
