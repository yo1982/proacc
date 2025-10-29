
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ar';

export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export interface ChartData {
  name: string;
  revenue: number;
  expenses: number;
}
   