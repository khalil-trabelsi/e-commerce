import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../helpers/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ChatWsService } from '../../services/chat-ws.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private previousLocation!:any;
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
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.previousLocation = this.route.snapshot.queryParamMap.get('location');
    this.route.queryParamMap.subscribe(
      data => console.log(data)
    )
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
          this.storageService.saveAccessToken(response.access_token);
          this.storageService.saveRefreshToken(response.refresh_token);
          
          this.previousLocation = this.previousLocation ? this.previousLocation : response.user?.role?.label.includes('ADMIN') ? '/admin/dashboard' : '/'
          this.router.navigate([this.previousLocation]);
        }
      )
    } else {
      alert('Invalid inputs !')
    }
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
