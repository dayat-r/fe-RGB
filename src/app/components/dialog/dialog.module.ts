import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DialogCropImageComponent } from './dialog-crop-image/dialog-crop-image.component';
import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { DialogAddProductComponent } from './dialog-add-product/dialog-add-product.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DialogCustomerComponent } from './dialog-customer/dialog-customer.component';
import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { DialogOrderQtyComponent } from './dialog-order-qty/dialog-order-qty.component';
import { DialogPayComponent } from './dialog-pay/dialog-pay.component';
import { DialogUpdateQtyComponent } from './dialog-update-qty/dialog-update-qty.component';
import { DialogInformationComponent } from './dialog-information/dialog-information.component';
import { DialogSupplierComponent } from './dialog-supplier/dialog-supplier.component';
import { DialogMerkComponent } from './dialog-merk/dialog-merk.component';
import { DialogAddSupplierComponent } from './dialog-add-supplier/dialog-add-supplier.component';
import { DialogAddMerkComponent } from './dialog-add-merk/dialog-add-merk.component';
import { DialogAddCustomerComponent } from './dialog-add-customer/dialog-add-customer.component';
import { DialogAddCoaComponent } from './dialog-add-coa/dialog-add-coa.component';
import { DialogPaymentComponent } from './dialog-payment/dialog-payment.component';
import { DialogPrintBarcodeComponent } from './dialog-print-barcode/dialog-print-barcode.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { BarcodePrintLayoutComponent } from './barcode-print-layout/barcode-print-layout.component';
import { NgxPrintModule } from 'ngx-print';



@NgModule({
  declarations: [
    DialogComponent,
    DialogConfirmationComponent,
    DialogAddProductComponent,
    DialogCropImageComponent,
    DialogCustomerComponent,
    DialogProductComponent,
    DialogOrderQtyComponent,
    DialogPayComponent,
    DialogUpdateQtyComponent,
    DialogInformationComponent,
    DialogSupplierComponent,
    DialogMerkComponent,
    DialogAddSupplierComponent,
    DialogAddMerkComponent,
    DialogAddCustomerComponent,
    DialogAddCoaComponent,
    DialogPaymentComponent,
    DialogPrintBarcodeComponent,
    BarcodePrintLayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ImageCropperModule,
    FormsModule,
		BrowserModule,
		BrowserAnimationsModule,
    NgxBarcodeModule,
    NgxPrintModule
  ]
})
export class DialogModule { }
