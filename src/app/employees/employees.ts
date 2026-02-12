import { Component, inject } from '@angular/core';
import { EmployeeStoreStore} from '../store/employees.store';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees {
  readonly store = inject(EmployeeStoreStore);
}
