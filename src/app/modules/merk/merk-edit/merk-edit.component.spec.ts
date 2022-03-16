import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkEditComponent } from './merk-edit.component';

describe('MerkEditComponent', () => {
  let component: MerkEditComponent;
  let fixture: ComponentFixture<MerkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
