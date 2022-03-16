import { DataService } from './../../../services/data.service';
import { environment } from './../../../../environments/environment';
import { DialogCropImageComponent } from './../../../components/dialog/dialog-crop-image/dialog-crop-image.component';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merk-edit',
  templateUrl: './merk-edit.component.html',
  styleUrls: ['./merk-edit.component.css']
})
export class MerkEditComponent implements OnInit {
  data={
    name:'',
    path:'',
    kodeMerk:'',
  }
  kodeMerk="";
  image:any;
  imagePre:any;
  constructor(
    private restApi: RestApiService,
    private snackbar : MatSnackBar,
    private location : Location,
    private dialog : MatDialog,
    private route : ActivatedRoute,
    public dataService : DataService
  ) {
    route.params.subscribe(res=>{
      this.kodeMerk = res.id;
    });
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    this.getMerkById();
  }

  getMerkById(){
    this.restApi.getMerkById(this.kodeMerk).then((res:any)=>{
      this.data = res.data;
      this.imagePre = environment.urlImage+res.data.path;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

  onUpdateMerk(){
    if(this.data.name){
      this.dataService.setLoading(true);
      const formData = new FormData();
      if(this.image){
        formData.append('image',this.image);
        formData.append('imageDel',this.data.path);
        formData.append('path',`uploads/merk/${this.kodeMerk}.jpg`);
      }
      formData.append('name',this.data.name)
      this.restApi.updateMerk(this.kodeMerk,formData).then((res:any)=>{
        if(res){
          this.snackbar.open("Merk update successfuly","",{
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

  openDialogCrop(){
    if(this.data.name){
      const dialogRef  = this.dialog.open(DialogCropImageComponent);
      dialogRef.afterClosed().subscribe(res=>{
        if(res){

          this.imagePre = res.image;
          const imageBlob1 = this.base64ToBlob(res.image);
          const imageName: string = this.kodeMerk+'.jpg';
          const imageFile: File = new File([imageBlob1], imageName, {
              type: "image/jpeg"
          });
          this.image = imageFile
        }
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
