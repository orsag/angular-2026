import { Component, inject } from '@angular/core';
import { TransactionService } from '../Services/transaction-service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-tracker',
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './expense-tracker.html',
  styleUrl: './expense-tracker.scss',
})
export class ExpenseTracker {
  public service = inject(TransactionService);

  transactions = this.service.transactions;
  totalBalance = this.service.balance;
  totalIncome = this.service.income;
  totalExpense = this.service.expense;

  removeTransaction(id: number) {
    this.service.remove(id);
  }

  reloadData() {
    this.service.reloadData();
  }
}
