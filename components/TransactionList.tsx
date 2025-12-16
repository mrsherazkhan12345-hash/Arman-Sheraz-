import React from 'react';
import { Transaction, Translation } from '../types';
import { ArrowUpRight, ArrowDownLeft, Trash2 } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  text: Translation;
  isRTL: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete, text, isRTL }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden ${isRTL ? 'font-urdu' : ''}`}>
      <div className={`p-6 border-b border-slate-100`}>
        <h3 className="text-lg font-bold text-slate-800">{text.recentActivity}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className={`px-6 py-3 font-medium ${isRTL ? 'text-right' : ''}`}>{text.description}</th>
              <th className={`px-6 py-3 font-medium ${isRTL ? 'text-right' : ''}`}>{text.category}</th>
              <th className={`px-6 py-3 font-medium ${isRTL ? 'text-right' : ''}`}>{text.date}</th>
              <th className={`px-6 py-3 font-medium ${isRTL ? 'text-right' : ''}`}>{text.amount}</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length === 0 ? (
               <tr>
                 <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                   No transactions yet.
                 </td>
               </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {t.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                      </div>
                      <span className="font-medium text-slate-700">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{t.category}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{t.date}</td>
                  <td className={`px-6 py-4 font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDelete(t.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};