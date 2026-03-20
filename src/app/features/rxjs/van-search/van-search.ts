import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, tap, switchMap, of } from 'rxjs';
import { VanVehicle } from '@types';

type SortKey = 'cargoCapacity' | 'category' | 'seats' | 'brand';

@Component({
  selector: 'app-van-search',
  imports: [],
  templateUrl: './van-search.html',
  styleUrl: './van-search.scss',
})
export class VanSearch {
  private http = inject(HttpClient);
  // State Signals
  searchQuery = signal<string>('');
  // The Sort Control
  sortAscending = signal<boolean>(true);

  sortBy = signal<SortKey>('cargoCapacity');

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // RxJS Logic Bridge
  // We use switchMap to toggle between "All" and "Search"
  private vanStream$ = toObservable(this.searchQuery).pipe(
    debounceTime(400),
    distinctUntilChanged(),
    tap(() => {
      this.isLoading.set(true);
      this.errorMessage.set(null);
    }),
    switchMap((query) => {
      // If query is empty, call the 'All' endpoint, otherwise 'Search'
      return query.trim() === '' ? this.getAllVans() : this.searchVans(query);
    }),
    tap(() => this.isLoading.set(false)),
  );

  // 3. Raw Data Signal (renamed to 'rawVans' for clarity)
  private rawVans = toSignal(this.vanStream$, { initialValue: [] as VanVehicle[] });

  // This is now "multi-purpose"
  sortedVans = computed(() => {
    const list = [...this.rawVans()];
    const key = this.sortBy();
    const direction = this.sortAscending() ? 1 : -1;

    return list.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      // Handle string vs number comparison
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * direction;
      }

      return ((valA as number) - (valB as number)) * direction;
    });
  });

  // Helper to update sort criteria from the <select>
  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as SortKey;
    this.sortBy.set(value);
  }

  updateSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  private searchVans(query: string) {
    if (!query.trim()) return of([]);
    return this.http.get<VanVehicle[]>(`/api/vans?q=${query}`);
  }

  private getAllVans() {
    return this.http.get<VanVehicle[]>(`/api/vans/all`);
  }
}
