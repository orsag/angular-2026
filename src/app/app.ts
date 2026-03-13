import { Component } from '@angular/core';
import { ToastContainer } from './toast-container/toast-container';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './Common/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [ToastContainer, RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
