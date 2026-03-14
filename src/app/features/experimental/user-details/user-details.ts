import { Component, inject } from '@angular/core';
import { UserDetailsService } from '@services/user-details-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  service = inject(UserDetailsService);
  data$ = this.service.userDetails$;
  isLoading$ = this.service.loadingDetails$;
}
