import { DataService } from './../../../services/data.service';
import { DialogCropImageComponent } from './../../../components/dialog/dialog-crop-image/dialog-crop-image.component';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-merk-add',
  templateUrl: './merk-add.component.html',
  styleUrls: ['./merk-add.component.css']
})
export class MerkAddComponent implements OnInit {
  data={
    kodeMerk:'',
    name:'',
    path:'',
    status:true
  }
  image:any;
  imagePre:any;
  constructor(
    private restApi: RestApiService,
    private snackbar : MatSnackBar,
    private location : Location,
    private dialog : MatDialog,
    public dataService : DataService
  ) {
    dataService.setLoading(false);
  }

  ngOnInit(): void {
  }

  onSaveMerk(){
    if(this.data.name){
      this.dataService.setLoading(true);
      this.data.kodeMerk = this.data.name.split(" ").join("").toString().toUpperCase();
      const formData = new FormData();
      formData.append('image',this.image);
      formData.append('name',this.data.name)
      formData.append('kodeMerk',this.data.kodeMerk)
      formData.append('path',`uploads/merk/${this.data.kodeMerk}.jpg`);


      this.restApi.saveMerk(formData).then((res:any)=>{
        if(res){
          this.snackbar.open("Merk add successfuly","",{
            duration:2000
          });
          this.back();
        }else{
          this.dataService.setLoading(false);
        }
      }).catch(err=>{
        console.log(err);
        this.dataService.setLoading(false);

      });
    }

  }
  back(){
    this.location.back();
  }

  selectImage(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.image = file;
    }
  }

  openDialogCrop(){
    if(this.data.name){
      const dialogRef  = this.dialog.open(DialogCropImageComponent);
      this.data.kodeMerk = this.data.name.toUpperCase().split(" ").join("").toString();
      dialogRef.afterClosed().subscribe(res=>{
        this.imagePre = res.image;
        const imageBlob1 = this.base64ToBlob(res.image);
        const imageName: string = this.data.kodeMerk+'.jpg';
        const imageFile: File = new File([imageBlob1], imageName, {
            type: "image/jpeg"
        });
        this.image = imageFile
      })
    }else{
      this.snackbar.open("Please input name ","",{
        duration:2000
      })
    }
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

}
