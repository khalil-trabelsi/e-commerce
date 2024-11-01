import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductReviewDialogComponent } from './add-product-review-dialog.component';

describe('AddProductReviewDialogComponent', () => {
  let component: AddProductReviewDialogComponent;
  let fixture: ComponentFixture<AddProductReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductReviewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProductReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
