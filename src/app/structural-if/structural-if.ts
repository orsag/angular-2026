import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-structural-if',
  imports: [CommonModule, FormsModule],
  templateUrl: './structural-if.html',
  styleUrl: './structural-if.scss',
})
export class StructuralIf {
  isChecked: boolean = false;
  isInputBox: boolean = true;
  input1: string = '';
  input2: string = '';

  onClick() {
    this.isChecked = !this.isChecked;
  }
  showField() {
    this.isInputBox = true;
  }
  hideField() {
    this.isInputBox = false;
  }
}
