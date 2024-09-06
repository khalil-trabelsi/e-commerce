import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../helpers/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private history!:any;
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.history = this.route.snapshot.queryParams['history'];
  }

  login() {
 
    if (this.form.controls.email.value !== null && this.form.controls.password.value !== null) {
      const request = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      }
      this.authService.signin(request).subscribe(
        response => {
          this.storageService.saveUser(response.user);
          this.storageService.saveToken(response.token)
          this.history = this.history ? this.history : response.user.role.label.includes('ADMIN') ? '/admin/dashboard' : '/profile'
          this.router.navigate([this.history]);

        }
      )
    } else {
      alert('Invalid inputs !')
    }
  }
}
