import { TransactionModel } from './transaction.model';

export const MOCK_TRANSACTIONS: TransactionModel[] = [
  {
    id: 1,
    description: 'Monthly Salary',
    amount: 2500.0,
    date: new Date('2026-03-01'),
    type: 'income',
  },
  {
    id: 2,
    description: 'Grocery Store - Lidl',
    amount: 64.32,
    date: new Date('2026-03-02'),
    type: 'expense',
  },
  {
    id: 3,
    description: 'Rent Payment',
    amount: 850.0,
    date: new Date('2026-03-03'),
    type: 'expense',
  },
  {
    id: 4,
    description: 'Freelance Design Project',
    amount: 450.0,
    date: new Date('2026-03-05'),
    type: 'income',
  },
  {
    id: 5,
    description: 'Netflix Subscription',
    amount: 12.99,
    date: new Date('2026-03-07'),
    type: 'expense',
  },
  {
    id: 6,
    description: 'Gas Station',
    amount: 55.0,
    date: new Date('2026-03-08'),
    type: 'expense',
  },
  {
    id: 7,
    description: 'Dinner in Zvolen',
    amount: 42.5,
    date: new Date('2026-03-09'),
    type: 'expense',
  },
  {
    id: 8,
    description: 'Gym Membership',
    amount: 35.0,
    date: new Date('2026-03-10'),
    type: 'expense',
  },
  {
    id: 9,
    description: 'Festival in czechia',
    amount: 900.0,
    date: new Date('2026-03-11'),
    type: 'expense',
  },
];
