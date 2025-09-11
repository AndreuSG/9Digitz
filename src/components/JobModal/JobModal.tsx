import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Users, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { JobModalProps } from './types';

const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-center flex-shrink-0">
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X size={16} />
                </motion.button>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <Users className="text-white" size={24} />
                </motion.div>

                <h2 className="text-xl font-bold text-white mb-2">
                  {t('jobModal.title')}
                </h2>
                <p className="text-blue-100">
                  {t('jobModal.subtitle')}
                </p>
              </div>

              {/* Content */}
              <div className="p-6 text-center flex-1 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="text-blue-500" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {t('jobModal.noPositions.title')}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t('jobModal.noPositions.description')}
                  </p>
                </motion.div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full text-white py-3 rounded-full font-medium transition-colors flex items-center justify-center space-x-2"
                    style={{ backgroundColor: '#0076e3' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005bb5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0076e3'}
                    onClick={() => {
                      const subject = encodeURIComponent('Candidatura Espontánea');
                      const body = encodeURIComponent('Hola, me gustaría formar parte del equipo de 9DIGITZ...');
                      window.location.href = `mailto:info@9digitz.com?subject=${subject}&body=${body}`;
                    }}
                  >
                    <Mail size={18} />
                    <span>{t('jobModal.sendCV')}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full border border-slate-300 text-slate-700 py-3 rounded-full font-medium hover:bg-slate-50 transition-colors"
                  >
                    {t('jobModal.close')}
                  </motion.button>
                </div>

                <div className="mt-4 text-xs text-slate-500">
                  {t('jobModal.notification')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobModal;