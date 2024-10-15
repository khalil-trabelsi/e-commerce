import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../helpers/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  username = ''

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
      this.username = this.storageService.getCurrentUsername()
  }
}
