import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from '../../models/brands';

@Component({
  selector: 'app-add-edit-brand-dialog',
  templateUrl: './add-edit-brand-dialog.component.html',
  styleUrl: './add-edit-brand-dialog.component.scss'
})
export class AddEditBrandDialogComponent implements OnInit {
  actionType: 'create' | 'edit' = 'create';
  brandFormGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {type: 'cerate' | 'edit', brand: Brand},
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditBrandDialogComponent>
  ) {}

  ngOnInit(): void {
      this.brandFormGroup = this.fb.group(
        {
          name: this.fb.control('', [Validators.required]),
          description: this.fb.control('')
        }
      )
  }


  get name() {
    return this.brandFormGroup.controls['name']
  }

  get description() {
    return this.brandFormGroup.controls['description']
  }

  addBrand() {
    this.dialogRef.close(
      this.brandFormGroup.value
    )
  }

  editBrand() {

  }

}
