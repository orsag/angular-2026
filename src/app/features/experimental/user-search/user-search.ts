import { Component, signal } from '@angular/core';
import { httpResource, HttpResourceRequest } from '@angular/common/http';
import { z as zod } from 'zod';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

const UsersSchema = zod.array(
  zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
);

const API_URL = `https://jsonplaceholder.typicode.com/users`;

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-user-search',
  imports: [],
  templateUrl: './user-search.html',
  styleUrl: './user-search.scss',
})
export class UserSearch {
  query = signal('');

  debouncedQuery = toSignal(
    toObservable(this.query).pipe(debounceTime(400), distinctUntilChanged()),
    { initialValue: '' },
  );

  users = httpResource<User[]>(
    () =>
      ({
        url: `${API_URL}?name_like=^${this.debouncedQuery()}`,
        headers: {},
      }) as HttpResourceRequest,
    {
      defaultValue: [],
      parse: (rawData) => UsersSchema.parse(rawData),
    },
  );
}
