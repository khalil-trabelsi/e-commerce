import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models/category';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-add-edit-category-dialog',
  templateUrl: './add-edit-category-dialog.component.html',
  styleUrl: './add-edit-category-dialog.component.scss'
})
export class AddEditCategoryDialogComponent implements OnInit {
  actionType = 'create';
  allCategories = toSignal(this.categoriesService.getAllCategories(), {initialValue: []})
  categoryFormGroup!: FormGroup;
  multiple = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {type: 'create' | 'edit', category?: Category },
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialogRef<AddEditCategoryDialogComponent>
  ) {}

  ngOnInit(): void {
      this.categoryFormGroup = this.fb.group(
        {
          name: this.fb.control('', [Validators.required, Validators.minLength(4)]),
          parent_id: this.fb.control(0),
          description: this.fb.control('')
        }
      )
  }

  get name() {
    return this.categoryFormGroup.controls['name'];
  }

  get parentId() {
    return this.categoryFormGroup.controls['parent_id'];
  }

  get description() {
    return this.categoryFormGroup.controls['description'];
  }

  addCategory() {
    const category: any = {
      name: this.name.value,
      description: this.description.value,
    }

    if (this.parentId.value != 0) {
      category['parent_id'] = this.parentId.value
    }
    this.dialogRef.close(category)
  }

  editCategory() {

  }

  getSelectedOptions(value: any) {
    this.parentId.setValue(value.selectedOptions)
  }

}
