import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppComponent } from './customer-app.component';

describe('CustomerAppComponent', () => {
  let component: CustomerAppComponent;
  let fixture: ComponentFixture<CustomerAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
