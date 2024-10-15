import { Component, Inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Supplier } from '../../models/Supplier';

@Component({
  selector: 'app-add-edit-supplier-dialog',
  templateUrl: './add-edit-supplier-dialog.component.html',
  styleUrl: './add-edit-supplier-dialog.component.scss'
})
export class AddEditSupplierDialogComponent implements OnInit {
  actionType: string = 'create'
  supplierFormGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {type: string, supplier?: any},
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditSupplierDialogComponent>
  ) {
    this.actionType = data.type;
  }

  ngOnInit(): void {
    if (this.actionType === 'create') {
      this.supplierFormGroup = this.fb.group(
        {
          'name': this.fb.control('', [Validators.required]),
          'contactName': this.fb.control('', [Validators.required]),
          'email': this.fb.control('', [Validators.required, Validators.email]),
          'phone': this.fb.control('', [Validators.required]),
          'address': this.fb.control('', [Validators.required]),
          'city': this.fb.control('', [Validators.required]),
          'zipcode': this.fb.control('', [Validators.required]),
          'country': this.fb.control('', [Validators.required]),
        }
      )
    } else {
      this.supplierFormGroup = this.fb.group(
        {
          'name': this.fb.control(this.data.supplier.name, [Validators.required]),
          'contactName': this.fb.control(this.data.supplier.contact_name, [Validators.required]),
          'email': this.fb.control(this.data.supplier.email, [Validators.required, Validators.email]),
          'phone': this.fb.control(this.data.supplier.phone, [Validators.required]),
          'address': this.fb.control(this.data.supplier.address, [Validators.required]),
          'city': this.fb.control(this.data.supplier.city, [Validators.required]),
          'zipcode': this.fb.control(this.data.supplier.zipcode, [Validators.required]),
          'country': this.fb.control(this.data.supplier.country, [Validators.required]),
        }
      )
    }
   
  }

  get name() {
    return this.supplierFormGroup.controls['name'];
  }

  get contactName() {
    return this.supplierFormGroup.controls['contactName'];
  }

  get phone() {
    return this.supplierFormGroup.controls['phone'];
  }

  get email() {
    return this.supplierFormGroup.controls['email'];
  }

  get address() {
    return this.supplierFormGroup.controls['address'];
  }

  get country() {
    return this.supplierFormGroup.controls['country'];
  }

  get zipcode() {
    return this.supplierFormGroup.controls['zipcode'];
  }

  get city() {
    return this.supplierFormGroup.controls['city'];
  }


  addSupplier() {
    const newSupplier = {
      name: this.name.value,
      contact_name: this.contactName.value,
      email: this.email.value,
      address: this.address.value,
      country: this.country.value,
      zipcode: this.zipcode.value,
      city: this.city.value,
      phone: this.phone.value,
    };

    this.dialogRef.close(newSupplier);
  }

  editSupplier() {
    const supplier = {
      name: this.name.value,
      contact_name: this.contactName.value,
      email: this.email.value,
      address: this.address.value,
      country: this.country.value,
      zipcode: this.zipcode.value,
      city: this.city.value,
      phone: this.phone.value,
    };

    this.dialogRef.close(supplier);
  }
}
