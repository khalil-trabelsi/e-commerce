import { Injectable } from '@angular/core';


const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean() {
    window.sessionStorage.clear()
  }

  saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {}
  }

  isLoggedIn() {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return true;
    }

    return false;
  }

  
}
