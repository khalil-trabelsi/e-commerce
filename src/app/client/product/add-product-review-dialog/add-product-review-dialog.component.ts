import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../admin/services/products.service';

@Component({
  selector: 'app-add-product-review-dialog',
  templateUrl: './add-product-review-dialog.component.html',
  styleUrl: './add-product-review-dialog.component.scss'
})
export class AddProductReviewDialogComponent {

  ratingHovered = 0;
  ratingSelected = 0;

  ratingFormGroup = this.fb.group({
    rating: this.fb.control(0),
    username: this.fb.control('', [Validators.required]),
    title: this.fb.control('', [Validators.required]),
    comment: this.fb.control('',[Validators.required])
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddProductReviewDialogComponent>,
    private fb: FormBuilder,
    private productService: ProductsService
  ) {}

  onMouseEnter(starIndex: number) {
    this.ratingHovered = starIndex
  }

  onMouseLeave() {
    this.ratingHovered = 0
  }

  onStarClick(starIndex: number) {
    this.ratingSelected = starIndex;
    this.ratingFormGroup.controls.rating.setValue(this.ratingSelected);
  }

  clearRating() {
    this.ratingSelected = 0;
    this.ratingFormGroup.controls.rating.setValue(0)
  }

  onSubmit() {
    if (this.ratingFormGroup.valid) {
      this.dialogRef.close(
        this.ratingFormGroup.value
      )
    }
  }
}
