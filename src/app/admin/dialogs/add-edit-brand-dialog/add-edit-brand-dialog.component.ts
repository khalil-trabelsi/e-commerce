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
  selectedImage!: File | null;
  selectedImageUrl!: string | ArrayBuffer | null;
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
    const formData = new FormData();
    if (this.selectedImage) {
      formData.append('file', this.selectedImage, this.selectedImage.name)
      formData.append('alt', this.description.value)
      this.dialogRef.close(
        {brand: this.brandFormGroup.value, image: formData}
      )
    }

  }

  editBrand() { 

  }

  onFileSelected(event: Event) {
    const inputElt = event.target as HTMLInputElement;
    if (inputElt?.files && inputElt.files.length > 0) {
      this.selectedImage = inputElt.files[0];

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImageUrl = (e.target?.result)!;
      }

      reader.readAsDataURL(this.selectedImage)
    }
    console.log(this.selectedImageUrl)
  }

  deleteImage(): void {
    this.selectedImageUrl = null;
    this.selectedImage = null;
  }
}
