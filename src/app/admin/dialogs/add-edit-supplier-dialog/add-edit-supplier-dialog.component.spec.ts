import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSupplierDialogComponent } from './add-edit-supplier-dialog.component';

describe('AddEditSupplierDialogComponent', () => {
  let component: AddEditSupplierDialogComponent;
  let fixture: ComponentFixture<AddEditSupplierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditSupplierDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditSupplierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
