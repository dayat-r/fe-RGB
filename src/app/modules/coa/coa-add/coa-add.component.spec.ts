import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaAddComponent } from './coa-add.component';

describe('CoaAddComponent', () => {
  let component: CoaAddComponent;
  let fixture: ComponentFixture<CoaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
