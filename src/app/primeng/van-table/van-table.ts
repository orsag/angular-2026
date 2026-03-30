import { Component, inject } from '@angular/core';
import { VanService } from '@services/van-service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

interface TableColumn {
  field: string;
  header: string;
}

@Component({
  selector: 'app-van-table',
  imports: [CommonModule, TableModule],
  templateUrl: './van-table.html',
  styleUrl: './van-table.scss',
})
export class VanTable {
  private vanService = inject(VanService);
  private searchQuery$ = new BehaviorSubject<string>('');
  private sub$?: Subscription;

  // 1. Expose signals from service
  vans = this.vanService.vansData;
  isLoading = this.vanService.isLoading;

  // 2. Define our Column Configuration
  cols: TableColumn[] = [
    { field: 'id', header: 'ID' },
    { field: 'brand', header: 'Brand' },
    { field: 'model', header: 'Model' },
    { field: 'category', header: 'Category' },
    { field: 'cargoCapacity', header: 'Capacity (L)' },
    { field: 'seats', header: 'Seats' },
  ];

  ngOnInit() {
    // If we want to ensure data is loaded when this specific component initializes
    // but only if the cache is empty (optional logic)
    if (this.vans().length === 0) {
      this.sub$ = this.vanService.getVans(this.searchQuery$.asObservable()).subscribe();
    }
  }

  updateSearch(value: string) {
    this.searchQuery$.next(value);
  }

  ngOnDestroy() {
    this.sub$?.unsubscribe();
  }
}
