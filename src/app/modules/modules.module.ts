import { NgApexchartsModule } from 'ng-apexcharts';

import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { MaterialModule } from './../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModulesComponent } from './modules.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { ItemAddComponent } from './item/item-add/item-add.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { SupplierAddComponent } from './supplier/supplier-add/supplier-add.component';
import { SupplierEditComponent } from './supplier/supplier-edit/supplier-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { LocationAddComponent } from './location/location-add/location-add.component';
import { LocationEditComponent } from './location/location-edit/location-edit.component';
import { IncomeListComponent } from './income/income-list/income-list.component';
import { IncomeAddComponent } from './income/income-add/income-add.component';
import { IncomeEditComponent } from './income/income-edit/income-edit.component';
import { CostListComponent } from './cost/cost-list/cost-list.component';
import { CostAddComponent } from './cost/cost-add/cost-add.component';
import { CostEditComponent } from './cost/cost-edit/cost-edit.component';
import { MerkListComponent } from './merk/merk-list/merk-list.component';
import { MerkAddComponent } from './merk/merk-add/merk-add.component';
import { MerkEditComponent } from './merk/merk-edit/merk-edit.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { SalesAddComponent } from './sales/sales-add/sales-add.component';
import { EndPageComponent } from './sales/end-page/end-page.component';
import { SalesDetailComponent } from './sales/sales-detail/sales-detail.component';
import { RegisterComponent } from './auth/register/register.component';
import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';
import { ReportDashboardComponent } from './report/report-dashboard/report-dashboard.component';
import { SalesReportComponent } from './report/sales-report/sales-report.component';
import { PurchaseReportComponent } from './report/purchase-report/purchase-report.component';
import { ItemSalesReportComponent } from './report/item-sales-report/item-sales-report.component';
import { HutangReportComponent } from './report/hutang-report/hutang-report.component';
import { ArReportComponent } from './report/ar-report/ar-report.component';
import { SalesEditComponent } from './sales/sales-edit/sales-edit.component';
import { IsReportComponent } from './report/is-report/is-report.component';
import { ItemTransferComponent } from './item/item-transfer/item-transfer.component';
import { CoaListComponent } from './coa/coa-list/coa-list.component';
import { CoaAddComponent } from './coa/coa-add/coa-add.component';
import { CoaEditComponent } from './coa/coa-edit/coa-edit.component';
import { ListDebtComponent } from './payment/debt/list-debt/list-debt.component';
import { DetailDebtComponent } from './payment/debt/detail-debt/detail-debt.component';
import { ListArComponent } from './payment/ar/list-ar/list-ar.component';
import { DetailArComponent } from './payment/ar/detail-ar/detail-ar.component';
import { AlertListComponent } from './alert/alert-list/alert-list.component';
import { PurchaseDetailComponent } from './purchase/purchase-detail/purchase-detail.component';
import { LinearChartComponent } from './dashboard/linear-chart/linear-chart.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAppComponent } from './customer-app/customer-app.component';
import { MinerComponent } from './miner/miner.component';


@NgModule({
  declarations: [
    ModulesComponent,
    DashboardComponent,
    LoginComponent,
    ItemAddComponent,
    ItemListComponent,
    SupplierAddComponent,
    SupplierListComponent,
    SupplierEditComponent,
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    ItemEditComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    LocationListComponent,
    LocationAddComponent,
    LocationEditComponent,
    IncomeListComponent,
    IncomeAddComponent,
    IncomeEditComponent,
    CostListComponent,
    CostAddComponent,
    CostEditComponent,
    MerkListComponent,
    MerkAddComponent,
    MerkEditComponent,
    ItemDetailComponent,
    SalesListComponent,
    SalesAddComponent,
    SalesEditComponent,
    EndPageComponent,
    SalesDetailComponent,
    RegisterComponent,
    PurchaseListComponent,
    ReportDashboardComponent,
    SalesReportComponent,
    PurchaseReportComponent,
    ItemSalesReportComponent,
    HutangReportComponent,
    ArReportComponent,
    IsReportComponent,
    ItemTransferComponent,
    CoaListComponent,
    CoaAddComponent,
    CoaEditComponent,
    ListDebtComponent,
    DetailDebtComponent,
    ListArComponent,
    DetailArComponent,
    AlertListComponent,
    PurchaseDetailComponent,
    LinearChartComponent,
    ProfileComponent,
    CustomerComponent,
    CustomerAppComponent,
    MinerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    AvatarModule,
    ToolbarModule,
    NgApexchartsModule
  ],
})
export class ModulesModule { }
