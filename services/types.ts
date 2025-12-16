export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
}

export type Language = 'en' | 'ur';

export interface Translation {
  dashboard: string;
  transactions: string;
  goals: string;
  advisor: string;
  totalBalance: string;
  income: string;
  expenses: string;
  recentActivity: string;
  addTransaction: string;
  description: string;
  amount: string;
  category: string;
  date: string;
  add: string;
  cancel: string;
  save: string;
  aiAdvisorTitle: string;
  aiAdvisorDesc: string;
  askAdvisor: string;
  loading: string;
  language: string;
  welcome: string;
  savingProgress: string;
  addNewGoal: string;
  target: string;
  saved: string;
  type: string;
}

export const CATEGORIES = [
  'Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Salary', 'Business', 'Other'
];