import React, { useState } from 'react';
import { Transaction, SavingsGoal, Language, Translation } from '../types';
import { getFinancialAdvice } from '../services/geminiService';
import { Bot, Sparkles, Loader2 } from 'lucide-react';

interface AIAdvisorProps {
  transactions: Transaction[];
  goals: SavingsGoal[];
  language: Language;
  text: Translation;
  isRTL: boolean;
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ transactions, goals, language, text, isRTL }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const result = await getFinancialAdvice(transactions, goals, language);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className={`bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden ${isRTL ? 'font-urdu' : ''}`}>
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

      <div className={`relative z-10 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-inner">
            <Bot size={32} className="text-indigo-100" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{text.aiAdvisorTitle}</h2>
            <p className="text-indigo-200">{text.aiAdvisorDesc}</p>
          </div>
        </div>

        {!advice ? (
          <div className={`flex justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
             <button
              onClick={handleGetAdvice}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  {text.loading}
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  {text.askAdvisor}
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-fadeIn">
             <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-line leading-relaxed text-indigo-50">
                  {advice}
                </div>
             </div>
             <button 
               onClick={() => setAdvice(null)}
               className="mt-6 text-sm text-indigo-300 hover:text-white underline"
             >
               Clear Advice
             </button>
          </div>
        )}
      </div>
    </div>
  );
};