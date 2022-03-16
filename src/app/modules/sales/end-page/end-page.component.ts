import { DataService } from './../../../services/data.service';
import decode from 'jwt-decode';
import { RestApiService } from './../../../services/rest-api.service';
import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.css'],
  providers:[DatePipe]
})
export class EndPageComponent implements OnInit,OnDestroy {
  companyName="Sion Glass ";
  branchAddress = "Jl. Kp. Nias V No.18.A, Belakang Pd., Kec. Padang Sel., Kota Padang, Sumatera Barat 25134";
  telpCompany = "0852-6329-7411";
  dataOrder:any;
  dataItem:any;
  idSales="";
  totalPrice=0;
  totalCredit=0;
  pay=0;
  cashback=0;



  customerName = "";
  customerAddress="";
  dataUser :any ;
  constructor(
    private datePipe : DatePipe,
    private restApi : RestApiService,
    private location : Location,
    public dataService : DataService
  ) {
    if (JSON.parse(localStorage.getItem("order-draft")!)) {
			const dataItemLocal = JSON.parse(localStorage.getItem("order-draft")!)

			this.dataOrder = dataItemLocal.dataOrder;
			this.dataItem = dataItemLocal.dataItem;
      this.idSales = dataItemLocal.idSales;
      this.totalPrice = dataItemLocal.totalPrice;
      this.totalCredit = dataItemLocal.totalCredit;
      this.pay = dataItemLocal.pay;
      this.cashback = dataItemLocal.cashback;
    }
    if(!JSON.parse(localStorage.getItem("order-draft")!).dataItem){
      location.back();
    }
  }

  ngOnInit(): void {
    this.getUser();
    this.getCustomer();
  }

  getUser(){
    const token = localStorage.getItem('token-sion');
    this.dataUser = decode(token!);

  }

  getCustomer(){
    this.restApi.getCustomerById(this.dataOrder.customerId).then((res:any)=>{
      this.customerName = res.data.name;
      this.customerAddress = res.data.address;
      this.dataService.setLoading(false);
    }).catch(err=>{
      console.log(err);

    })
  }

  ngOnDestroy(){
    localStorage.removeItem("order-draft");
  }

  back(){
    this.location.back();
  }

