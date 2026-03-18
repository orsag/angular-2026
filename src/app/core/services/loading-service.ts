import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // Signál, ktorý určuje, či sa loader zobrazuje
  readonly isLoading = signal<boolean>(false);

  show() {
    this.isLoading.set(true);
  }

  hide() {
    this.isLoading.set(false);
  }

  // Pomocná metóda pre prepínanie
  toggle(state: boolean) {
    this.isLoading.set(state);
  }
}
