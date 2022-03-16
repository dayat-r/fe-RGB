import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCoaComponent } from './dialog-add-coa.component';

describe('DialogAddCoaComponent', () => {
  let component: DialogAddCoaComponent;
  let fixture: ComponentFixture<DialogAddCoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddCoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
