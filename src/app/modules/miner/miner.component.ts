import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miner',
  templateUrl: './miner.component.html',
  styleUrls: ['./miner.component.css']
})
export class MinerComponent implements OnInit {
  data:any;
  constructor(
    private dataService : DataService,
    private restApi : RestApiService,
  ) {
    dataService.setLoading(false);
  }

  ngOnInit(): void {
    this.getByIdDevice();

  }

  getByIdDevice(){
    this.restApi.getMinerByidDevice("1").then((res:any)=>{
      this.data = res.data;
    }).catch(err=>{
      console.log(err);

    })
  }

  update(id:any,status:boolean){
    this.dataService.setSkeleton(true);
    this.restApi.updateStatusMiner("1",{
      id : id,
      status : !status
    }).then((res:any)=>{
      this.dataService.setSkeleton(false);
      this.getByIdDevice();
    }).catch(err=>{
      console.log(err);

    })
  }

}
