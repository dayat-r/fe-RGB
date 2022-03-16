import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-app',
  templateUrl: './customer-app.component.html',
  styleUrls: ['./customer-app.component.css']
})
export class CustomerAppComponent implements OnInit {

  constructor(
    private dataService : DataService
  ) {
    dataService.setLoading(false);
   }

  ngOnInit(): void {
  }

}
