import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@types';

@Injectable({
  providedIn: 'root',
})
export class Crud {
  base_url: string = 'http://localhost:3000/Users';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<User[]>(this.base_url);
  }

  // rxResource = rxResource({
  //   loader : () => this.http.get(this.base_url)
  // })

  postData(data: User) {
    return this.http.post(this.base_url, data);
  }

  getDataById(id: number) {
    return this.http.get<User>(`${this.base_url}/${id}`);
  }

  putDataById(id: number, data: User) {
    return this.http.put(`${this.base_url}/${id}`, data);
  }

  deleteData(id: number) {
    return this.http.delete(`${this.base_url}/${id}`);
  }
}
