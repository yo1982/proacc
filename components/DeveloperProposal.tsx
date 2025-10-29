
import React, { Fragment } from 'react';
import { useAppContext } from '../App';

interface DeveloperProposalProps {
    isOpen: boolean;
    onClose: () => void;
}

const translations = {
    en: {
        title: "Senior Frontend Engineer & UI/UX Specialist Proposal",
        greeting: "To the Hiring Team,",
        intro: "Thank you for the opportunity to demonstrate my capabilities for your Senior Frontend Developer role. This interactive accounting dashboard was built from the ground up to showcase the exact skills outlined in your job description, including:",
        skills: [
            "Modern React (v18+) with Hooks and Functional Components.",
            "Professional, reusable component architecture using Tailwind CSS for a sleek, Material UI-inspired design.",
            "Advanced state management concepts (demonstrated with Context API).",
            "Multilingual (i18n) support with RTL (Arabic) and LTR (English) layouts.",
            "Dynamic Light/Dark theming for excellent user experience.",
            "Interactive data visualization (Recharts) and responsive design.",
            "Integration with backend services, including AI features via the Gemini API.",
        ],
        pricingTitle: "On Pricing & Collaboration",
        pricingBody: "You asked for my preferred price. As a senior consultant, my goal is to provide value that far exceeds my rate. My pricing is flexible and depends on the project's scope, complexity, and desired timeline. I prefer to align on a project-based fee or a weekly retainer that reflects the strategic value I bring to the team.",
        callToAction: "I am confident in my ability to deliver a high-performance, aesthetically pleasing, and user-centric application that meets your business objectives. I am excited by the prospect of working on a real-world accounting project and contributing to your team's success.",
        nextSteps: "Let's schedule a call to discuss how I can help bring your vision to life.",
        close: "Close"
    },
    ar: {
        title: "مقترح مهندس واجهات أمامية أول ومتخصص في تجربة المستخدم",
        greeting: "إلى فريق التوظيف،",
        intro: "شكرًا لكم على إتاحة الفرصة لي لإظهار قدراتي لمنصب مطور الواجهات الأمامية الأول لديكم. تم بناء لوحة التحكم المحاسبية التفاعلية هذه من الألف إلى الياء لعرض المهارات المحددة في وصف وظيفتكم، بما في ذلك:",
        skills: [
            "React الحديث (v18+) مع Hooks والمكونات الوظيفية.",
            "بنية مكونات احترافية قابلة لإعادة الاستخدام باستخدام Tailwind CSS لتصميم أنيق مستوحى من Material UI.",
            "مفاهيم إدارة الحالة المتقدمة (تم توضيحها باستخدام Context API).",
            "دعم متعدد اللغات (i18n) مع تخطيطات RTL (العربية) و LTR (الإنجليزية).",
            "سمات ديناميكية فاتحة/داكنة لتجربة مستخدم ممتازة.",
            "تصور تفاعلي للبيانات (Recharts) وتصميم متجاوب.",
            "التكامل مع خدمات الواجهة الخلفية، بما في ذلك ميزات الذكاء الاصطناعي عبر Gemini API.",
        ],
        pricingTitle: "حول الأسعار والتعاون",
        pricingBody: "لقد سألتم عن سعري المفضل. بصفتي استشاريًا أول، هدفي هو تقديم قيمة تتجاوز معدلي بكثير. أسعاري مرنة وتعتمد على نطاق المشروع وتعقيده والجدول الزمني المطلوب. أفضل الاتفاق على رسوم على أساس المشروع أو رسوم أسبوعية تعكس القيمة الاستراتيجية التي أقدمها للفريق.",
        callToAction: "أنا واثق من قدرتي على تقديم تطبيق عالي الأداء، جذاب من الناحية الجمالية، ومتمحور حول المستخدم يلبي أهداف عملكم. أنا متحمس لاحتمال العمل على مشروع محاسبة حقيقي والمساهمة في نجاح فريقكم.",
        nextSteps: "دعنا نحدد موعدًا لمكالمة لمناقشة كيف يمكنني المساعدة في تحقيق رؤيتكم.",
        close: "إغلاق"
    }
};


export default function DeveloperProposal({ isOpen, onClose }: DeveloperProposalProps) {
    const { language } = useAppContext();
    const t = (key: keyof (typeof translations)['en']) => translations[language][key] || key;

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-95 animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary-700 dark:text-primary-400">
                            {t('title')}
                        </h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300">{t('greeting')}</p>
                    <p className="text-gray-600 dark:text-gray-300">{t('intro')}</p>
                    
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ps-4">
                        {(t('skills') as string[]).map((skill, index) => <li key={index}>{skill}</li>)}
                    </ul>

                    <div className="pt-4 border-t dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('pricingTitle')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{t('pricingBody')}</p>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 font-medium">{t('callToAction')}</p>
                    <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">{t('nextSteps')}</p>

                    <div className="flex justify-end pt-4">
                         <button
                            onClick={onClose}
                            className="px-6 py-2 font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                        >
                            {t('close')}
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes scale-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
}
   