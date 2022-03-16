import { DialogCropImageComponent } from './../../../components/dialog/dialog-crop-image/dialog-crop-image.component';
import { DataService } from './../../../services/data.service';
import { Location } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DialogSupplierComponent } from 'src/app/components/dialog/dialog-supplier/dialog-supplier.component';
import { DialogMerkComponent } from 'src/app/components/dialog/dialog-merk/dialog-merk.component';

@Component({
	selector: 'app-item-add',
	templateUrl: './item-add.component.html',
	styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
	data = {
		barcode: '',
		// idSupplier: '',
		// nameSupplier: '',
		merkMobil: '',
		namaMerkMobil: '',
		tipeMobil: '',
		description: '',
		description2: '',
		merk: '',
		price: '',
	}
	dataSupplier: any;
	dataMerk: any;

	image: any;
	imagePre: any;

	blob: any;
	constructor(
		private restApi: RestApiService,
		private location: Location,
		private snackbar: MatSnackBar,
		private router: Router,
		private dialog: MatDialog,
		public dataService: DataService
	) {
    dataService.setLoading(true);
   }

	ngOnInit(): void {
		this.getSupplier();
		this.getMerk();
	}

	back() {
		this.location.back();
	}

  generateBarcode(){
    var randomChars = '0123456789';
    var result = "";
    let cek:any;
    for ( var i = 0; i < 10; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    this.data.barcode = result;

    this.restApi.getItemById(this.data.barcode).then((res:any)=>{
      cek = res.location.length;
    });
    while(cek >0){
      for ( var i = 0; i < 10; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
       }
       this.data.barcode = result;
      this.restApi.getItemById(this.data.barcode).then((res:any)=>{
        cek = res.location.length;
      });
      console.log("ulang cek");

    }
  }

	getSupplier() {
		this.restApi.getSupplier("").then((res: any) => {
			this.dataSupplier = res.data;
		}).catch(err => {
			console.log(err);

		});
	}

	onSaveProduct() {

		if (this.data.barcode && this.data.merkMobil && this.data.tipeMobil && this.data.description) {
			this.dataService.setLoading(true);
      const formData = new FormData();

			formData.append('barcode', this.data.barcode);
			formData.append('merkMobil', this.data.merkMobil);
			formData.append('tipeMobil', this.data.tipeMobil);
			formData.append('description', this.data.description);
			formData.append('description2', this.data.description2);
			formData.append('merk', this.data.merk);
			formData.append('price', this.data.price);
			if (this.image) {
				formData.append('image', this.image);
				formData.append('path', `uploads/item/${this.data.barcode}.jpg`);
			}

			this.restApi.saveItem(formData).then((res: any) => {
				this.router.navigate(['/item-list'])
				this.snackbar.open("Product berhasil ditambahkan ", "", {
					duration: 2000
				});
			}).catch(err => {
				console.log(err);

			})
		}else{
      this.snackbar.open("Lengkapi data terlebih dahulu ", "", {
        duration: 2000
      });
    }
	}

	getMerk() {
		this.restApi.getMerk("").then((res: any) => {
			this.dataMerk = res.data;
      this.dataService.setLoading(false);
		}).catch(err => {
			console.log(err);

		})
	}

	openDialogCrop() {
		const dialogRef = this.dialog.open(DialogCropImageComponent);
		dialogRef.afterClosed().subscribe(res => {
			if (res) {

				this.imagePre = res.image;
				this.blob = res.image;
				const imageBlob1 = this.base64ToBlob(res.image);
				const imageName: string = this.data.barcode + '.jpg';
				const imageFile: File = new File([imageBlob1], imageName, {
					type: "image/jpeg"
				});
				this.image = imageFile
			}
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

	download() {
		var url = window.URL.createObjectURL(this.image);
		window.open(url);
	}

  // onOpenDialogSupplier() {
	// 	const dialogRef = this.dialog.open(DialogSupplierComponent);
	// 	dialogRef.afterClosed().subscribe(res => {
	// 		if (res) {
	// 			this.data.idSupplier = res.id,
	// 			this.data.nameSupplier = res.name
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
