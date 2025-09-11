import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { BlueToWhiteGradient } from '../BackgroundGradients';
import ServiceModal from '../ServiceModal';
import { scrollToSection } from '../../utils/scrollUtils';
import { ServicesSectionProps, Service } from './types';
import { SERVICES } from './constants';

const ServicesSection: React.FC<ServicesSectionProps> = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <BlueToWhiteGradient>
      <section id="services" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
              {t('services.title.main')}{' '}
              <span className="text-white font-medium">{t('services.title.highlight')}</span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SERVICES.map((service, index) => {
              // Get translated service data
              const serviceKey = service.name.toLowerCase().includes('app') ? 'apps' :
                               service.name.toLowerCase().includes('marketing') ? 'marketing' :
                               service.name.toLowerCase().includes('cloud') ? 'cloud' :
                               service.name.toLowerCase().includes('ciberseguridad') ? 'security' :
                               service.name.toLowerCase().includes('voip') ? 'voip' :
                               service.name.toLowerCase().includes('operador') ? 'internet' :
                               service.name.toLowerCase().includes('cartelería') ? 'digital' :
                               service.name.toLowerCase().includes('pantallas') ? 'interactive' :
                               service.name.toLowerCase().includes('audiovisual') ? 'audiovisual' :
                               'microsoft';
              
              return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => handleServiceClick(service)}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:bg-slate-800/70 transition-all duration-300 text-center cursor-pointer flex flex-col h-full"
              >
                <div className="flex justify-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl`}
                >
                  <img 
                    src={service.icon} 
                    alt={service.name}
                    className="w-8 h-8 object-contain filter brightness-0 invert"
                  />
                </motion.div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {t(`services.${serviceKey}.name`)}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                  {t(`services.${serviceKey}.description`)}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.4, delay: index * 0.03 + 0.15 }}
                  className={`mt-4 h-0.5 bg-gradient-to-r ${service.color} rounded-full flex-shrink-0`}
                />
              </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="text-center mt-16"
          >
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
              style={{ backgroundColor: '#0076e3' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005bb5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0076e3'}
            >
              {t('services.cta')}
            </button>
          </motion.div>
        </div>

        <ServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={selectedService}
        />
      </section>
    </BlueToWhiteGradient>
  );
};

export default ServicesSection;