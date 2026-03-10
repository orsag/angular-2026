import { computed, Injectable, signal } from '@angular/core';
import { TransactionModel } from '../model/transaction.model';
import { MOCK_TRANSACTIONS } from '../model/transaction.data';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _transactions = signal<TransactionModel[]>(MOCK_TRANSACTIONS);
  transactions = this._transactions.asReadonly();

  balance = computed(() =>
    this.transactions().reduce((acc, t) => {
      if (t.type === 'income') {
        acc = acc + t.amount;
      } else {
        acc = acc - t.amount;
      }
      return acc;
    }, 0),
  );

  income = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0),
  );

  expense = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0),
  );

  add(transaction: TransactionModel) {
    this._transactions.update((list) => [...list, transaction]);
  }

  remove(idSelected: number) {
    this._transactions.update((list) => list.filter((t) => t.id !== idSelected));
  }

  reloadData() {
    this._transactions.set(MOCK_TRANSACTIONS);
  }
}
