import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
import { RestApiService } from '../../../services/rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dialog-crop-image',
    templateUrl: './dialog-crop-image.component.html',
    styleUrls: ['./dialog-crop-image.component.css']
})
export class DialogCropImageComponent implements OnInit {

    @ViewChild('upload') upload!: ElementRef;
    @ViewChild(ImageCropperComponent) imageCropper!: ImageCropperComponent;

    selectedFile: File = null as any;
    generatedImage: File = null as any;
    windowOPen: any;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageBase64: any = '';
    imageBeforeCrop: any = '';
    imageAdd: any = '';
    cropSize=1/1;
    formatFile="jpeg";
    resizeWidth=450;

    btnDisable = false;
    spinner: Boolean = false;

    readyToUpload = false;
    uploadNow = false;

    constructor(
        public dialogRef: MatDialogRef<DialogCropImageComponent>,
        private data: DataService,
        private rest: RestApiService,
        public snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router : Router
    ) {
        /* ambil data url */
        let url = router.url.split('/');
        /* kondisi ratio crop image */
        if(this.router.url == '/layout-setting/tentang-kami/sesi-1'){
            this.cropSize = 2/1;
        } else if(this.router.url == '/sesi-1'){
            this.cropSize = 2/1;
        } else if(url.find(item=>item === 'article')){
            this.cropSize = 2/1;
            this.resizeWidth = 1080;
        } else if (this.router.url == '/menu/add-promosi' || this.router.url == '/add-promosi') {
            this.cropSize = 2/1;
            this.resizeWidth = 1080;
        } else if (url.find(data=>data === 'edit-promosi')) {
            this.cropSize = 2/1;
            this.resizeWidth = 1080;
        }
        else if(url.find(data=>data === 'umum')){
            this.cropSize = 5/2;
            this.formatFile = "png";
        }
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.upload.nativeElement.click();
        }, 10);
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    fileChangeEvent(event: any) {
        if (event.target.files[0].size > 5097152) {
            this.snackBar.open('Max size 5 MB', '', {
                duration: 2000
            });
        } else {
            this.imageChangedEvent = event;
            this.handleUpload(event);
        }

    }

    handleUpload(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imageBase64 = reader.result;
            this.imageBeforeCrop = reader.result;
        };
    }

    cropImage() {

        if (this.uploadNow) {
            this.imageCropper.crop();
            this.changeUpload();
            this.changeReadyUpload();
        } else {
            this.imageCropper.crop();
        }
    }

    imageCropped(event: ImageCroppedEvent) {
        // For Upload
        this.croppedImage = event.base64;
        this.imageBase64 = event.base64;
        const image64 = event.base64;
        this.imageAdd = image64;
    }

    changeReadyUpload() {
        this.readyToUpload = !this.readyToUpload;
    }

    changeUpload() {
        this.uploadNow = !this.uploadNow;
        this.changeReadyUpload();
    }

    async uploadImage() {

        if (this.imageAdd === null || this.imageAdd === undefined) {

            this.snackBar.open('Please Upload Image', '', {
                duration: 2000
            });

        } else {

            this.spinner = true;
            this.btnDisable = true;

            this.dialogRef.close({
                tutup: true,
                image: this.imageAdd
            })
        }

    }

}
