import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  save(data:any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.user.email);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  clear() {
    localStorage.clear();
  }
}
