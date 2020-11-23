import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn());

  constructor() { }

  save(data:any) {
    this.loginStatus.next(true);
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
    this.loginStatus.next(false);
    localStorage.clear();
  }
}
