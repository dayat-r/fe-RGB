import { BarcodePrintLayoutComponent } from './../barcode-print-layout/barcode-print-layout.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';


import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-dialog-print-barcode',
  templateUrl: './dialog-print-barcode.component.html',
  styleUrls: ['./dialog-print-barcode.component.css']
})
export class DialogPrintBarcodeComponent implements OnInit {
  count='';
  constructor(
    @Inject(MAT_DIALOG_DATA) public barcode: any,
    private dialog : MatDialog,
    @Inject(DOCUMENT) private document: Document,

  ) {

  }

  ngOnInit(): void {

  }

  // onPrint(){
  //   this.dialog.open(BarcodePrintLayoutComponent,{
  //     data : {
  //       barcode : this.barcode,
  //       jum : this.count
  //     }
  //   })
  // }

  onPrint(){
    let nodelist: any = this.document.querySelectorAll('.barcode img');
    let img:any = Array.from(nodelist);


    let arr = [];

    for (let i = 0; i < parseInt(this.count); i++) {
      arr.push('');
    }


    var docDefinition: any = {
      // margin: [kiri, atas, kanan, bawah]
      pageMargins: [0, 10, 0, 0],

      // PdfA4
      content: [
        arr.map(res=>{
          return {
            columns:[
              {
                image: img[0].src,
                width:120,
                height:35
              },
              {
                text:'',
                width:30
              },
              {
                image: img[0].src,
                width:120,
                height:35
              },

            ],
            margin:[10,0,0,100]
          }
        })

      ],


      pageSize: {
          width: 300,
          height: 100
      },

    }
    pdfMake.createPdf(docDefinition).print();
  }

}
