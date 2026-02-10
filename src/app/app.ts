import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from './user/user';
import { DataBinding } from './data-binding/data-binding';
import { StructuralIf } from './structural-if/structural-if';
import { StructuralFor } from './structural-for/structural-for';
import { StructuralSwitch } from './structural-switch/structural-switch';
import { AttributeDirectives } from './attribute-directives/attribute-directives';
import { Signals } from './signals/signals';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-19-tutorial');
}
