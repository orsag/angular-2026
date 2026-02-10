import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-storage',
  imports: [],
  templateUrl: './storage.html',
  styleUrl: './storage.scss',
})
export class Storage {
  constructor(private cookie: CookieService) {}

  sessionValue: string = '';
  localValue: string = '';
  cookieValue: string = '';

  setSession() {
    sessionStorage.setItem('name', 'session');
    sessionStorage.setItem('pass', 'session123');
  }

  getSession() {
    this.sessionValue = sessionStorage.getItem('name') ?? '';
  }

  removeSession() {
    sessionStorage.removeItem('pass');
  }

  clearSession() {
    sessionStorage.clear();
    this.sessionValue = '';
  }

  setLocal() {
    localStorage.setItem('username', 'local');
    localStorage.setItem('password', 'local123');
  }

  getLocal() {
    this.localValue = localStorage.getItem('username') ?? '';
  }

  removeLocal() {
    localStorage.removeItem('password');
  }

  clearLocal() {
    localStorage.clear();
    this.localValue = '';
  }

  setCookie() {
    this.cookie.set('token1', '12345', 1);
    this.cookie.set('token2', 'xyz');
  }

  getCookie() {
    this.cookieValue = this.cookie.get('token1');
  }

  deleteCookie() {
    // this.cookie.delete('token1');
    this.cookie.deleteAll();
    this.cookieValue = '';
  }
}
