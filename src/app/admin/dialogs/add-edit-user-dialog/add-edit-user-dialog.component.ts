import { Component, effect, Inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateFormattingService } from '../../../helpers/date-formatting.service';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrl: './add-edit-user-dialog.component.scss'
})
export class AddEditUserDialogComponent implements OnInit {
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;
  registrationValid = signal(false);
  actionType: WritableSignal<'edit' | 'create'> = signal('create');

  registrationFormGroup = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    birthdate: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, 
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    phoneNumber: this.fb.control('', [Validators.required, Validators.pattern("^((\\+33)|0)[0-9]{9}$")]),
    gender: this.fb.control('male', [Validators.required]),
    role: this.fb.control('2',  [Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {type: 'edit' | 'create', user: any},
    private refDialog: MatDialogRef<AddEditUserDialogComponent>,
    private fb: FormBuilder,
    private dateFormattingService: DateFormattingService
  ) { 
    effect(() => {
      if (this.actionType() === 'edit') {
        this.password.clearValidators();
        this.password.updateValueAndValidity();
        this.username.setValue(this.data.user.username);
        this.email.setValue(this.data.user.email);
        this.role.setValue(String(this.data.user.role.id));
        this.gender.setValue(this.data.user.gender);
        this.phoneNumber.setValue(this.data.user.phone_number)
        this.birthdate.setValue(this.data.user.birth_date)
      }
    })
  }
  
  ngOnInit(): void {
      this.actionType.set(this.data.type);
  }  

  get username() {
    return this.registrationFormGroup.controls.username;
  }
    
  get email() {
    return this.registrationFormGroup.controls.email;
  }

  get phoneNumber() {
    return this.registrationFormGroup.controls.phoneNumber;
  }

  get password() {
    return this.registrationFormGroup.controls.password
  }

  get gender() {
    return this.registrationFormGroup.controls.gender;
  }

  get role() {
    return this.registrationFormGroup.controls.role
  }

  get birthdate() {
    return this.registrationFormGroup.controls.birthdate
  }

  addUser() {

    const newUser: any = {
      username: this.username.value,
      email: this.email.value,
      phone_number: this.phoneNumber.value,
      password: this.password.value,
      gender: this.gender.value,
      role_id: this.role.value,
      birth_date: this.dateFormattingService.formatDateToYYMMDD(this.birthdate.value) 
    }

    this.refDialog.close(newUser)
  }

  updateUser() {
    const updatedUser: any = {
      username: this.username.value,
      email: this.email.value,
      phone_number: this.phoneNumber.value,
      gender: this.gender.value,
      role_id: this.role.value,
      birth_date: this.birthdate.value 
    }

    this.refDialog.close(updatedUser);
  }

}
