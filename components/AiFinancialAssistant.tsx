
import React, { useState, useCallback } from 'react';
import { getFinancialSummary } from '../services/geminiService';
import { useAppContext } from '../App';

// Mock financial data to be sent to the AI
const mockFinancialData = {
    summary: {
      totalRevenue: 405091,
      totalExpenses: 152420,
      netProfit: 252671,
      newClients: 26,
    },
    monthlyBreakdown: [
      { month: 'January', revenue: 65000, expenses: 32000 },
      { month: 'February', revenue: 68000, expenses: 34000 },
      { month: 'March', revenue: 72000, expenses: 31000 },
      { month: 'April', revenue: 66000, expenses: 35000 },
      { month: 'May', revenue: 70000, expenses: 29000 },
      { month: 'June', revenue: 64091, expenses: 21420 },
    ],
};

const translations = {
    en: {
        title: 'AI Financial Assistant',
        description: 'Get an AI-powered summary of your current financial standing.',
        generateButton: 'Analyze Financials',
        generating: 'Generating Summary...',
        summaryTitle: 'AI Generated Summary'
    },
    ar: {
        title: 'المساعد المالي الذكي',
        description: 'احصل على ملخص مدعوم بالذكاء الاصطناعي لوضعك المالي الحالي.',
        generateButton: 'تحليل البيانات المالية',
        generating: 'جاري إنشاء الملخص...',
        summaryTitle: 'ملخص تم إنشاؤه بواسطة الذكاء الاصطناعي'
    }
};

export default function AiFinancialAssistant() {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { language } = useAppContext();
    const t = (key: keyof typeof translations.en) => translations[language][key] || key;

    const handleGenerateSummary = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setSummary('');
        try {
            const result = await getFinancialSummary(mockFinancialData);
            setSummary(result);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-4xl mx-auto">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('title')}</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{t('description')}</p>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleGenerateSummary}
                    disabled={isLoading}
                    className="px-6 py-3 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    {isLoading ? t('generating') : t('generateButton')}
                </button>
            </div>

            <div className="mt-8">
                {isLoading && (
                     <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                     </div>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}
                {summary && (
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
                         <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('summaryTitle')}</h3>
                         <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                            {summary}
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
}
   