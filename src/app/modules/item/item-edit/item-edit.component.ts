import { environment } from './../../../../environments/environment';
import { DialogCropImageComponent } from './../../../components/dialog/dialog-crop-image/dialog-crop-image.component';
import { DataService } from './../../../services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogSupplierComponent } from 'src/app/components/dialog/dialog-supplier/dialog-supplier.component';
import { DialogMerkComponent } from 'src/app/components/dialog/dialog-merk/dialog-merk.component';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  data = {
		// idSupplier: '',
    // namaSupplier: '',
		merkMobil: '',
    namaMerkMobil: '',
		tipeMobil: '',
		description: '',
		description2: '',
		merk: '',
		price: '',
	}
  dataSupplier:any;
  dataMerk:any;
  barcode="";

  image:any;
  imagePre:any;
	constructor(
		private restApi: RestApiService,
    private location : Location,
    private snackbar : MatSnackBar,
    private router : Router,
    private dialog : MatDialog,
    public dataService : DataService,
    private route : ActivatedRoute
	) {
    route.params.subscribe(res=>{
      this.barcode = res.id;
    })
    dataService.setLoading(true);
   }

	ngOnInit(): void {
    this.getSupplier();
    this.getMerk();
    this.getProductById();
	}

  getProductById(){
    this.restApi.getItemById(this.barcode).then((res:any)=>{
      this.data = res.data[0];
      this.imagePre = environment.urlImage+res.data[0].path;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    });
  }

  back(){
    this.location.back();
  }

  getSupplier(){
    this.restApi.getSupplier("").then((res:any)=>{
      this.dataSupplier = res.data;
    }).catch(err=>{
      console.log(err);

    });
  }

	onUpdateProduct() {
		if(this.barcode && this.data.merkMobil && this.data.tipeMobil && this.data.description){
      this.dataService.setLoading(true);
      const formData = new FormData();
      if(this.image){
        formData.append('image',this.image);
        formData.append('path',`uploads/item/${this.barcode}.jpg`);

      }
      // formData.append('idSupplier',this.data.idSupplier)
      formData.append('merkMobil',this.data.merkMobil)
      formData.append('tipeMobil',this.data.tipeMobil)
      formData.append('description',this.data.description)
      formData.append('description2',this.data.description2)
      formData.append('merk',this.data.merk)
      formData.append('price',this.data.price)

      this.restApi.updateItem(this.barcode,formData).then((res:any)=>{
        if(res){

          this.back();
          this.snackbar.open("Product berhasil diubah ","",{
            duration:2000
          });
        }else{
          this.dataService.setLoading(false);
        }
			}).catch(err=>{
        console.log(err);
        this.dataService.setLoading(false);

			})
		}
	}

  getMerk(){
    this.restApi.getMerk("").then((res:any)=>{
      this.dataMerk = res.data;
    }).catch(err=>{
      console.log(err);

    })
  }

  openDialogCrop(){
    const dialogRef  = this.dialog.open(DialogCropImageComponent);
    dialogRef.afterClosed().subscribe(res=>{
      this.imagePre = res.image;
      const imageBlob1 = this.base64ToBlob(res.image);
      const imageName: string = this.barcode+'.jpg';
      const imageFile: File = new File([imageBlob1], imageName, {
          type: "image/jpeg"
      });
      this.image = imageFile
    })
  }

  base64ToBlob(dataURI: any, contentType = 'image/jpeg', sliceSize = 512) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: contentType });
  }
  // onOpenDialogSupplier() {
	// 	const dialogRef = this.dialog.open(DialogSupplierComponent);
	// 	dialogRef.afterClosed().subscribe(res => {
	// 		if (res) {
	// 			this.data.idSupplier = res.id,
	// 			this.data.namaSupplier = res.name
	// 		}
	// 	})
	// }
  onOpenDialogMerk() {
		const dialogRef = this.dialog.open(DialogMerkComponent);
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.data.merkMobil = res.id,
				this.data.namaMerkMobil = res.name
			}
		})
	}

}
