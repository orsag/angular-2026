import { Component, inject } from '@angular/core';
import { NotificationService } from '../Services/notification-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class ToastContainer {
  notify = inject(NotificationService);
}
