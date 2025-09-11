import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollToSection } from '../utils/scrollUtils';

const Logo = () => (
  <img 
    src="./images/logos/logo-blanc.png" 
    alt="9DIGITZ Logo"
    className="h-16 w-auto object-contain"
  />
);

const Footer = () => {
  const { t } = useLanguage();
  
  const handleServiceClick = () => {
    scrollToSection('services');
  };

  const handleTeamClick = () => {
    scrollToSection('team');
  };

  const footerLinks = {
    [t('footer.services.title')]: [
      t('services.apps.name'),
      t('services.marketing.name'),
      t('services.cloud.name'),
      t('services.security.name'),
      t('services.voip.name'),
      t('services.internet.name'),
      t('services.digital.name'),
      t('services.interactive.name'),
      t('services.audiovisual.name'),
      t('services.microsoft.name')
    ],
    [t('footer.solutions.title')]: [
      t('footer.solutions.transformation'),
      t('footer.solutions.migration'),
      t('footer.solutions.audits'),
      t('footer.solutions.consulting'),
      t('footer.solutions.support'),
      t('footer.solutions.integration'),
      t('footer.solutions.automation'),
      t('footer.solutions.backup'),
      t('footer.solutions.monitoring'),
      t('footer.solutions.optimization')
    ],
    [t('footer.team.title')]: [
      'Josep M',
      'Riki',
      'Andreu',
      'Marta',
      'Robert',
      'Marc',
      'Meritxell',
      'Javi'
    ]
  };

  return (
    <footer style={{ backgroundColor: '#0076e3' }} className="border-t border-blue-600">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="./images/logos/logo-blanc.png" 
                alt="9DIGITZ Logo"
                className="h-48 w-auto object-contain"
              />
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Links - Each column takes equal space */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={
                       category === t('footer.services.title')
                          ? handleServiceClick 
                         : category === t('footer.team.title')
                          ? handleTeamClick 
                          : undefined
                      }
                      className="text-blue-100 hover:text-white transition-colors text-sm text-left cursor-pointer w-full"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-blue-600 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="text-blue-100 text-sm">
                {t('footer.copyright')}
              </div>
            </div>

            <div className="flex items-center space-x-6 text-blue-100 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                {t('footer.legal.privacy')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t('footer.legal.terms')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t('footer.legal.notice')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;