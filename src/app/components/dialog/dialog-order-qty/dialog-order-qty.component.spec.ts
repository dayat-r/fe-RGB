import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderQtyComponent } from './dialog-order-qty.component';

describe('DialogOrderQtyComponent', () => {
  let component: DialogOrderQtyComponent;
  let fixture: ComponentFixture<DialogOrderQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrderQtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
