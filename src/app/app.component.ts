import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'fe-Apps';

	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer,
    public dataService : DataService,
    private swUpdate : SwUpdate,
    private snackbar : MatSnackBar
	) {

    this.swUpdate.available.subscribe(event => {
      const snack = this.snackbar.open("Versi baru telah tersedia ", "Perbarui");
      snack.onAction().subscribe(() => {
          window.location.reload();
      })
  })
		this.matIconRegistry.addSvgIcon(
			'logo-app',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/image/logo-apps.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-delete',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/delete.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-edit',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/edit.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-back',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/back.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-menu',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/menu.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-notification',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/notification.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-plus-circle',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/plus-circle.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-plus',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/plus.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-add-item',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/add-item.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-arrow-left',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/arrow-left.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-close-fill',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/close-fill.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-close',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/close.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-search',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/search.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'icon-new-order',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/new-order.svg')
		);
    this.matIconRegistry.addSvgIcon(
			'icon-cost',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/cost.svg')
		);
    this.matIconRegistry.addSvgIcon(
			'icon-income',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/income.svg')
		);
    this.matIconRegistry.addSvgIcon(
			'icon-buy',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/buy.svg')
		);
    this.matIconRegistry.addSvgIcon(
			'icon-list-order',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/list-order.svg')
		);
    this.matIconRegistry.addSvgIcon(
			'icon-transfer',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/transfer.svg')
		);
    this.matIconRegistry.addSvgIcon(
			'icon-merk',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/merk.svg')
		);
    this.matIconRegistry.addSvgIcon(
			'icon-barcode',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/barcode.svg')
		);
    this.matIconRegistry.addSvgIcon(
			'icon-item',
			this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/item.svg')
		);
	}


}
