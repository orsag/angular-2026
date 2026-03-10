import { HttpClient, httpResource } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Injectable, resource, signal } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { NewUser, SingleUser } from '../types';

@Injectable({
  providedIn: 'root',
})
export class Resource {
  // private http = inject(HttpClient);
  constructor(private http: HttpClient) {}

  private selectedUserId = signal<number | undefined>(undefined);

  base_url: string = 'https://fakestoreapi.com';

  // getAllData(){
  //   return this.http.get(`${this.base_url}/api/users`);
  // }

  // rxResource returns a resource signal with these properties: value() status() error()
  rxResourceData = rxResource({
    //params: () => ({ id: this.userId() }),
    stream: () => this.http.get(`${this.base_url}/users`) as Observable<SingleUser[]>,
  });

  userResource = rxResource({
    params: () => this.selectedUserId(),
    stream: ({ params }) => {
      const id = params;
      if (id === null || id === undefined) return EMPTY;
      return this.http.get<SingleUser>(`${this.base_url}/users/${id}`);
    },
  });

  loadUser(id: number) {
    this.selectedUserId.set(id);
  }

  // rxResourceData = httpResource<Iuser[]>(() => ({
  //   url: `${this.base_url}/api/users`,
  //   method: 'GET',
  // }));

  // resourceData = resource({
  //   loader: () =>
  //     fetch(`${this.base_url}/users`).then((res) => res.json() as Promise<NewUser[]>),
  // });
}
