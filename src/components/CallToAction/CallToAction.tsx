import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { WhiteToBlueGradient } from '../BackgroundGradients';
import { scrollToSection } from '../../utils/scrollUtils';
import { CallToActionProps } from './types';

const CallToAction: React.FC<CallToActionProps> = () => {
  const { t } = useLanguage();

  const features = [
    t('cta.features.security'),
    t('cta.features.solutions'),
    t('cta.features.experts'),
    t('cta.features.support'),
    t('cta.features.guarantee')
  ];

  return (
    <WhiteToBlueGradient>
      <section className="py-32 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            {t('cta.title.main')}{' '}
            <span className="text-blue-400 font-medium">{t('cta.title.highlight')}</span>{' '}
            {t('cta.title.suffix')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - App Download */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-xl border border-slate-200 text-slate-900 px-6 py-4 rounded-2xl hover:bg-white transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  💼
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-400">Consulta</div>
                  <div className="font-semibold">{t('cta.buttons.consultation')}</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-xl border border-slate-200 text-slate-900 px-6 py-4 rounded-2xl hover:bg-white transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  📞
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-400">{t('cta.buttons.call')}</div>
                  <div className="font-semibold">{t('cta.contact.phone')}</div>
                </div>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                {t('cta.whyChoose.title')}
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-slate-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - QR Code and Phone */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="inline-block bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-3xl mb-8 shadow-2xl"
            >
              <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <img
                  src="./images/logos/9z-white.png"
                  alt="9DIGITZ Logo"
                  className="w-60 h-60 object-contain"
                />
              </div>
            </motion.div>

            <div className="text-slate-900 mb-4">
              <div className="text-lg font-semibold mb-2">
                {t('cta.contact.readyTitle')}
              </div>
              <div className="text-slate-600">
                {t('cta.contact.readySubtitle')}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Smartphone className="text-blue-400" size={48} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="text-white px-12 py-6 rounded-full text-xl font-semibold transition-colors inline-flex items-center space-x-3"
            style={{ backgroundColor: '#0076e3' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005bb5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0076e3'}
          >
            <span>{t('cta.buttons.mainCta')}</span>
          </motion.button>
          
          <div className="mt-6 text-slate-600">
            {t('cta.footerText')}
          </div>
        </motion.div>
      </div>
      </section>
    </WhiteToBlueGradient>
  );
};

export default CallToAction;