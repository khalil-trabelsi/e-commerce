import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../helpers/storage.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoggedIn = this.storageService.isLoggedIn()
  hide = true
  form = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required])
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
  ) {}

  login() {
 
    if (this.form.controls.email.value !== null && this.form.controls.password.value !== null) {
      const request = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      }
      this.authService.signin(request).subscribe(
        response => {
          this.storageService.saveUser(response.user);
          this.authService.setRole(response.user.role.label);
          localStorage.setItem('jwt', response.token)
          this.router.navigate(['/users']);
        }
      )
    } else {
      alert('Invalid inputs !')
    }
  }
}
