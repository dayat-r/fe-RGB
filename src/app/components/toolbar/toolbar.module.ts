import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';



@NgModule({
	declarations: [
		ToolbarComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		AvatarModule
	],
	exports:[ToolbarComponent]
})
export class ToolbarModule { }
