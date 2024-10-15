import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBrandDialogComponent } from './add-edit-brand-dialog.component';

describe('AddEditBrandDialogComponent', () => {
  let component: AddEditBrandDialogComponent;
  let fixture: ComponentFixture<AddEditBrandDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditBrandDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditBrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
