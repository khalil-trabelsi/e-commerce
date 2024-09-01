import { Component } from '@angular/core';
import { StorageService } from '../helpers/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  
  
  constructor(
    public storageService: StorageService
  ) {}
}
