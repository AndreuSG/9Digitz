import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { WhatsAppButtonProps } from './types';

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber = '34937374400'
}) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleWhatsAppClick = () => {
    const message = t('whatsapp.message');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
      >
        <motion.button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => {
            setIsHovered(true);
            setShowTooltip(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setShowTooltip(false);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 flex items-center space-x-3 group"
        >
          {/* WhatsApp Icon */}
          <div className="relative">
            <MessageCircle size={24} className="fill-current" />
            
            {/* Notification dot */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
            />
          </div>

          {/* Expandable text */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="whitespace-nowrap overflow-hidden font-medium"
              >
                {t('whatsapp.button')}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Pulse animation */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-green-400 rounded-full -z-10"
          />
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10, x: -20 }}
              className="absolute bottom-full left-0 mb-2 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
            >
              {t('whatsapp.tooltip')}
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile floating message preview */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
        className="fixed bottom-24 left-6 z-40 max-w-xs"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200 relative"
        >
          <div className="flex items-start space-x-3">
            <img 
              src="./images/logos/9z-trans.png" 
              alt="9DIGITZ"
              className="w-16 h-16 object-contain flex-shrink-0"
            />
            <div className="flex-1">
              <div className="text-slate-900 font-medium text-sm mb-1">
                9DIGITZ
              </div>
              <div className="text-slate-600 text-xs leading-relaxed">
                {t('whatsapp.greeting')}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-400 hover:text-slate-600 p-1"
              onClick={(e) => {
                e.currentTarget.parentElement?.parentElement?.remove();
              }}
            >
              <X size={14} />
            </motion.button>
          </div>
          
          {/* Message tail */}
          <div className="absolute bottom-0 left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white transform translate-y-full" />
        </motion.div>
      </motion.div>
    </>
  );
};

export default WhatsAppButton;