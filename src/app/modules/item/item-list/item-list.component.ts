import { DialogInformationComponent } from './../../../components/dialog/dialog-information/dialog-information.component';
import decode from 'jwt-decode';
import { DialogAddProductComponent } from './../../../components/dialog/dialog-add-product/dialog-add-product.component';
import { environment } from './../../../../environments/environment';
import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestApiService } from 'src/app/services/rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

@Component({
	selector: 'app-item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
	cari = "";
  dataSource: any = [];
	dataItem: any;
	dataMerk: any;
	merk: any = [];
  role="";
  skeletonArr= [1,2,3,4];
	constructor(
		private restApi: RestApiService,
		private dialog: MatDialog,
		public dataService: DataService,
		private snackbar: MatSnackBar,
		private router: Router
	) {
    dataService.setLoading(false);
    dataService.setSkeleton(true);
   }

	async ngOnInit() {
    if(localStorage.getItem('filter')){
      this.merk = await JSON.parse(localStorage.getItem('filter')!) ;


    }
    if(this.dataService.findPlace === 'ITEM' && localStorage.getItem('cari')){
      this.cari = await localStorage.getItem('cari')!;
    }else{
      localStorage.setItem('cari','');
    }
    const storage:any = await  decode(localStorage.getItem('token-sion')!);
    this.role = await storage.role;
		this.getMerk();
		this.getItem();
	}

  checkTrue(name:string){
    let cek = false;
    for(let i=0;i<this.merk.length;i++){
      // console.log(this.merk[i]);

      if(this.merk[i] === name){
        cek = true;
      }
    }
    return cek;
  }

  search(){
    this.dataService.setSkeleton(true);
    this.getItem();
  }

  resetSearch(){
    this.dataService.setSkeleton(true);
    this.cari="";
    localStorage.setItem('cari',"");
    this.dataService.setFindPlace('');
    this.getItem();
  }

	onFilter(event:any,name: string) {
		if(event){
			this.merk.push(name);
			localStorage.setItem("filter",JSON.stringify(this.merk));
		}else{
			this.merk = this.merk.filter((m:any)=>m!=name);
			localStorage.setItem("filter",JSON.stringify(this.merk));
		}
		this.getItem();

	}

	onResetFilter(){
		localStorage.setItem("filter","");
		this.merk = [];
    this.getMerk();
		this.getItem();
	}

	getItem() {
    if(this.cari){
      localStorage.setItem('cari',this.cari);
      this.dataService.setFindPlace('ITEM');
    }
    this.dataSource = new MyDataSource(this.restApi, this.dataService, this.dialog, this.cari, this.merk);

	}

	onDelete(id: any) {
		this.dataService.dialogSuccess("Delete Item", "Yakin akan menghapus data ?");
		const dialogRef = this.dialog.open(DialogConfirmationComponent);
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
        this.dataService.setSkeleton(true);
				this.restApi.deleteItem(id).then((res: any) => {
					if (res) {
						this.snackbar.open("Item deleted successfuly", "", {
							duration: 2000
						});
						this.getItem();
					} else {
						this.snackbar.open("Item fail deleted", "", {
							duration: 2000
						});
					}
				}).catch(err => {
					console.log(err);

				});
			}
		});
	}

	getMerk() {
		this.restApi.getMerk("").then((res: any) => {
			this.dataMerk = res.data;

		}).catch(err => {
			console.log(err);

		});
	}

	getImageItem(path: string) {
		if (path && path !== '0' && path !== '\N') {
			return environment.urlImage + path;

		} else {
			return '';
		}
	}



	toDetail(id: string) {
		this.router.navigate(['item/detail/' + id]);
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
      private merk: any
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
          merk: this.merk,
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
