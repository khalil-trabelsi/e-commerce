import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStockEntryComponent } from './add-edit-stock-entry.component';

describe('AddEditStockEntryComponent', () => {
  let component: AddEditStockEntryComponent;
  let fixture: ComponentFixture<AddEditStockEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditStockEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditStockEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
