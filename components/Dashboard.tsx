
import React from 'react';
import type { Transaction, ChartData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../App';

// --- MOCK DATA ---
const stats = [
    { id: 1, name: 'Total Revenue', value: '$405,091.00', change: '+4.5%', changeType: 'positive' },
    { id: 2, name: 'Total Expenses', value: '$152,420.00', change: '+1.2%', changeType: 'negative' },
    { id: 3, name: 'Net Profit', value: '$252,671.00', change: '+8.1%', changeType: 'positive' },
    { id: 4, name: 'New Clients', value: '26', change: '-2.8%', changeType: 'negative' },
];

const transactions: Transaction[] = [
    { id: 'TXN001', name: 'Tech Solutions Inc.', date: '2024-07-22', amount: 4500.00, status: 'Completed' },
    { id: 'TXN002', name: 'Innovate Co.', date: '2024-07-21', amount: -1250.50, status: 'Completed' },
    { id: 'TXN003', name: 'Marketing Guru LLC', date: '2024-07-20', amount: 8200.00, status: 'Pending' },
    { id: 'TXN004', name: 'Office Supplies Depot', date: '2024-07-19', amount: -345.75, status: 'Cancelled' },
    { id: 'TXN005', name: 'Creative Designs', date: '2024-07-18', amount: 3000.00, status: 'Completed' },
];

const chartData: ChartData[] = [
    { name: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Feb', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 5000, expenses: 3800 },
    { name: 'Apr', revenue: 4780, expenses: 3908 },
    { name: 'May', revenue: 5890, expenses: 4800 },
    { name: 'Jun', revenue: 4390, expenses: 3800 },
];

const translations = {
    en: {
        welcome: 'Welcome Back!',
        dashboardOverview: "Here's your financial overview for today.",
        revenue: 'Revenue',
        expenses: 'Expenses',
        revenueAndExpenses: 'Revenue & Expenses Overview',
        recentTransactions: 'Recent Transactions',
        transactionName: 'Name',
        date: 'Date',
        amount: 'Amount',
        status: 'Status',
        viewAll: 'View All',
    },
    ar: {
        welcome: 'مرحبًا بعودتك!',
        dashboardOverview: 'إليك نظرة عامة على وضعك المالي اليوم.',
        revenue: 'الإيرادات',
        expenses: 'المصروفات',
        revenueAndExpenses: 'نظرة عامة على الإيرادات والمصروفات',
        recentTransactions: 'المعاملات الأخيرة',
        transactionName: 'الاسم',
        date: 'التاريخ',
        amount: 'المبلغ',
        status: 'الحالة',
        viewAll: 'عرض الكل',
    }
}

// --- SUB-COMPONENTS ---
const StatCard: React.FC<(typeof stats)[0]> = ({ name, value, change, changeType }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{name}</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className={`mt-2 text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change} vs last month
        </p>
    </div>
);

const RevenueChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    const { language } = useAppContext();
    const t = (key: keyof typeof translations.en) => translations[language][key] || key;
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('revenueAndExpenses')}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: 'rgb(107 114 128)' }} />
                    <YAxis yAxisId="left" orientation="left" stroke="rgb(37 99 235)" tickLine={false} axisLine={false} tick={{ fill: 'rgb(107 114 128)', dx: -5 }} />
                    <YAxis yAxisId="right" orientation="right" stroke="rgb(220 38 38)" tickLine={false} axisLine={false} tick={{ fill: 'rgb(107 114 128)', dx: 5 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }} labelStyle={{ color: '#f3f4f6' }} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill="#2563eb" name={t('revenue')} radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="expenses" fill="#dc2626" name={t('expenses')} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const RecentTransactions: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const { language } = useAppContext();
    const t = (key: keyof typeof translations.en) => translations[language][key] || key;

    const statusClasses = {
        Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('recentTransactions')}</h3>
                <button className="text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200">{t('viewAll')}</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('transactionName')}</th>
                            <th scope="col" className="px-6 py-3">{t('date')}</th>
                            <th scope="col" className="px-6 py-3">{t('amount')}</th>
                            <th scope="col" className="px-6 py-3 text-center">{t('status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{tx.name}</td>
                                <td className="px-6 py-4">{tx.date}</td>
                                <td className={`px-6 py-4 font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>${Math.abs(tx.amount).toFixed(2)}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[tx.status]}`}>{tx.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- MAIN DASHBOARD COMPONENT ---
export default function Dashboard() {
    const { language } = useAppContext();
    const t = (key: keyof typeof translations.en) => translations[language][key] || key;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('welcome')}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('dashboardOverview')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => <StatCard key={stat.id} {...stat} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <RevenueChart data={chartData} />
                </div>
                <div className="lg:col-span-2">
                    <RecentTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    );
}
   