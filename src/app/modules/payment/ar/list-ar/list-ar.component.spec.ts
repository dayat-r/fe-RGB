import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArComponent } from './list-ar.component';

describe('ListArComponent', () => {
  let component: ListArComponent;
  let fixture: ComponentFixture<ListArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
