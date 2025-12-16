import { GoogleGenAI } from "@google/genai";
import { Transaction, SavingsGoal, Language } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing!");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getFinancialAdvice = async (
  transactions: Transaction[], 
  goals: SavingsGoal[],
  language: Language
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "API Key not configured.";

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  
  // Prepare data summary
  const summary = `
    Total Income: ${income}
    Total Expenses: ${expense}
    Recent Transactions: ${transactions.slice(0, 5).map(t => `${t.description} (${t.amount})`).join(', ')}
    Savings Goals: ${goals.map(g => `${g.title}: ${g.currentAmount}/${g.targetAmount}`).join(', ')}
  `;

  const prompt = `
    You are 'Arman Sheraz Advisor', a professional financial assistant. 
    User language preference is: ${language === 'ur' ? 'Urdu (Please answer in Urdu script)' : 'English'}.
    
    Here is the user's financial summary:
    ${summary}

    Please provide 3 specific, actionable, and professional tips to help the user save more money and reach their goals.
    Keep the tone encouraging and professional. 
    If responding in Urdu, ensure it is grammatically correct and uses professional terminology where appropriate.
    Format the output as a clean list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No advice generated.";
  } catch (error) {
    console.error("Error fetching advice:", error);
    return language === 'ur' 
      ? "مشورہ حاصل کرنے میں خرابی پیش آگئی۔ براہ کرم دوبارہ کوشش کریں۔"
      : "Error retrieving advice. Please try again.";
  }
};