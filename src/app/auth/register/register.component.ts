import { Component, OnDestroy, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NotificationService } from '../../helpers/notification.service';
import { DateFormattingService } from '../../helpers/date-formatting.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;
  registrationValid = signal(false);

  registrationFormGroup = this.fb.group({
    firstName: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    lastName: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    birthdate: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, 
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    phoneNumber: this.fb.control('', [Validators.required, Validators.pattern("^((\\+33)|0)[0-9]{9}$")]),
    gender: this.fb.control('male', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dateFormatteingService: DateFormattingService,
    private router: Router
  ) { }

  saveUser() {
    const user = {
      first_name: this.registrationFormGroup.controls.firstName.value,
      last_name: this.registrationFormGroup.controls.lastName.value,
      birth_date: this.dateFormatteingService.formatDateToYYMMDD(this.registrationFormGroup.controls.birthdate.value),
      email: this.registrationFormGroup.controls.email.value,
      password: this.registrationFormGroup.controls.password.value,
      gender: this.registrationFormGroup.controls.gender.value,
      phone_number: this.registrationFormGroup.controls.phoneNumber.value,
      role_id: 2
    }
    this.authService.register(user).pipe(takeUntil(this.destroy$)).pipe(
      switchMap(_ => this.authService.signin({email: user.email ?? '', password: user.password ?? ''}))
    ).subscribe(val => {
      if (val) {
        this.notificationService.notify('Votre compte a été bien crée', 'ok');
        this.formRef.resetForm();
        this.router.navigate(['/register/confirmation'])
      }
    });
  }



  get firstName() {
    return this.registrationFormGroup.controls.firstName;
  }

  get lastName() {
    return this.registrationFormGroup.controls.lastName;
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

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
