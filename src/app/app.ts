import { Component, inject } from '@angular/core';
import { ToastContainer } from '@components/toast-container/toast-container';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/components/sidebar/sidebar';
import { ThemeService } from '@services/theme-service';

@Component({
  selector: 'app-root',
  imports: [ToastContainer, RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  theme = inject(ThemeService);
}
