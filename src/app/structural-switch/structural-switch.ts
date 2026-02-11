import { Component, signal } from '@angular/core';
import { TODOS } from '../model/mock-data';

@Component({
  selector: 'app-structural-switch',
  imports: [],
  templateUrl: './structural-switch.html',
  styleUrl: './structural-switch.scss',
})
export class StructuralSwitch {
  grade: number = 0;
  status = signal('draft');
  listTodos = signal(TODOS);

  setGrade(x: number) {
    this.grade = x;
  }
}
