import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodePrintLayoutComponent } from './barcode-print-layout.component';

describe('BarcodePrintLayoutComponent', () => {
  let component: BarcodePrintLayoutComponent;
  let fixture: ComponentFixture<BarcodePrintLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodePrintLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodePrintLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