  // Print PDF SO
  generatePdfSO() {
    let pipe = new DatePipe('en-US');
    let now = Date.now()
    let datenow = pipe.transform(now, 'dd/MM/yyyy h:mm:ss');

    let totalPrice = this.totalPrice;
    let dpp = totalPrice - (totalPrice*0.1);
    let ppn = 0;
    let nameUser = this.dataUser.name;
    let nameCust = this.customerName
    let pay = 0;
    let cashback=0;
    let txtBayar = "";
    let txtSisa = "";
    let txtDateLimit="";
    let limitDate="";
    let datappn = this.dataOrder.ppn;
    if(this.dataOrder.paymentMethod === "CASH"){
      txtBayar = "Tunai";
      txtSisa = "Kembali";
      pay = this.pay;
      cashback = this.cashback;
    }else{
      txtBayar = "Dp";
      txtSisa = "Credit";
      pay = this.dataOrder.dp;
      cashback = this.totalCredit;
      txtDateLimit = "Jatuh Tempo :";
      limitDate = this.datePipe.transform( this.dataOrder.limitDate,'dd MMM YYYY')!;
    }


    if(this.dataOrder.ppn){
      ppn = totalPrice * 0.1;
    }
    let imageHeader: any[] = [];
    // if (this.img !== '') {
    //     imageHeader.push(
    //         {
    //             image: `${this.img}`,
    //             width: 80,
    //             margin: [15, 10, 0, 0],
    //         }
    //     )
    // }
    var docDefinition: any = {
        // margin: [kiri, atas, kanan, bawah]
        pageMargins: [10, 120, 0, 140],
        header: [
            {
              columns: [
                    imageHeader,
                    {
                        text: [
                          { text: 'FAKTUR PENJUALAN\n', fontSize: 11, bold: true },
                          { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                          { text: `\n${this.companyName.toUpperCase()}\n`, fontSize: 10, bold: true },
                          `${this.branchAddress}\n`,
                          `${this.telpCompany}`],
                        margin: [70, 10, 0, 0],
                        fontSize: 7,
                        width: '40%'
                    },
                    {
                        text:'Nomor Transaksi :\nTanggal :\nPelanggan :\n Alamat: ',
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 40, 0, 0],
                    },
                    {
                        text: `${this.idSales} \n ${datenow} \n ${this.customerName}\n ${this.customerAddress}`,
                        fontSize: 9,
                        alignment: 'left',
                        margin: [10, 40, 0, 0],
                        width:'30%'
                    }
                ]
            },

            {
                columns: [
                    {
                        text: 'NOTE:',
                        margin: [10, 20, 0, 0],
                        fontSize: 9
                    },
                    {
                        text: `${this.dataOrder['note']}`,
                        fontSize: 9,
                        margin: [-227, 20, 0, 0],
                    }
                ]
            },

        ],
        // PdfA4
        content: [
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 570, y2: 0, lineWidth: 1}] },
            {
                columns: [
                    {
                        text: 'DESKRIPSI',
                        margin: [10, 0, 0, 0],
                        fontSize: 9,
                        alignment: 'center',
                        width: '35%',
                    },
                    {
                        text: 'JUMLAH',
                        fontSize: 9,
                        alignment: 'center',
                        margin: [0, 0, 0, 0],
                        width: '10%',
                    },
                    {
                        text: 'HARGA',
                        fontSize: 9,
                        alignment: 'center',
                        margin: [0, 0, 0, 0],
                        width: '15%',
                    },
                    {
                        text: 'DISKON',
                        fontSize: 9,
                        alignment: 'center',
                        margin: [0, 0, 0, 0],
                        width: '15%',
                    },
                    {
                        text: 'TOTAL',
                        fontSize: 9,
                        alignment: 'center',
                        margin: [0, 0, 0, 0],
                        width: '15%',
                    }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 570, y2: 0, lineWidth: 1 }] },
            this.dataItem.map(function (item: any, index: any) {
                return {
                    columns: [
                        {
                            text: `${index + 1}. ${item["barcode"]} ${item["description"] + ' ' + item["merkMobil"]+ ' ' + item["tipeMobil"]}`,
                            margin: [10, 2, 0, 0],
                            fontSize: 9,
                            alignment: 'left',
                            width: '35%',
                        },
                        {
                            text: `${item['qty']} `,
                            margin: [0, 2, 0, 0],
                            fontSize: 9,
                            alignment: 'center',
                            width: '10%',
                        },
                        {
                            text: `${((item['price'] - (item['diskon'] / item['qty'])) + ((item['price'] - (item['diskon'] / item['qty'])) * (datappn/100)) ).toLocaleString(['id'])}`,
                            margin: [0, 2, 0, 0],
                            fontSize: 9,
                            alignment: 'right',
                            width: '15%',
                        },
                        {
                            text: `${((item['typeDiscount']==='Amount')?(item['diskon']):((item['diskon']/100)*totalPrice)).toLocaleString(['id']) | 0}`,
                            margin: [0, 2, 0, 0],
                            fontSize: 9,
                            alignment: 'right',
                            width: '15%',
                        },
                        {
                            text: `${(((item['price'] - (item['diskon'] / item['qty'])) * item['qty'])+((item['price'] - (item['diskon'] / item['qty'])) * item['qty'])* (datappn/100)).toLocaleString(['id'])}`,
                            margin: [0, 2, 0, 0],
                            fontSize: 9,
                            alignment: 'right',
                            width: '15%',
                        }
                    ]
                }
            }),

        ],

        footer: function (currentPage: any, pageCount: any) {
            if (currentPage != pageCount) {
                return [{ canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },]
            } else {
                return [
                    { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                    {
                        columns: [

                            {
                                text: [
                                    '\Hormat Kami, \n',
                                    {
                                        text: '\n\n',
                                        fontSize: 17,
                                        bold: true,
                                        italics: true,
                                    },
                                    {
                                        text: '\n',
                                        fontSize: 9,
                                        alignment: 'right',
                                    },
                                    {
                                        text: '----------------------------------------------\n' + `${nameUser}`,
                                        fontSize: 9,
                                        alignment: 'center',
                                    }
                                ],
                                margin: [10, 10, 0, 0],
                                fontSize: 9,
                                alignment: 'center',
                                width: '20%',
                            },
                            {
                                text: [
                                    '\nPenerima, \n',
                                    {
                                        text: '\n\n',
                                        fontSize: 17,
                                        bold: true,
                                        italics: true,
                                    },
                                    {
                                        text: '\n',
                                        fontSize: 9,
                                        alignment: 'right',
                                    },
                                    {
                                        text: '----------------------------------------------\n' + `${nameCust}`,
                                        fontSize: 9,
                                        alignment: 'center',
                                    }
                                ],
                                margin: [10, 0, 0, 0],
                                fontSize: 9,
                                alignment: 'center',
                                width: '20%',
                            },
                            {
                                text: '\n' +
                                    'TOTAL :\n' +

                                    '\n'+
                                    `${txtBayar} : \n`+
                                    `${txtSisa} : \n`+
                                    `${txtDateLimit}`,
                                fontSize: 9,
                                alignment: 'right',
                                margin: [0, 0, 0, 0],
                                width: '35%',
                            },
                            {
                                text: '\n' +
                                    `${totalPrice.toLocaleString(['id'])}\n` +
                                    '\n' +
                                    `${pay.toLocaleString(['id'])}\n`+
                                    `${cashback.toLocaleString(['id'])}\n`+
                                    `${limitDate}`,
                                fontSize: 9,
                                alignment: 'right',
                                margin: [0, 0, -20, 0],
                                width: '10%',
                            }
                        ]
                    },
                ]
            }
        },
        pageSize: {
            width: 630,
            height: 420
        },

    }
    pdfMake.createPdf(docDefinition).print();
  }

}
