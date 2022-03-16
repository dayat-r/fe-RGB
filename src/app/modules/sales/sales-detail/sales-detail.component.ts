import decode from 'jwt-decode';
import { DialogConfirmationComponent } from './../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
import { DataService } from './../../../services/data.service';
import { DatePipe, Location } from '@angular/common';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css'],
  providers: [DatePipe]
})
export class SalesDetailComponent implements OnInit {
  companyName = "Sion Glass ";
  branchAddress = "Jl. Kp. Nias V No.18.A, Belakang Pd., Kec. Padang Sel., Kota Padang, Sumatera Barat 25134";
  telpCompany = "0852-6329-7411";
  data = {
    credit: 0,
    paymentMethod: 'CASH',
    limitDate: '',
    dp: 0,
    ppn: 0,
    ppnStatus: 'BEFORE',
    ppnCheck: 'BEFORE',
    customerId: '',
    customerName: '',
    note: '',
    pay: 0,
    cashback: 0,
    date: '',
    userSales: '',
    userName: '',
    customerAddress: ''
  }
  dataItem: any = [];
  totalPrice = 0;
  dpp = 0;
  totalCredit = 0;
  idSales = "";
  totalDiskon = 0;

  dataUser:any;
  math = Math.round;
  constructor(
    private dialog: MatDialog,
    private restApi: RestApiService,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public dataService: DataService,
    private location: Location,

  ) {
    route.params.subscribe(res => {
      this.idSales = res.id;
    });
    dataService.setLoading(true);
  }

  ngOnInit(): void {
    const dataUser1 = localStorage.getItem("token-sion");
		this.dataUser = decode(dataUser1!);
    this.getSalesDetail();

  }

  back() {
    this.location.back();
  }

  getSalesDetail() {
    this.restApi.getSalesDetail(this.idSales).then((res: any) => {
      this.data = res.sales;
      let dataItemLoop = res.order;
      dataItemLoop.map((res: any) => {
        this.dataItem.push({
          barcode: res.barcode,
          description: res.description,
          merkMobil: res.merkMobil,
          tipeMobil: res.tipeMobil,
          price: Math.round(res.price),
          path: res.path,
          diskon: res.diskon,
          location: res.location,
          qty: res.qty,
          typeDiscount: res.typeDiscount
        })
        if (res.typeDiscount === "Persentage") {
          this.totalDiskon = Math.round(this.totalDiskon + ((res.diskon / 100) * (res.qty * res.price)));
        } else {
          this.totalDiskon = Math.round(this.totalDiskon + (res.diskon));
        }
      })
      const total = res.sales.total;

      const hargaAwal = total + this.totalDiskon

      if (this.data.ppn && this.data.ppnStatus === 'BEFORE') {
        this.dpp = Math.round((hargaAwal - (hargaAwal * (this.data.ppn / 110))) - this.totalDiskon);

      } else if (this.data.ppn && this.data.ppnStatus === 'AFTER') {
        this.dpp = Math.round((total - (total * (this.data.ppn / 110))));
      } else {
        this.dpp = Math.round(total);

      }


      this.totalPrice = res.sales.total;
      this.totalCredit = res.sales.credit | 0;
      this.dataService.setLoading(false);


    }).catch(err => {
      console.log(err);

    })
  }

  getImage(path: string) {
    if (path) {
      return environment.urlImage + path;
    }
    else {
      return
    }
  }

  onEditSalesOrder() {
    this.router.navigate([`/sales/edit/${this.idSales}`]);
  }

  onDeleteSales() {
    this.dataService.dialogSuccess("Peringatan","Data keuangan akan berubah, Yakin akan menghapus data penjualan?")
    const dialogRef = this.dialog.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.dataService.setLoading(true);
        this.restApi.deleteSales(this.idSales)
          .then(() => {
            this.dataService.setLoading(false);
            this.snackbar.open("Order delete successfuly", "", {
              duration: 2000
            });
            this.router.navigate(['/sales']);
          })
          .catch((err: any) => {
            this.dataService.setLoading(false);
            this.snackbar.open("Cannot delete this Order", "", {
              duration: 2000
            });
            console.log(err);
          });
      }
    });
  }

  // Print PDF SO
  generatePdfSO() {
    let pipe = new DatePipe('en-US');
    let now = Date.now()
    let datenow = pipe.transform(now, 'dd/MM/yyyy h:mm:ss');

    let totalPrice = Math.round(this.totalPrice);
    let dpp = totalPrice - (totalPrice * 0.1);
    let ppn = 0;
    let nameUser = this.data.userName;
    let nameCust = this.data.customerName;
    let pay = 0;
    let cashback = 0;
    let txtBayar = "";
    let txtSisa = "";
    let txtDateLimit = "";
    let limitDate = "";

    let datappn = this.data.ppn
    if (this.data.paymentMethod === "CASH") {
      txtBayar = "Tunai";
      txtSisa = "Kembali";
      pay = this.data.pay;
      cashback = Math.round(this.data.cashback) ;
    } else {
      txtBayar = "Dp";
      txtSisa = "Credit";
      pay = parseInt(this.data.dp.toString());
      cashback = this.totalCredit;
      txtDateLimit = "Jatuh Tempo :";
      limitDate = this.datePipe.transform(this.data.limitDate, 'dd MMM YYYY')! || '-';
    }
    let diskon = 0;


    if (this.data.ppn) {
      ppn = totalPrice * this.data.ppn;
    }
    let ppnItem = this.data.ppn || 0;
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
              text: 'Nomor Transaksi :\nTanggal :\nPelanggan :\n Alamat: ',
              fontSize: 9,
              alignment: 'right',
              margin: [0, 40, 0, 0],
            },
            {
              text: `${this.idSales} \n ${datenow} \n ${this.data.customerName}\n ${this.data.customerAddress}`,
              fontSize: 9,
              alignment: 'left',
              margin: [10, 40, 0, 0],
              width: '30%'
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
              text: `${this.data['note']}`,
              fontSize: 9,
              margin: [-227, 20, 0, 0],
            }
          ]
        },

      ],
      // PdfA4
      content: [
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 570, y2: 0, lineWidth: 1 }] },
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
                text: `${index + 1}. ${item["barcode"]} ${item["description"] + ' ' + item["merkMobil"] + ' ' + item["tipeMobil"]}`,
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
                text: `${(Math.round(item['price']+ (item['price'] * (ppnItem/100)))).toLocaleString(['id'])}`,
                margin: [0, 2, 0, 0],
                fontSize: 9,
                alignment: 'right',
                width: '15%',
              },
              {
                text: `${(item.typeDiscount === 'PERSENTAGE') ? (Math.round(item['diskon'] * totalPrice)).toLocaleString(['id']) : (Math.round(item.diskon)).toLocaleString(['id']) || 0}`,
                margin: [0, 2, 0, 0],
                fontSize: 9,
                alignment: 'right',
                width: '15%',
              },
              {
                text: `${(Math.round(((item['price']+(item['price'] * (ppnItem/100))) - (item['diskon'] / item['qty'])) * item['qty'])).toLocaleString(['id'])}`,
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
                    'TOTAL :\n\n' +
                    `${txtBayar} : \n` +
                    `${txtSisa} : \n` +
                    `${txtDateLimit}`,
                  fontSize: 9,
                  alignment: 'right',
                  margin: [0, 0, 0, 0],
                  width: '35%',
                },
                {
                  text: '\n' +
                    `${totalPrice.toLocaleString(['id'])}\n\n` +
                    `${pay.toLocaleString(['id'])}\n` +
                    `${cashback.toLocaleString(['id'])}\n` +
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
