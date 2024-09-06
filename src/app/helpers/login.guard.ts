import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageService } from './storage.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService)

  if(storageService.isLoggedIn()) {
    return false;
  }

  return true;
};
