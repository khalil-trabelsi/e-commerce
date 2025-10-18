import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../helpers/storage.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent implements OnInit{
  private user!: User;
  userInfosForm = this.fb.group(
    {
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      birthdate: this.fb.control(''),
      gender: this.fb.control('')
    }
  )
  constructor(
    private storageService: StorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.storageService.getUser();
    this.userInfosForm.controls.firstName.setValue(this.user.first_name!);
    this.userInfosForm.controls.lastName.setValue(this.user.last_name!);
    this.userInfosForm.controls.gender.setValue(this.user.gender!);
    this.userInfosForm.controls.birthdate.setValue(this.user.birth_date!);
  }
}
