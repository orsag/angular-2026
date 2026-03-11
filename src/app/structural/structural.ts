import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TODOS } from '../model/mock-data';

@Component({
  selector: 'app-structural',
  imports: [CommonModule, FormsModule],
  templateUrl: './structural.html',
  styleUrl: './structural.scss',
})
export class Structural {
  input1: string = '';
  input2: string = '';

  employees: any[] = [
    { empName: 'John', empNumber: 101, empEmail: 'john@gmail.com', empDept: 'IT' },
    { empName: 'Bob', empNumber: 102, empEmail: 'bob@gmail.com', empDept: 'HR' },
    { empName: 'Peter', empNumber: 103, empEmail: 'peter@gmail.com', empDept: 'QA' },
    { empName: 'Lukas', empNumber: 99, empEmail: 'lukasko@gmail.com', empDept: 'MG' },
    { empName: 'Viktor', empNumber: 104, empEmail: 'okolicanyi@gmail.com', empDept: 'MG' },
  ];

  grade: number = 0;
  status = signal('draft');
  listTodos = signal(TODOS);
}
