import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../Services/dashboard-service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  service = inject(DashboardService);
  users$ = this.service.filteredUsers$;

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.service.searchSubject.next(value);
  }

  onFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.service.filterSubject.next(value);
  }
}
