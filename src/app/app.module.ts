import { RestApiService } from 'src/app/services/rest-api.service';
import { HttpconfigInterceptor } from './interceptor/httpconfig.interceptor';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModulesModule } from './modules/modules.module';
import { DialogModule } from './components/dialog/dialog.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ModulesModule,
		DialogModule,
		ToolbarModule,
		ImageCropperModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxBarcodeModule,
    NgxPrintModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS, useClass: HttpconfigInterceptor, multi: true
		},
		RestApiService,

	],
	bootstrap: [AppComponent]
})
export class AppModule { }
