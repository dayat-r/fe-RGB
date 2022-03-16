import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DialogInformationComponent } from './../dialog-information/dialog-information.component';
import { DataService } from 'src/app/services/data.service';
import { DialogOrderQtyComponent } from './../dialog-order-qty/dialog-order-qty.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from './../../../../environments/environment';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.css']
})
export class DialogProductComponent implements OnInit {
  cari="";
  dataItem:any;
  dataSource: any = [];

  math = Math.round;
  constructor(
    private restApi : RestApiService,
    private dialogRef : MatDialogRef<DialogProductComponent>,
    private dialog : MatDialog,
    private snackbar : MatSnackBar,
    private router : Router,
    private dataService : DataService
  ) {
    dataService.setLoading(true);
   }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(){
    this.dataSource = new MyDataSource(this.restApi, this.dataService, this.dialog, this.cari);
    // this.restApi.getItem(this.cari,"").then((res:any)=>{
    //   this.dataItem = res.data;
    //   this.dataService.setLoading(false);
    // }).catch(err=>{
    //   console.log(err);

    // })
  }

  getImage(path:string){
    if(path){
      return environment.urlImage+path;
    }
    else{
      return
    }
  }

  onSelectItem(data:any){
    if(this.router.url === '/report/item-sales-report'){
      this.dialogRef.close({
        data : data
      });
    }else if (this.router.url === '/item/tranfer-item'){
      this.dialogRef.close({
        data : data
      });
    }else{
      if(data.total > 0){
        const dialogAff = this.dialog.open(DialogOrderQtyComponent,{
          data : {
            item : data
          },

        });

        dialogAff.afterClosed().subscribe(res=>{
          if(res){
            this.dialogRef.close(true);
          }
        })
      }else{
        this.snackbar.open("Stok produk tidak tersedia","",{
          duration:2000
        })
      }
    }


  }

}

export class MyDataSource extends DataSource<any | undefined> {
  private cachedData = Array.from<any>({ length: 0 });
  private dataStream = new BehaviorSubject<(any | undefined)[]>(this.cachedData);
  private subscription = new Subscription();
  private pageSize = 20;
  private lastPage = 0;
  private jml_data: number = 0;
  private lastId: number = 0;

  constructor(
      private rest: RestApiService,
      public dataService: DataService,
      private dialog: MatDialog,
      private cari: string,
  ) {
      super();
      this.dataService.setLoading(true)
      this._fectDataPage();
  }



  connect(collectionViewer: CollectionViewer): Observable<(any | undefined)[]> {

      this.subscription.add(collectionViewer.viewChange.subscribe(range => {
          const currentPage = this._getPageForIndex(range.end);

          if (currentPage > this.lastPage) {
              if (this.jml_data >= this.pageSize) {
                  this.lastPage = currentPage;
                  console.log(this.cachedData);

                  this.lastId = Number(this.cachedData[this.cachedData.length - 1].rownumber);
                  this.dataService.setLoading(true);
                  this._fectDataPage();
              }
          }

      }));

      return this.dataStream;
  }

  disconnect() {
      this.subscription.unsubscribe();
  }

  private _fectDataPage(): void {
      let param = {
          lastId: this.lastId,
          cari: this.cari,
          merk:[]
      }

      this.rest.getItem(param)
          .then((data: any) => {
              this.jml_data = data.data.length;
              this.cachedData = [...this.cachedData, ...data.data];
              this.dataStream.next(this.cachedData);
              this.dataService.setLoading(false);
          })
          .catch((err: any) => {
            console.log(err);

              this.dataService.dialogSuccess( 'Something is wrong!',`Can't show List Order, Please contact admin!`);
              this.dialog.open(DialogInformationComponent);
              this.dataService.setLoading(false)

          });
  }

  private _getPageForIndex(i: number): number {
      return Math.floor(i / this.pageSize);
  }
}
