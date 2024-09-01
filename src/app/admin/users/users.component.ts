import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { StorageService } from '../../helpers/storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  isLoggedIn = this.storageService.isLoggedIn();
  isAuthorized = this.authService.role().includes('ADMIN')
  constructor(
    private authService: AuthService,
    public usersService: UsersService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    console.log(this.isLoggedIn)
      if (!this.isLoggedIn) {
        this.router.navigate(['/auth/login'])
      }
  }

  users = this.usersService.getAllUsers()
}
