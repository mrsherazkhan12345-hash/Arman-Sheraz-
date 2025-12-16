import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  WalletCards, 
  PiggyBank, 
  BrainCircuit, 
  Plus, 
  LogOut,
  Languages
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

import { Transaction, SavingsGoal, Language } from './types';
import { TRANSLATIONS } from './constants';
import { StatsCard } from './components/StatsCard';
import { TransactionList } from './components/TransactionList';
import { AddTransactionModal } from './components/AddTransactionModal';
import { AIAdvisor } from './components/AIAdvisor';

// Colors for charts
const COLORS = ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6'];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'goals' | 'advisor'>('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dummy Data State
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Web Design Project', amount: 1500, type: 'income', category: 'Business', date: '2023-10-24' },
    { id: '2', description: 'Grocery Shopping', amount: 120, type: 'expense', category: 'Food', date: '2023-10-25' },
    { id: '3', description: 'Monthly Rent', amount: 800, type: 'expense', category: 'Utilities', date: '2023-10-01' },
  ]);

  const [goals, setGoals] = useState<SavingsGoal[]>([
    { id: '1', title: 'New Car', targetAmount: 20000, currentAmount: 5000 },
    { id: '2', title: 'Emergency Fund', targetAmount: 10000, currentAmount: 2500 },
  ]);

  const t = TRANSLATIONS[language];
  const isRTL = language === 'ur';

  // Derived State
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const chartData = [
    { name: t.income, value: totalIncome },
    { name: t.expenses, value: totalExpense },
  ];

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions([transaction, ...transactions]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleAddGoal = () => {
    const title = prompt(isRTL ? "مقصد کا نام:" : "Goal Title:");
    if (!title) return;
    const target = Number(prompt(isRTL ? "ہدف کی رقم:" : "Target Amount:"));
    if (!target) return;
    
    setGoals([...goals, {
      id: Math.random().toString(36),
      title,
      targetAmount: target,
      currentAmount: 0
    }]);
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} font-sans`}>
      {/* Sidebar */}
      <aside className={`w-20 lg:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col justify-between transition-all duration-300 sticky top-0 h-screen`}>
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-900/50">
              <span className="text-xl font-bold">A</span>
            </div>
            <span className={`hidden lg:block ml-3 font-bold text-lg tracking-tight ${isRTL ? 'font-urdu mr-3 ml-0' : ''}`}>
              Arman Sheraz
            </span>
          </div>

          <nav className="mt-8 px-4 space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
              { id: 'transactions', icon: WalletCards, label: t.transactions },
              { id: 'goals', icon: PiggyBank, label: t.goals },
              { id: 'advisor', icon: BrainCircuit, label: t.advisor },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-900/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                } ${isRTL ? 'flex-row-reverse font-urdu' : ''}`}
              >
                <item.icon size={20} />
                <span className="hidden lg:block font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
           <button
             onClick={() => setLanguage(l => l === 'en' ? 'ur' : 'en')}
             className={`w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all ${isRTL ? 'flex-row-reverse font-urdu' : ''}`}
           >
             <Languages size={20} />
             <span className="hidden lg:block font-medium">{language === 'en' ? 'اردو' : 'English'}</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'font-urdu' : ''}`}>
            {activeTab === 'dashboard' && t.dashboard}
            {activeTab === 'transactions' && t.transactions}
            {activeTab === 'goals' && t.goals}
            {activeTab === 'advisor' && t.advisor}
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 ${isRTL ? 'flex-row-reverse font-urdu' : ''}`}
          >
            <Plus size={20} />
            <span className="font-medium text-sm">{t.addTransaction}</span>
          </button>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8 pb-24">
          
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard 
                  title={t.totalBalance} 
                  value={`$${totalBalance.toLocaleString()}`} 
                  icon={WalletCards} 
                  colorClass="bg-blue-500" 
                  isRTL={isRTL}
                />
                <StatsCard 
                  title={t.income} 
                  value={`$${totalIncome.toLocaleString()}`} 
                  icon={ArrowUpRightIcon} 
                  trend="+12%"
                  colorClass="bg-emerald-500" 
                  isRTL={isRTL}
                />
                <StatsCard 
                  title={t.expenses} 
                  value={`$${totalExpense.toLocaleString()}`} 
                  icon={ArrowDownLeftIcon} 
                  trend="-2%"
                  colorClass="bg-rose-500" 
                  isRTL={isRTL}
                />
              </div>

              {/* Charts & Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                   <TransactionList 
                      transactions={transactions.slice(0, 5)} 
                      onDelete={handleDeleteTransaction}
                      text={t}
                      isRTL={isRTL}
                   />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className={`text-lg font-bold text-slate-800 mb-6 ${isRTL ? 'text-right font-urdu' : ''}`}>{t.expenses} vs {t.income}</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className={`mt-4 text-center text-sm text-slate-500 ${isRTL ? 'font-urdu' : ''}`}>
                    Overview of your financial health
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Transactions View */}
          {activeTab === 'transactions' && (
             <TransactionList 
                transactions={transactions} 
                onDelete={handleDeleteTransaction}
                text={t}
                isRTL={isRTL}
             />
          )}

          {/* Savings Goals View */}
          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div className={`flex justify-end`}>
                 <button onClick={handleAddGoal} className="text-primary-600 font-medium hover:underline">
                    + {t.addNewGoal}
                 </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map(goal => (
                  <div key={goal.id} className={`bg-white p-6 rounded-xl border border-slate-100 shadow-sm ${isRTL ? 'font-urdu text-right' : ''}`}>
                    <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`p-3 bg-indigo-50 text-indigo-600 rounded-lg`}>
                        <PiggyBank size={24} />
                      </div>
                      <div className={isRTL ? 'text-left' : 'text-right'}>
                        <p className="text-sm text-slate-400">{t.target}</p>
                        <p className="text-xl font-bold text-slate-800">${goal.targetAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{goal.title}</h3>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
                      <div 
                        className="bg-primary-500 h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-slate-500">{t.saved}: ${goal.currentAmount.toLocaleString()}</span>
                      <span className="text-primary-600 font-bold">{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                    </div>
                    <button 
                      onClick={() => {
                        const amt = Number(prompt("Add amount:"));
                        if(amt) {
                          setGoals(goals.map(g => g.id === goal.id ? {...g, currentAmount: g.currentAmount + amt} : g))
                        }
                      }}
                      className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      {t.add} Funds
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Advisor View */}
          {activeTab === 'advisor' && (
            <AIAdvisor 
              transactions={transactions} 
              goals={goals} 
              language={language}
              text={t}
              isRTL={isRTL}
            />
          )}

        </div>
      </main>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddTransaction}
        text={t}
        isRTL={isRTL}
      />

    </div>
  );
};

// Helper components for the icons within the file to avoid clutter
const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
);

const ArrowDownLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 7 7 17"/><path d="M17 17H7V7"/></svg>
);

export default App;