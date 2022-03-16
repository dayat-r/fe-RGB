import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
	user: any = {
		name: '',
		role: '',
	}
  dataAlert:any;
	constructor(
		public router: Router,
    private restApi : RestApiService,
    private dataService : DataService
	) {
    this.dataService.setAlert(true);
   }

	ngOnInit(): void {
		const dataUser = localStorage.getItem("token-sion");
		this.user = decode(dataUser!);
    this.getAlert();
	}

	onLogout() {
		localStorage.clear();
		this.router.navigate(['/login']);
	}

  getAlert(){
    this.restApi.getAlertActive().then((res:any)=>{
      this.dataAlert = res.data;
      this.dataService.setAlert(false);
    }).catch(err=>{
      console.log(err);

    });
  }

  toNext(type:string){
    if(type === 'HUTANG'){
      this.router.navigate(['/payment/debt']);
    }else{
      this.router.navigate(['/payment/ar']);
    }
  }

}
