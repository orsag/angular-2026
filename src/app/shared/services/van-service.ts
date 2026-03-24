import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  switchMap,
  tap,
  debounceTime,
  distinctUntilChanged,
  Observable, catchError,
} from 'rxjs';
import { VanVehicle } from '@types';

@Injectable({
  providedIn: 'root',
})
export class VanService {
  private http = inject(HttpClient);

  private vansSignal = signal<VanVehicle[]>([]);
  readonly vansData = this.vansSignal.asReadonly();

  // Subject na manuálne spustenie refreshu (napr. po delete)
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  // Signály pre stav (Loading / Error)
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Táto metóda skombinuje searchQuery a refreshTrigger
  getVans(query$: Observable<string>): Observable<VanVehicle[]> {
    return query$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      // switchMap s vnútorným triggerom na refresh
      switchMap((query) =>
        this.refreshTrigger$.pipe(
          tap(() => {
            this.isLoading.set(true);
            this.errorMessage.set(null);
          }),
          switchMap(() => this.fetchData(query)),
          tap((vans) => {
            this.isLoading.set(false);
            this.vansSignal.set(vans);
          }),
        ),
      ),
    );
  }

  private fetchData(query: string): Observable<VanVehicle[]> {
    const trimmed = query.trim();
    const url = trimmed === '' ? '/api/vans/all' : `/api/vans?q=${trimmed}`;
    return this.http.get<VanVehicle[]>(url);
  }

  // Metóda na vyžiadanie čerstvých dát
  refresh() {
    this.refreshTrigger$.next();
  }

  deleteVan(id: number): Observable<void> {
    return this.http.delete<void>(`/api/vans/${id}`).pipe(
      tap(() => {
        // Aktualizujeme signál odobratím vymazanej dodávky podľa ID
        this.vansSignal.update((allVans) => allVans.filter((v) => v.id !== id));

        // Voliteľne: Ak máš nastavený errorMessage, môžeš ho tu vyčistiť
        this.errorMessage.set(null);
      }),
      catchError((err) => {
        this.errorMessage.set('Deletion failed');
        throw err;
      })
    );
  }

  getVanById(id: number): Observable<VanVehicle> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    return this.http.get<VanVehicle>(`/api/vans/${id}`).pipe(
      tap(() => this.isLoading.set(false)),
      catchError((err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Nepodarilo sa načítať detail vozidla');
        // V reálnej appke by si tu mohol hodiť error ďalej alebo vrátiť empty
        throw err;
      })
    );
  }
}
