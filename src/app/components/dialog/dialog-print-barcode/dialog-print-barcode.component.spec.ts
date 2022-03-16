import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrintBarcodeComponent } from './dialog-print-barcode.component';

describe('DialogPrintBarcodeComponent', () => {
  let component: DialogPrintBarcodeComponent;
  let fixture: ComponentFixture<DialogPrintBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPrintBarcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPrintBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
