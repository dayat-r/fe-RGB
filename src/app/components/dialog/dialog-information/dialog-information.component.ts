import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-information',
  templateUrl: './dialog-information.component.html',
  styleUrls: ['./dialog-information.component.css']
})
export class DialogInformationComponent implements OnInit {

  constructor(
    public dataService : DataService
  ) { }

  ngOnInit(): void {
  }

}
