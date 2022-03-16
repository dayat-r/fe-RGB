import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaEditComponent } from './coa-edit.component';

describe('CoaEditComponent', () => {
  let component: CoaEditComponent;
  let fixture: ComponentFixture<CoaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
