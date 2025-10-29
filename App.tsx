import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import type { AppContextType, Theme, Language } from './types';
import Dashboard from './components/Dashboard';
import AiFinancialAssistant from './components/AiFinancialAssistant';
import Invoices from './components/Invoices';
import Reports from './components/Reports';

// --- ICONS (self-contained SVG components) ---
const SunIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const MoonIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
);
const DashboardIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const InvoiceIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const ReportsIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);
const AiIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
);


// --- CONTEXT & PROVIDER ---
const AppContext = createContext<AppContextType | null>(null);

const translations = {
    en: {
        dashboard: 'Dashboard',
        invoices: 'Invoices',
        reports: 'Reports',
        aiAssistant: 'AI Assistant',
        toggleTheme: 'Toggle Theme',
        switchLanguage: 'Switch Language',
        light: 'Light',
        dark: 'Dark',
        english: 'English',
        arabic: 'Arabic',
    },
    ar: {
        dashboard: 'لوحة التحكم',
        invoices: 'الفواتير',
        reports: 'التقارير',
        aiAssistant: 'المساعد الذكي',
        toggleTheme: 'تبديل السمة',
        switchLanguage: 'تغيير اللغة',
        light: 'فاتح',
        dark: 'داكن',
        english: 'الإنجليزية',
        arabic: 'العربية',
    }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
    const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem('language') as Language) || 'en');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', language);
    }, [language]);
    
    const setTheme = (newTheme: Theme) => setThemeState(newTheme);
    const setLanguage = (newLang: Language) => setLanguageState(newLang);

    const contextValue = useMemo(() => ({
        theme,
        setTheme,
        language,
        setLanguage
    }), [theme, language]);

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

// --- LAYOUT COMPONENTS ---
const Sidebar: React.FC = () => {
    const { language } = useAppContext();
    const t = (key: keyof typeof translations.en) => translations[language][key] || key;
    const navLinkClasses = "flex items-center p-3 my-1 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors";
    const activeLinkClasses = "bg-primary-500 text-white dark:bg-primary-700";

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0 transition-colors">
            <div className="p-4 border-b dark:border-gray-700">
                <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">ProAcct</h1>
            </div>
            <nav className="p-4">
                <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <DashboardIcon className="w-6 h-6 me-3" /><span>{t('dashboard')}</span>
                </NavLink>
                <NavLink to="/invoices" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <InvoiceIcon className="w-6 h-6 me-3" /><span>{t('invoices')}</span>
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <ReportsIcon className="w-6 h-6 me-3" /><span>{t('reports')}</span>
                </NavLink>
                <NavLink to="/ai-assistant" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    <AiIcon className="w-6 h-6 me-3" /><span>{t('aiAssistant')}</span>
                </NavLink>
            </nav>
        </aside>
    );
};

const Header: React.FC = () => {
    const { theme, setTheme, language, setLanguage } = useAppContext();

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');
    
    return (
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
            <div>
                {/* Search bar can go here */}
            </div>
            <div className="flex items-center gap-4">
                <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{language.toUpperCase()}</span>
                </button>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300">
                    {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                </button>
            </div>
        </header>
    );
};


// --- MAIN APP COMPONENT ---
export default function App() {
    return (
        <AppProvider>
            <HashRouter>
                <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/invoices" element={<Invoices />} />
                                <Route path="/reports" element={<Reports />} />
                                <Route path="/ai-assistant" element={<AiFinancialAssistant />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </HashRouter>
        </AppProvider>
    );
}