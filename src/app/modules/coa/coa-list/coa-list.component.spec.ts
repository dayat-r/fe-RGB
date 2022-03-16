import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaListComponent } from './coa-list.component';

describe('CoaListComponent', () => {
  let component: CoaListComponent;
  let fixture: ComponentFixture<CoaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
