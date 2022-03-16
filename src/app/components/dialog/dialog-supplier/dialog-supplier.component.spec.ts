import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSupplierComponent } from './dialog-supplier.component';

describe('DialogSupplierComponent', () => {
  let component: DialogSupplierComponent;
  let fixture: ComponentFixture<DialogSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
