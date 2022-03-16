import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  localStorage: any;
  constructor(
    public http: HttpClient
  ) { }

  getHeader() {
    const token = localStorage.getItem('token-sion');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }
  link_url() {
    const url = environment.urlApi;
    return url
  }

  link_url_public() {
    const url = environment.urlApiPublic;
    return url
  }


  // start auth
  login(data: any) {
    return this.http.post(`${this.link_url_public()}/login`, data).toPromise();
  }
  Register(data: any) {
    return this.http.post(`${this.link_url_public()}/register`, data).toPromise();
  }

  //end auth
  cekImageMerk(data: string) {
    return this.http.get(`${this.link_url_public()}/uploads/merk/${data}`).toPromise();
  }
  // item
  saveItem(data: any) {
    return this.http.post(`${this.link_url()}/api-item`, data, { headers: this.getHeader()! }).toPromise();
  }
  getItem(data:any) {
    return this.http.get(`${this.link_url()}/api-item?cari=${data.cari}&filter=${data.merk}&lastId=${data.lastId}`, { headers: this.getHeader()! }).toPromise();
  }
  // getItem(cari: any, merk: any) {
  //   return this.http.get(`${this.link_url()}/api-item?cari=${cari}&filter=${merk}`, { headers: this.getHeader()! }).toPromise();
  // }
  updateItem(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-item/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getItemById(id: any) {
    return this.http.get(`${this.link_url()}/api-item/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteItem(id: any) {
    return this.http.delete(`${this.link_url()}/api-item/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end item
  // supllier
  saveSupplier(data: any) {
    return this.http.post(`${this.link_url()}/api-supplier`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateSupplier(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-supplier/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getSupplier(cari: any) {
    return this.http.get(`${this.link_url()}/api-supplier?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }
  getSupplierById(id: any) {
    return this.http.get(`${this.link_url()}/api-supplier/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteSupplier(id: any) {
    return this.http.delete(`${this.link_url()}/api-supplier/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end supplier
  // customer
  saveCustomer(data: any) {
    return this.http.post(`${this.link_url()}/api-customer`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateCustomer(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-customer/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getCustomer(cari: any) {
    return this.http.get(`${this.link_url()}/api-customer?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }
  getCustomerById(id: any) {
    return this.http.get(`${this.link_url()}/api-customer/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteCustomer(id: any) {
    return this.http.delete(`${this.link_url()}/api-customer/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end customer
  // user
  saveUser(data: any) {
    return this.http.post(`${this.link_url()}/api-user`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateUser(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-user/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateUserPassword(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-user/update-password/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getUser(cari: any) {
    return this.http.get(`${this.link_url()}/api-user?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }
  getUserById(id: any) {
    return this.http.get(`${this.link_url()}/api-user/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteUser(id: any) {
    return this.http.delete(`${this.link_url()}/api-user/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end user
  // location code
  saveLocationCode(data: any) {
    return this.http.post(`${this.link_url()}/api-location-code`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateLocationCode(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-location-code/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getLocationCode(cari: any) {
    return this.http.get(`${this.link_url()}/api-location-code?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }
  getLocationCodeById(id: any) {
    return this.http.get(`${this.link_url()}/api-location-code/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteLocationCode(id: any) {
    return this.http.delete(`${this.link_url()}/api-location-code/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end location code
  // income
  saveIncome(data: any) {
    return this.http.post(`${this.link_url()}/api-income`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateIncome(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-income/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getIncome(cari: any) {
    return this.http.get(`${this.link_url()}/api-income?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }


  getIncomeById(id: any) {
    return this.http.get(`${this.link_url()}/api-income/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteIncome(id: any) {
    return this.http.delete(`${this.link_url()}/api-income/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end income
  // cost
  saveCost(data: any) {
    return this.http.post(`${this.link_url()}/api-cost`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateCost(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-cost/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getCost(cari: any) {
    return this.http.get(`${this.link_url()}/api-cost?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }
  getCostById(id: any) {
    return this.http.get(`${this.link_url()}/api-cost/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteCost(id: any) {
    return this.http.delete(`${this.link_url()}/api-cost/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end cost
  // coa
  saveCoa(data: any) {
    return this.http.post(`${this.link_url()}/api-coa`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateCoa(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-coa/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getCoa(cari: any) {
    return this.http.get(`${this.link_url()}/api-coa?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }
  getCoaById(id: any) {
    return this.http.get(`${this.link_url()}/api-coa/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  getCoaByNo(type: number) {
    return this.http.get(`${this.link_url()}/api-coa/by-no?type=${type}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteCoa(id: any) {
    return this.http.delete(`${this.link_url()}/api-coa/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end coa
  // pembayaran
  savePembayaran(data: any) {
    return this.http.post(`${this.link_url()}/api-pembayaran`, data, { headers: this.getHeader()! }).toPromise();
  }
  paymentPurchase(data: any) {
    return this.http.post(`${this.link_url()}/api-pembayaran/payment-purchase`, data, { headers: this.getHeader()! }).toPromise();
  }
  paymentSales(data: any) {
    return this.http.post(`${this.link_url()}/api-pembayaran/payment-sales`, data, { headers: this.getHeader()! }).toPromise();
  }
  updatePembayaran(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-pembayaran/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getPembayaran(cari: any) {
    return this.http.get(`${this.link_url()}/api-pembayaran?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }
  getPembayaranById(id: any) {
    return this.http.get(`${this.link_url()}/api-pembayaran/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deletePembayaran(id: any) {
    return this.http.delete(`${this.link_url()}/api-pembayaran/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end pembayaran
  // alert
  saveAlert(data: any) {
    return this.http.post(`${this.link_url()}/api-alert`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateAlert(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-alert/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getAlert() {
    return this.http.get(`${this.link_url()}/api-alert`, { headers: this.getHeader()! }).toPromise();
  }
  getAlertActive() {
    return this.http.get(`${this.link_url()}/api-alert/active`, { headers: this.getHeader()! }).toPromise();
  }
  getCheckDate(filterPurchase: any, filterSales: any) {
    return this.http.get(`${this.link_url()}/api-alert/check-date?filterPurchase=${filterPurchase}&filterSales=${filterSales}`, { headers: this.getHeader()! }).toPromise();
  }
  getAlertById(id: any) {
    return this.http.get(`${this.link_url()}/api-alert/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteAlert(id: any) {
    return this.http.delete(`${this.link_url()}/api-alert/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end alert
  // merk
  saveMerk(data: any) {
    return this.http.post(`${this.link_url()}/api-merk`, data, { headers: this.getHeader()! }).toPromise();
  }
  updateMerk(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-merk/update/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  getMerk(cari: any) {
    return this.http.get(`${this.link_url()}/api-merk?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }
  getMerkById(id: any) {
    return this.http.get(`${this.link_url()}/api-merk/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  deleteMerk(id: any) {
    return this.http.delete(`${this.link_url()}/api-merk/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  // end merk

  // actual stock
  getActualStockByBarcode(id: any) {
    return this.http.get(`${this.link_url()}/api-actual-stock/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
  }
  getActualStockByBarcodeNo(id: any) {
    return this.http.get(`${this.link_url()}/api-actual-stock/by-id/${id}?all=true`, { headers: this.getHeader()! }).toPromise();
  }
  restockProduct(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-actual-stock/restock/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  transferProduct(id: any, data: any) {
    return this.http.post(`${this.link_url()}/api-actual-stock/transfer/${id}`, data, { headers: this.getHeader()! }).toPromise();
  }
  // end actual

  getDashboard(startDate: any, endDate: any) {
    return this.http.get(`${this.link_url()}/api-income/dashboard?startDate=${startDate}&endDate=${endDate}`, { headers: this.getHeader()! }).toPromise();
  }

  // Order
  saveOrder(data: any) {
    return this.http.post(`${this.link_url()}/api-order`, data, { headers: this.getHeader()! }).toPromise();
  }

  getListSales(cari: string, filter: any) {
    return this.http.get(`${this.link_url()}/api-order/sales-list?cari=${cari}&filter=${filter}`, { headers: this.getHeader()! }).toPromise();
  }
  getListSalesCredit(cari: string,) {
    return this.http.get(`${this.link_url()}/api-order/sales-list/credit?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
  }

  getSalesDetail(idSales: string) {
    return this.http.get(`${this.link_url()}/api-order/sales-detail/${idSales}`, { headers: this.getHeader()! }).toPromise();
  }


  updateSalesDetail(idSales: String, data: any) {
    return this.http.put(`${this.link_url()}/api-order/edit/${idSales}`, data, { headers: this.getHeader()! }).toPromise();
  }

  getPurchaseList(filter:string) {
		return this.http.get(`${this.link_url()}/api-purchase?filter=${filter}`, { headers: this.getHeader()! }).toPromise();
	}
  getPurchaseById(id:any) {
		return this.http.get(`${this.link_url()}/api-purchase/by-id/${id}`, { headers: this.getHeader()! }).toPromise();
	}
  getPurchaseListCredit(cari:string) {
		return this.http.get(`${this.link_url()}/api-purchase/credit?cari=${cari}`, { headers: this.getHeader()! }).toPromise();
	}
  deletePurchase(id:any) {
		return this.http.delete(`${this.link_url()}/api-purchase/${id}`, { headers: this.getHeader()! }).toPromise();
	}

  deleteSales(idSales: String) {
    return this.http.delete(`${this.link_url()}/api-order/${idSales}`, { headers: this.getHeader()! }).toPromise();
  }


  // end actual

  getDashboardReport() {
    return this.http.get(`${this.link_url()}/api-report/dashboard`, { headers: this.getHeader()! }).toPromise();
  }
  getSalesReport(startDate: any, endDate: any) {
    return this.http.get(`${this.link_url()}/api-report/sales?startDate=${startDate}&endDate=${endDate}`, { headers: this.getHeader()! }).toPromise();
  }
  getPurchaseReport(startDate: any, endDate: any) {
    return this.http.get(`${this.link_url()}/api-report/purchase?startDate=${startDate}&endDate=${endDate}`, { headers: this.getHeader()! }).toPromise();
  }
  getItemSalesReport(startDate: any, endDate: any, barcode: string) {
    return this.http.get(`${this.link_url()}/api-report/item-sales?startDate=${startDate}&endDate=${endDate}&barcode=${barcode}`, { headers: this.getHeader()! }).toPromise();
  }
  getDebtReport(startDate: any, endDate: any) {
    return this.http.get(`${this.link_url()}/api-report/debt?startDate=${startDate}&endDate=${endDate}`, { headers: this.getHeader()! }).toPromise();
  }
  getArReport(startDate: any, endDate: any) {
    return this.http.get(`${this.link_url()}/api-report/ar?startDate=${startDate}&endDate=${endDate}`, { headers: this.getHeader()! }).toPromise();
  }
  getIsReport(startDate: any, endDate: any) {
    return this.http.get(`${this.link_url()}/api-report/is?startDate=${startDate}&endDate=${endDate}`, { headers: this.getHeader()! }).toPromise();
  }


  // iot
  updateStatusMiner(idDevice: String, data: any) {
    return this.http.put(`${this.link_url()}/api-iot/update/${idDevice}`, data, { headers: this.getHeader()! }).toPromise();
  }

  getMinerByidDevice(idDevice:string) {
		return this.http.get(`${this.link_url()}/api-iot/app-by-id/${idDevice}`, { headers: this.getHeader()! }).toPromise();
	}

}
