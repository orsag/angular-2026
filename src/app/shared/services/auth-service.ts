import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '6738173512876378261836278723';

  public getToken() {
    return this.token;
  }
}
