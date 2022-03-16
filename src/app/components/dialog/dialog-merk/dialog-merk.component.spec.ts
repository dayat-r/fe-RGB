import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMerkComponent } from './dialog-merk.component';

describe('DialogMerkComponent', () => {
  let component: DialogMerkComponent;
  let fixture: ComponentFixture<DialogMerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMerkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
