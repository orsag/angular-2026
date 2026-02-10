import { Component } from '@angular/core';

@Component({
  selector: 'app-structural-switch',
  imports: [],
  templateUrl: './structural-switch.html',
  styleUrl: './structural-switch.scss',
})
export class StructuralSwitch {
  grade: number = 0;

  setGrade(x: number) {
    this.grade = x;
  }
}
