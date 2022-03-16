import { DialogAddMerkComponent } from './../dialog-add-merk/dialog-add-merk.component';
import { DataService } from './../../../services/data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-merk',
  templateUrl: './dialog-merk.component.html',
  styleUrls: ['./dialog-merk.component.css']
})
export class DialogMerkComponent implements OnInit {

  dataMerk:any;
  cari='';
  arrSkeleton=[1,2,3,4,5,6,7]
  constructor(
    private restApi : RestApiService,
    private dialogRef : MatDialogRef<DialogMerkComponent>,
    public dataService : DataService,
    private dialog : MatDialog
  ) {
    this.dataService.setLoading(false);
    this.dataService.setSkeleton(true);
   }

  ngOnInit(): void {
    this.getMerk();
  }

  resetSearch(){
    this.dataService.setSkeleton(true);
    this.cari = "";
    this.getMerk();
  }
  search(){
    this.dataService.setSkeleton(true);
    this.getMerk();
  }

  getMerk(){
    this.restApi.getMerk(this.cari).then((res:any)=>{
      this.dataMerk = res.data;
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

  dialogAddMerk(){
    const dialogRef1 = this.dialog.open(DialogAddMerkComponent);
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
