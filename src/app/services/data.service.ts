import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  title="";
  message = "";
  loading=true;
  skeleton=true;

  alert=false;

  findPlace="";

  constructor() { }

  dialogSuccess(title:any,text:any){
    this.message = text;
    this.title = title;
  }

  setLoading(value:boolean){
    this.loading = value;
  }
  setFindPlace(value:string){
    this.findPlace = value;
  }
  setAlert(value:boolean){
    this.alert = value;
  }
  setSkeleton(value:boolean){
    this.skeleton = value;
  }
}
