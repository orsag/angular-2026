import { Component, inject, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { VanService } from '@services/van-service';
import { VanVehicle } from '@types';
import { VanDetailModal } from './van-detail-modal';
import { NgComponentOutlet } from '@angular/common';
import { StandardVanItem, LuxuryVanItem } from './van-item';
import {Subject, takeUntil} from 'rxjs';

type SortKey = 'cargoCapacity' | 'category' | 'seats' | 'brand';

@Component({
  selector: 'app-van-search',
  standalone: true,
  providers: [VanService, VanDetailModal],
  templateUrl: './van-search.html',
  imports: [VanDetailModal, NgComponentOutlet],
})
export class VanSearch {
  private vanService = inject(VanService);

  // Lokálny stav
  searchQuery = signal<string>('');
  rawVans = signal<VanVehicle[]>([]);
  selectedVan = signal<VanVehicle | null>(null);

  // Exponujeme loading/error zo služby
  isLoading = this.vanService.isLoading;
  errorMessage = this.vanService.errorMessage;

  private destroy$ = new Subject<void>();

  // UI Signály pre sort
  sortAscending = signal<boolean>(true);
  sortBy = signal<SortKey>('cargoCapacity');

  constructor() {
    // Prepojíme stream zo služby s naším rawVans signálom
    this.vanService
      .getVans(toObservable(this.searchQuery))
      .pipe(takeUntil(this.destroy$))
      .subscribe((vans) => this.rawVans.set(vans));
  }

  sortedVans = computed(() => {
    const list = [...this.rawVans()];
    const key = this.sortBy();
    const direction = this.sortAscending() ? 1 : -1;

    return list.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * direction;
      }
      return ((valA as number) - (valB as number)) * direction;
    });
  });

  // computed signál, ktorý pripraví dáta aj s informáciou o komponente
  displayVans = computed(() => {
    return this.sortedVans().map((van) => ({
      van,
      // Rozhodovacia logika pre výber komponentu
      component: van.category.includes('Luxury') ? LuxuryVanItem : StandardVanItem,
      // Pripravíme inputy pre ngComponentOutlet
      inputs: { data: van },
    }));
  });

  deleteVan(id: number) {
    this.vanService.deleteVan(id).subscribe({
      next: () => {
        // Možnosť A: Len lokálne odobrať (rýchlejšie UI)
        this.rawVans.update((vans) => vans.filter((v) => v.id !== id));

        // Možnosť B: Vynútiť si úplne čerstvé dáta zo servera
        // this.vanService.refresh();
      },
      error: () => this.vanService.errorMessage.set('Delete failed'),
    });
  }

  updateSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as SortKey;
    this.sortBy.set(value);
  }

  selectVan(van: VanVehicle) {
    this.selectedVan.set(van);
  }

  closeModal() {
    this.selectedVan.set(null);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
