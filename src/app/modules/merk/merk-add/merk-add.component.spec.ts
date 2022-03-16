import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkAddComponent } from './merk-add.component';

describe('MerkAddComponent', () => {
  let component: MerkAddComponent;
  let fixture: ComponentFixture<MerkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerkAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
