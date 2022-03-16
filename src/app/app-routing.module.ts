import { MinerComponent } from './modules/miner/miner.component';
import { CustomerAppComponent } from './modules/customer-app/customer-app.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { ProfileComponent } from './modules/auth/profile/profile.component';
import { PurchaseDetailComponent } from './modules/purchase/purchase-detail/purchase-detail.component';
import { AlertListComponent } from './modules/alert/alert-list/alert-list.component';
import { ListArComponent } from './modules/payment/ar/list-ar/list-ar.component';
import { ListDebtComponent } from './modules/payment/debt/list-debt/list-debt.component';
import { CoaEditComponent } from './modules/coa/coa-edit/coa-edit.component';
import { CoaAddComponent } from './modules/coa/coa-add/coa-add.component';
import { CoaListComponent } from './modules/coa/coa-list/coa-list.component';
import { ItemTransferComponent } from './modules/item/item-transfer/item-transfer.component';
import { IsReportComponent } from './modules/report/is-report/is-report.component';
import { ArReportComponent } from './modules/report/ar-report/ar-report.component';
import { HutangReportComponent } from './modules/report/hutang-report/hutang-report.component';
import { ItemSalesReportComponent } from './modules/report/item-sales-report/item-sales-report.component';
import { PurchaseReportComponent } from './modules/report/purchase-report/purchase-report.component';
import { SalesReportComponent } from './modules/report/sales-report/sales-report.component';
import { ReportDashboardComponent } from './modules/report/report-dashboard/report-dashboard.component';
import { PurchaseListComponent } from './modules/purchase/purchase-list/purchase-list.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { RoleService } from './services/role.service';
import { SalesDetailComponent } from './modules/sales/sales-detail/sales-detail.component';
import { SalesListComponent } from './modules/sales/sales-list/sales-list.component';
import { EndPageComponent } from './modules/sales/end-page/end-page.component';
import { SalesAddComponent } from './modules/sales/sales-add/sales-add.component';
import { ItemDetailComponent } from './modules/item/item-detail/item-detail.component';
import { ItemEditComponent } from './modules/item/item-edit/item-edit.component';
import { MerkEditComponent } from './modules/merk/merk-edit/merk-edit.component';
import { MerkAddComponent } from './modules/merk/merk-add/merk-add.component';
import { MerkListComponent } from './modules/merk/merk-list/merk-list.component';
import { CostEditComponent } from './modules/cost/cost-edit/cost-edit.component';
import { CostAddComponent } from './modules/cost/cost-add/cost-add.component';
import { CostListComponent } from './modules/cost/cost-list/cost-list.component';
import { IncomeEditComponent } from './modules/income/income-edit/income-edit.component';
import { IncomeAddComponent } from './modules/income/income-add/income-add.component';
import { IncomeListComponent } from './modules/income/income-list/income-list.component';
import { LocationEditComponent } from './modules/location/location-edit/location-edit.component';
import { LocationAddComponent } from './modules/location/location-add/location-add.component';
import { LocationListComponent } from './modules/location/location-list/location-list.component';
import { UserEditComponent } from './modules/user/user-edit/user-edit.component';
import { UserAddComponent } from './modules/user/user-add/user-add.component';
import { UserListComponent } from './modules/user/user-list/user-list.component';
import { CustomerEditComponent } from './modules/customer/customer-edit/customer-edit.component';
import { CustomerAddComponent } from './modules/customer/customer-add/customer-add.component';
import { CustomerListComponent } from './modules/customer/customer-list/customer-list.component';
import { SupplierEditComponent } from './modules/supplier/supplier-edit/supplier-edit.component';
import { SupplierAddComponent } from './modules/supplier/supplier-add/supplier-add.component';
import { SupplierListComponent } from './modules/supplier/supplier-list/supplier-list.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ModulesComponent } from './modules/modules.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './modules/item/item-list/item-list.component';
import { ItemAddComponent } from './modules/item/item-add/item-add.component';
import { SalesEditComponent } from './modules/sales/sales-edit/sales-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CustomerAppComponent
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: DashboardComponent
      },
      {
        path: 'item-list',
        canActivate: [AuthGuard],
        component: ItemListComponent
      },
      {
        path: 'item/add',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: ItemAddComponent
      },
      {
        path: 'item/edit/:id',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: ItemEditComponent
      },
      {
        path: 'item/detail/:id',
        canActivate: [AuthGuard],
        component: ItemDetailComponent
      },
      {
        path: 'item/tranfer-item',
        canActivate: [AuthGuard],
        component: ItemTransferComponent
      },
      {
        path: 'supplier',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: SupplierListComponent
      },
      {
        path: 'supplier/add',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: SupplierAddComponent
      },
      {
        path: 'supplier/edit/:id',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: SupplierEditComponent
      },
      {
        path: 'customer',
        canActivate: [AuthGuard],
        component: CustomerListComponent
      },
      {
        path: 'customer/add',
        canActivate: [AuthGuard],
        component: CustomerAddComponent
      },
      {
        path: 'customer/edit/:id',
        canActivate: [AuthGuard],
        component: CustomerEditComponent
      },
      {
        path: 'user',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: UserListComponent
      },
      {
        path: 'user/add',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: UserAddComponent
      },
      {
        path: 'user/edit/:id',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: UserEditComponent
      },
      {
        path: 'location-code',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: LocationListComponent
      },
      {
        path: 'location-code/add',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: LocationAddComponent
      },
      {
        path: 'location-code/edit/:id',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: LocationEditComponent
      },
      {
        path: 'income',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: IncomeListComponent
      },
      {
        path: 'income/add',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: IncomeAddComponent
      },
      {
        path: 'income/edit/:id',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: IncomeEditComponent
      },
      {
        path: 'cost',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: CostListComponent
      },
      {
        path: 'cost/add',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: CostAddComponent
      },
      {
        path: 'cost/edit/:id',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: CostEditComponent
      },
      {
        path: 'merk',
        canActivate: [AuthGuard],
        component: MerkListComponent
      },
      {
        path: 'merk/add',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: MerkAddComponent
      },
      {
        path: 'merk/edit/:id',
        canActivate: [AuthGuard, RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: MerkEditComponent
      },
      {
        path: 'sales/new-order',
        canActivate: [AuthGuard],
        component: SalesAddComponent
      },
      {
        path: 'sales/end-page',
        canActivate: [AuthGuard],
        component: EndPageComponent
      },
      {
        path: 'sales',
        canActivate: [AuthGuard],
        component: SalesListComponent
      },
      {
        path: 'sales/detail/:id',
        canActivate: [AuthGuard],
        component: SalesDetailComponent
      },
      {
        path: 'sales/edit/:id',
        canActivate: [AuthGuard],
        component: SalesEditComponent
      },
      {
        path: 'purchase',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: PurchaseListComponent
      },
      {
        path: 'purchase/detail/:id',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: PurchaseDetailComponent
      },
      {
        path: 'report',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: ReportDashboardComponent
      },
      {
        path: 'report/sales-report',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: SalesReportComponent
      },
      {
        path: 'report/purchase-report',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: PurchaseReportComponent
      },
      {
        path: 'report/item-sales-report',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: ItemSalesReportComponent
      },
      {
        path: 'report/dept-report',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: HutangReportComponent
      },
      {
        path: 'report/ar-report',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: ArReportComponent
      },
      {
        path: 'report/is-report',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT', 'ADMIN']
        },
        component: IsReportComponent
      },
      {
        path: 'coa',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT','ADMIN']
        },
        component: CoaListComponent
      },
      {
        path: 'coa/coa-add',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT','ADMIN']
        },
        component: CoaAddComponent
      },
      {
        path: 'coa/coa-edit/:id',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT','ADMIN']
        },
        component: CoaEditComponent
      },
      {
        path: 'payment/debt',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT','ADMIN']
        },
        component: ListDebtComponent
      },
      {
        path: 'payment/ar',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT','ADMIN']
        },
        component: ListArComponent
      },
      {
        path: 'alert',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT','ADMIN']
        },
        component: AlertListComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
      {
        path: 'miner',
        canActivate: [AuthGuard,RoleService],
        data: {
          expectedRole: ['IT']
        },
        component: MinerComponent
      },

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //     path:'register',
  //     component: RegisterComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
