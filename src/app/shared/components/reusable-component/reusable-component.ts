import { Component, Input, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-reusable-component',
  imports: [],
  templateUrl: './reusable-component.html',
  styleUrl: './reusable-component.scss',
})
export class ReusableComponent {
  @Input() childProperty: string = 'Hello All : Welcome to FED Learning.';

  heading = signal(this.childProperty);

  @HostListener('click')
  onClick() {
    console.log('Button clicked.');
  }
}
