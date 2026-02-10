import { Component } from '@angular/core';

@Component({
  selector: 'app-structural-for',
  imports: [],
  templateUrl: './structural-for.html',
  styleUrl: './structural-for.scss',
})
export class StructuralFor {
  employees: any[] = [
    { empName: 'John', empNumber: 101, empEmail: 'john@gmail.com', empDept: 'IT' },
    { empName: 'Bob', empNumber: 102, empEmail: 'bob@gmail.com', empDept: 'HR' },
    { empName: 'Peter', empNumber: 103, empEmail: 'peter@gmail.com', empDept: 'QA' },
    { empName: 'Lukas', empNumber: 99, empEmail: 'lukasko@gmail.com', empDept: 'MG' },
    { empName: 'Viktor', empNumber: 104, empEmail: 'okolicanyi@gmail.com', empDept: 'MG' },
  ];

  companyList: string[] = ['Apple', 'Microsoft', 'ApiTree', 'Tailwind', 'Google', 'Amazon'];
}
