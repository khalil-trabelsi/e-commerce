import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get(`${this.api}/users`);
  }
}
