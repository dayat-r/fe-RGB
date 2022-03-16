import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsReportComponent } from './is-report.component';

describe('IsReportComponent', () => {
  let component: IsReportComponent;
  let fixture: ComponentFixture<IsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
