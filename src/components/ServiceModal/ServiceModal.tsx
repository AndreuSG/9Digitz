import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { scrollToSection } from '../../utils/scrollUtils';
import { ServiceModalProps } from './types';

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  const { t } = useLanguage();
  
  if (!service) return null;

  // Get service key for translations
  const getServiceKey = (serviceName: string) => {
    if (serviceName.toLowerCase().includes('app')) return 'apps';
    if (serviceName.toLowerCase().includes('marketing')) return 'marketing';
    if (serviceName.toLowerCase().includes('cloud')) return 'cloud';
    if (serviceName.toLowerCase().includes('ciberseguridad')) return 'security';
    if (serviceName.toLowerCase().includes('voip')) return 'voip';
    if (serviceName.toLowerCase().includes('operador')) return 'internet';
    if (serviceName.toLowerCase().includes('cartelería')) return 'digital';
    if (serviceName.toLowerCase().includes('pantallas')) return 'interactive';
    if (serviceName.toLowerCase().includes('audiovisual')) return 'audiovisual';
    return 'microsoft';
  };

  const serviceKey = getServiceKey(service.name);

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      scrollToSection('contact');
    }, 300); // Wait for modal close animation
  };

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
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="relative flex-shrink-0">
                <img 
                  src={service.details.image}
                  alt={service.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X size={20} />
                </motion.button>

                {/* Service icon and title */}
                <div className="absolute bottom-6 left-6 flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center`}>
                    <img 
                      src={service.icon} 
                      alt={service.name}
                      className="w-10 h-10 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {service.name}
                    </h2>
                    <p className="text-white/80">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                      {t('modal.fullDescription')}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {t(`services.${serviceKey}.fullDescription`)}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContactClick}
                      className="text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center space-x-2"
                      style={{ backgroundColor: '#0076e3' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005bb5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0076e3'}
                    >
                      <span>{t('modal.requestInfo')}</span>
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>

                  {/* Features and Benefits */}
                  <div className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-3">
                        {t('modal.features')}
                      </h4>
                      <div className="space-y-2">
                        {[0, 1, 2, 3].map((index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="text-blue-500 flex-shrink-0" size={18} />
                            <span className="text-slate-700">{t(`services.${serviceKey}.features.${index}`)}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-3">
                        {t('modal.benefits')}
                      </h4>
                      <div className="space-y-2">
                        {[0, 1, 2, 3].map((index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (4 + index) * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                            <span className="text-slate-700">{t(`services.${serviceKey}.benefits.${index}`)}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;