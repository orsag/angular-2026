import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  shareReplay,
  map,
  timer,
  startWith,
  Subject,
  switchMap,
  merge,
  exhaustMap,
  catchError,
  of,
} from 'rxjs';

export interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
}

/*
Gemini said
Adding a Cache Expiry is a sophisticated way to balance performance 
with data freshness. By combining your refreshSubject with a timer, 
you can ensure the data stays "warm" for a specific duration (e.g., 5 minutes) 
before the cache is considered stale and re-fetched automatically.

If you want the timer to stop when no one is looking at the gallery, you should change to:
refCount: true

refCount: true: The timer starts when the first component subscribes and stops when the last component unsubscribes.

refCount: false: The timer never stops. It keeps the cache warm even if no one is using it.
*/

@Injectable({ providedIn: 'root' })
export class ThumbnailService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/photos';
  private refreshSubject = new Subject<void>();

  // This timer starts at 0, then emits every 5 minutes
  private cacheExpiry$ = timer(0, 300000);

  readonly thumbnails$: Observable<Photo[]> = merge(this.refreshSubject, this.cacheExpiry$).pipe(
    // exhaustMap ignores new triggers from merge while the internal API call is active
    exhaustMap(() => {
      return this.http.get<Photo[]>(this.API_URL).pipe(
        map((photos) => photos.slice(0, 50)),
        // Handle errors inside the inner observable so the outer stream doesn't die
        catchError(() => of([])),
      );
    }),
    // shareReplay ensures the result is cached and shared
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  // Manually invalidate the cache and force a re-fetch
  refresh() {
    this.refreshSubject.next();
  }
}
