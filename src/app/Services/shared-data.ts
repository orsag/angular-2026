import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {Employee} from '../types';

@Injectable({
  providedIn: 'root',
})
export class SharedData {
  API_URL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private _http: HttpClient) {}

  userData = {
    id: 1,
    name: 'John',
    username: 'john',
    email: 'john@gmail.com',
    subscription: 'basic',
  };

  isEligibleForSubscription() {
    if (this.userData.subscription == 'basic' && this.userData.email.endsWith('@gmail.com')) {
      return true;
    } else {
      return false;
    }
  }

  getUserData() {
    return this._http.get<Employee[]>(this.API_URL);
  }

  setLocalStorage(nameKey: string, value: string) {
    if (nameKey.trim().length > 0 && value.trim().length > 0) {
      localStorage.setItem(nameKey, value);
    }
  }

  getLocalStorage(nameKey: string) {
    return localStorage.getItem(nameKey) ?? '';
  }

  removeLocalStorage(nameKey: string) {
    localStorage.removeItem(nameKey);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
