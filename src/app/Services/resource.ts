import { HttpClient, httpResource } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Injectable, resource } from '@angular/core';
import { Iuser } from '../iuser';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class Resource {
  // private http = inject(HttpClient);
  constructor(private http: HttpClient) {}

  base_url: string = 'https://fake-store-api.mock.beeceptor.com';

  // getAllData(){
  //   return this.http.get(`${this.base_url}/api/users`);
  // }

  // rxResource returns a resource signal with these properties: value() status() error()
  rxResourceData = rxResource({
    //params: () => ({ id: this.userId() }),
    stream: () => this.http.get(`${this.base_url}/api/users`) as Observable<User>,
  });

  // rxResourceData = httpResource<Iuser[]>(() => ({
  //   url: `${this.base_url}/api/users`,
  //   method: 'GET',
  // }));

  resourceData = resource({
    loader: () => fetch(`${this.base_url}/api/users`).then((res) => res.json() as Promise<any>),
  });
}
