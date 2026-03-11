import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  toasts = signal<ToastMessage[]>([]);

  show(message: string, type: ToastMessage['type'] = 'success') {
    const id = Date.now();
    const newToast: ToastMessage = { message, type, id };

    // Add new toast to the list
    this.toasts.update((current) => [...current, newToast]);

    // Auto-remove after 3 seconds
    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
