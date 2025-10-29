import React from 'react';
import { useAppContext } from '../App';

interface Invoice {
    id: string;
    client: string;
    dueDate: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
}

const mockInvoices: Invoice[] = [
    { id: 'INV-2024-001', client: 'Innovate Co.', dueDate: '2024-08-01', amount: 1250.50, status: 'Paid' },
    { id: 'INV-2024-002', client: 'Tech Solutions Inc.', dueDate: '2024-08-15', amount: 4500.00, status: 'Pending' },
    { id: 'INV-2024-003', client: 'Creative Designs', dueDate: '2024-07-15', amount: 3000.00, status: 'Overdue' },
    { id: 'INV-2024-004', client: 'Marketing Guru LLC', dueDate: '2024-08-20', amount: 8200.00, status: 'Pending' },
    { id: 'INV-2024-005', client: 'Global Exports', dueDate: '2024-07-30', amount: 6700.00, status: 'Paid' },
];

const translations = {
    en: {
        title: 'Invoices',
        description: 'Manage your invoices and track payments.',
        createNew: 'Create New Invoice',
        invoiceId: 'Invoice ID',
        client: 'Client',
        dueDate: 'Due Date',
        amount: 'Amount',
        status: 'Status',
    },
    ar: {
        title: 'الفواتير',
        description: 'إدارة فواتيرك وتتبع المدفوعات.',
        createNew: 'إنشاء فاتورة جديدة',
        invoiceId: 'رقم الفاتورة',
        client: 'العميل',
        dueDate: 'تاريخ الاستحقاق',
        amount: 'المبلغ',
        status: 'الحالة',
    }
};

export default function Invoices() {
    const { language } = useAppContext();
    const t = (key: keyof typeof translations.en) => translations[language][key] || key;

    const statusClasses = {
        Paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        Overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('title')}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{t('description')}</p>
                </div>
                <button className="px-4 py-2 font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                    {t('createNew')}
                </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t('invoiceId')}</th>
                                <th scope="col" className="px-6 py-3">{t('client')}</th>
                                <th scope="col" className="px-6 py-3">{t('dueDate')}</th>
                                <th scope="col" className="px-6 py-3">{t('amount')}</th>
                                <th scope="col" className="px-6 py-3 text-center">{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockInvoices.map(invoice => (
                                <tr key={invoice.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-primary-600 dark:text-primary-400 whitespace-nowrap">{invoice.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{invoice.client}</td>
                                    <td className="px-6 py-4">{invoice.dueDate}</td>
                                    <td className="px-6 py-4 font-medium">${invoice.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[invoice.status]}`}>{invoice.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}