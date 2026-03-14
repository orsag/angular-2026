import { Component } from '@angular/core';
import { ToastContainer } from '@components/toast-container/toast-container';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [ToastContainer, RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
