import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMerkComponent } from './dialog-add-merk.component';

describe('DialogAddMerkComponent', () => {
  let component: DialogAddMerkComponent;
  let fixture: ComponentFixture<DialogAddMerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddMerkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
