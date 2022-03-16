import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCropImageComponent } from './dialog-crop-image.component';

describe('DialogCropImageComponent', () => {
  let component: DialogCropImageComponent;
  let fixture: ComponentFixture<DialogCropImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCropImageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCropImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
