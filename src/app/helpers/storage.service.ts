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
    window.localStorage.clear()
  }

  saveUser(user: any) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  getUser() {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {}
  }

  getCurrentUsername() {
    const user = JSON.parse(window.localStorage.getItem(USER_KEY)!);
    return user.username ? user.username : `${user.first_name} ${user.last_name}`
  }

  getCurrentUserEmail() {
    const user = JSON.parse(window.localStorage.getItem(USER_KEY)!);
    return user ? user.email : '';
  }

  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token)
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY)
  }

  saveRefreshToken(token: string): void {
    window.localStorage.removeItem(REFRESHTOKEN_KEY);
    window.localStorage.setItem(REFRESHTOKEN_KEY, token)
  }

  getRefreshToken(): string | null {
    return window.localStorage.getItem(REFRESHTOKEN_KEY)
  }

  isLoggedIn(): boolean {
    return window.localStorage.getItem(USER_KEY) ? true : false;
  }
  
}
