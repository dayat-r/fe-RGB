import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailArComponent } from './detail-ar.component';

describe('DetailArComponent', () => {
  let component: DetailArComponent;
  let fixture: ComponentFixture<DetailArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailArComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
