import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HutangReportComponent } from './hutang-report.component';

describe('HutangReportComponent', () => {
  let component: HutangReportComponent;
  let fixture: ComponentFixture<HutangReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HutangReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HutangReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
