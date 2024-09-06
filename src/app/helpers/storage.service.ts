import { Injectable } from '@angular/core';


const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';

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

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY)
  }

  saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token)
  }

  getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY)
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return true;
    }

    return false;
  }

  
}
