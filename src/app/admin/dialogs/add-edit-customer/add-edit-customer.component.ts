import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrl: './add-edit-customer.component.scss'
})
export class AddEditCustomerComponent implements OnInit {

    customerFormGroup = this.fb.group({
      first_name: this.fb.control(''),
      last_name: this.fb.control(''),
      birthdate: this.fb.control(''),
      email: this.fb.control(''),
      password: this.fb.control(''),
      phoneNumber: this.fb.control(''),
      gender: this.fb.control('male'),
      role: this.fb.control('2')
    });
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditCustomerComponent>,
    private fb: FormBuilder
  ) {}



  ngOnInit(): void {
      
  }

  addCustomer() {
    const newCustomer = {
      first_name: this.customerFormGroup.value.first_name ?? '',
      last_name: this.customerFormGroup.value.last_name ?? '',
      birth_date: this.customerFormGroup.value.birthdate ?? '',
      email: this.customerFormGroup.value.email ?? '',
      phone_number: this.customerFormGroup.value.phoneNumber ?? '',
      password: this.customerFormGroup.value.password ?? '',
      gender: this.customerFormGroup.value.gender ?? '',
      role_id: this.customerFormGroup.value.role ?? '',
    }

    this.dialogRef.close(newCustomer);
  }
}
