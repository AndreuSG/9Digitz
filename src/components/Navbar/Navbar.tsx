import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from '../LanguageSelector';
import { scrollToSection } from '../../utils/scrollUtils';
import { NavbarProps } from './types';
import { NAVBAR_CONSTANTS } from './constants';

const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useLanguage();

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl border-b border-slate-200/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24 md:h-22">
          {/* Logo principal - Left side */}
          <div className="flex items-center">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="focus:outline-none"
            >
              <img
                src="./images/logos/Logotip-transparent.png"
                alt="9DIGITZ"
                className="h-28 md:h-36 object-contain select-none"
                draggable={false}
                loading="eager"
                decoding="async"
                style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))' }}
              />
            </motion.button>
          </div>

          {/* Navigation Menu - Center */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {NAVBAR_CONSTANTS.NAV_ITEMS.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                {t(`nav.${['services', 'security', 'process', 'team', 'contact'][index]}`)}
              </button>
            ))}
          </div>

          {/* Icono 9Z y CTA - Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>

            {/* Icono 9Z */}
            <motion.img
              src="./images/logos/9z-trans.png"
              alt="9DIGITZ Logo"
              className="hidden md:block h-20 w-auto md:h-24 select-none"
              draggable={false}
              loading="eager"
              decoding="async"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.1 }}
              style={{
                willChange: 'transform'
              }}
            />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-900 ml-auto"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-slate-200/50"
          >
            <div className="flex flex-col space-y-4">
              {NAVBAR_CONSTANTS.NAV_ITEMS.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-slate-700 hover:text-blue-600 transition-colors text-left"
                >
                  {t(`nav.${['services', 'security', 'process', 'team', 'contact'][index]}`)}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200/50">
                <LanguageSelector />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
