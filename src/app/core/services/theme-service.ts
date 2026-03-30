import { Injectable, signal, inject, PLATFORM_ID, DOCUMENT, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  theme = signal<'light' | 'dark'>('light');

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.initializeTheme();
  }

  private initializeTheme() {
    if (this.isBrowser) {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved) {
        this.theme.set(saved);
        this.applyTheme(saved);
      }
    }
  }

  private applyTheme(theme: 'light' | 'dark') {
    if (this.isBrowser) {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }

  toggleTheme = () => {
    if (!this.isBrowser) return;
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);

    // let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    // if (themeLink) {
    //   // Map your app theme to a PrimeNG theme file
    //   const themeName = next === 'dark' ? 'lara-dark-blue' : 'lara-light-blue';
    //   themeLink.href = `${themeName}.css`;
    // }
    const body = this.document.body;
    const html = this.document.documentElement;
    body.classList.remove('dark-mode');
    if (next === 'dark') {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }

    document.documentElement.setAttribute('data-bs-theme', next);
    this.setLocalStorage('theme', next);
  };

  setLocalStorage(nameKey: string, value: string) {
    if (this.isBrowser) {
      if (nameKey.trim().length > 0 && value.trim().length > 0) {
        localStorage.setItem(nameKey, value);
      }
    }
  }

  getLocalStorage(nameKey: string) {
    if (this.isBrowser) {
      return localStorage.getItem(nameKey) ?? '';
    } else {
      return null;
    }
  }

  removeLocalStorage(nameKey: string) {
    if (this.isBrowser) {
      localStorage.removeItem(nameKey);
    }
  }

  clearLocalStorage() {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
