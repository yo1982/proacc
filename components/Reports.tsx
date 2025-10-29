import React from 'react';
import { useAppContext } from '../App';

const reports = [
    { 
        id: 'pnl', 
        nameKey: 'pnlTitle', 
        descriptionKey: 'pnlDesc',
        icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
    },
    { 
        id: 'balance-sheet', 
        nameKey: 'balanceSheetTitle', 
        descriptionKey: 'balanceSheetDesc',
        icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
    },
    { 
        id: 'cash-flow', 
        nameKey: 'cashFlowTitle', 
        descriptionKey: 'cashFlowDesc',
        icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4a1 1 0 011 1v3.5a1 1 0 01-1 1h-2.5m-1.5 6H9a1 1 0 01-1-1V10a1 1 0 011-1h4a1 1 0 011 1v3.5a1 1 0 01-1 1h-2.5m1.5 0v.01" /></svg>
    },
];

const translations = {
    en: {
        title: 'Financial Reports',
        description: 'Generate and download detailed financial reports.',
        generatePdf: 'Generate PDF',
        pnlTitle: 'Profit & Loss Statement',
        pnlDesc: 'A summary of revenues, costs, and expenses during a specific period.',
        balanceSheetTitle: 'Balance Sheet',
        balanceSheetDesc: 'A snapshot of the company\'s assets, liabilities, and equity.',
        cashFlowTitle: 'Cash Flow Statement',
        cashFlowDesc: 'Shows how cash is moving in and out of the company.',
    },
    ar: {
        title: 'التقارير المالية',
        description: 'إنشاء وتنزيل تقارير مالية مفصلة.',
        generatePdf: 'إنشاء PDF',
        pnlTitle: 'قائمة الأرباح والخسائر',
        pnlDesc: 'ملخص للإيرادات والتكاليف والمصروفات خلال فترة محددة.',
        balanceSheetTitle: 'الميزانية العمومية',
        balanceSheetDesc: 'لمحة سريعة عن أصول الشركة وخصومها وحقوق الملكية.',
        cashFlowTitle: 'قائمة التدفقات النقدية',
        cashFlowDesc: 'يوضح كيفية حركة النقد داخل وخارج الشركة.',
    }
};

const ReportCard: React.FC<{ report: typeof reports[0], t: (key: any) => string }> = ({ report, t }) => {
    const Icon = report.icon;
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg">
                        <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t(report.nameKey)}</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{t(report.descriptionKey)}</p>
            </div>
            <button className="w-full mt-auto px-4 py-2 font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                {t('generatePdf')}
            </button>
        </div>
    );
};

export default function Reports() {
    const { language } = useAppContext();
    const t = (key: keyof typeof translations.en) => translations[language][key] || key;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('title')}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('description')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map(report => <ReportCard key={report.id} report={report} t={t} />)}
            </div>
        </div>
    );
}