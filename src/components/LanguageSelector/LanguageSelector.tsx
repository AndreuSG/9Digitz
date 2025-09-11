import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es' as Language, name: t('lang.spanish'), flag: '🇪🇸', shortCode: 'ES' },
    { code: 'ca' as Language, name: t('lang.catalan'), flag: '🏴󠁥󠁳󠁣󠁴󠁿', shortCode: 'CA' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all duration-300"
      >
        <Globe size={16} style={{ color: '#0477E2' }} />
        <span className="text-sm font-medium hidden md:block text-black">{currentLanguage?.shortCode}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 text-black ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 bg-white backdrop-blur-xl border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[160px]"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                    language === lang.code 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs text-slate-500">{lang.shortCode}</span>
                  </div>
                  {language === lang.code && (
                    <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;