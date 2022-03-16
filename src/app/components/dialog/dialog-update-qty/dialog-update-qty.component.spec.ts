import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateQtyComponent } from './dialog-update-qty.component';

describe('DialogUpdateQtyComponent', () => {
  let component: DialogUpdateQtyComponent;
  let fixture: ComponentFixture<DialogUpdateQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateQtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
