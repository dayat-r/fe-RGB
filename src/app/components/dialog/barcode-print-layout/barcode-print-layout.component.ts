import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-barcode-print-layout',
  templateUrl: './barcode-print-layout.component.html',
  styleUrls: ['./barcode-print-layout.component.css']
})
export class BarcodePrintLayoutComponent implements OnInit {
  ulang:string[]=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    for (let index = 0; index < this.data.jum; index++) {
      this.ulang.push('.')

    }
  }

}
