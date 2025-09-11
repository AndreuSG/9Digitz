import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { WhiteToBlueGradient } from '../BackgroundGradients';
import JobModal from '../JobModal';
import { TeamSectionProps } from './types';
import { TEAM_MEMBERS, TEAM_CONSTANTS } from './constants';

const TeamSection: React.FC<TeamSectionProps> = () => {
  const { t } = useLanguage();
  const [isJobModalOpen, setIsJobModalOpen] = React.useState(false);

  // Organize team members by level for the org chart
  const ceo = TEAM_MEMBERS.find(member => member.level === 1);
  const directors = TEAM_MEMBERS.filter(member => member.level === 2);
  const managers = TEAM_MEMBERS.filter(member => member.level === 3);
  const teamMembers = TEAM_MEMBERS.filter(member => member.level === 4);

  const TeamCard = ({ member, index, isConnected = false }: { member: any, index: number, isConnected?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 text-center relative ${isConnected ? 'border-blue-300' : ''
        }`}
    >
      {/* Connection line indicator */}
      {isConnected && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-blue-300" />
      )}

      <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl font-semibold text-slate-900 mb-1">
        {member.name}
      </h3>

      <p className="text-blue-600 font-medium mb-2">
        {getTranslatedPosition(member.position)}
      </p>

      <p className="text-slate-600 text-sm mb-4">
        {getTranslatedDepartment(member.department)}
      </p>
    </motion.div>
  );

  // Function to get translated position
  const getTranslatedPosition = (position: string) => {
    const positionMap: { [key: string]: string } = {
      'CEO - Founder': 'team.positions.ceo',
      'Adjunt a Direcció': 'team.positions.adjunt',
      'Cap Informàtica i Programació': 'team.positions.cap_informatica',
      'Administració i Atenció al Client': 'team.positions.administracio',
      'Marketing i Xarxes Socials': 'team.positions.marketing',
      'Integracions API i Desenvolupament': 'team.positions.integracions',
      'Comptabilitat': 'team.positions.comptabilitat',
      'Enginyer Telecomunicacions': 'team.positions.enginyer'
    };
    return t(positionMap[position] || position);
  };

  // Function to get translated department
  const getTranslatedDepartment = (department: string) => {
    const departmentMap: { [key: string]: string } = {
      'Dirección General': 'team.departments.direccio',
      'Cap Marketing/Audiovisuals': 'team.departments.marketing_audiovisuals',
      'Desarrollo Tecnológico': 'team.departments.desarrollo',
      'Administración': 'team.departments.administracion',
      'Marketing Digital': 'team.departments.marketing_digital',
      'Desarrollo': 'team.departments.desarrollo_simple',
      'Seguretat Informàtica': 'team.departments.seguridad'
    };
    return t(departmentMap[department] || department);
  };

  return (
    <WhiteToBlueGradient>
      <section id="team" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6">
              {t('team.title.main')}{' '}
              <span className="text-blue-400 font-medium">{t('team.title.highlight')}</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('team.subtitle')}
            </p>
          </motion.div>

          {/* Team Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
          </motion.div>

          {/* Organizational Chart */}
          <div className="space-y-12">
            {/* CEO Level */}
            {ceo && (
              <div className="flex justify-center">
                <div className="w-80">
                  <TeamCard member={ceo} index={0} />
                </div>
              </div>
            )}

            {/* Connection line from CEO to Directors */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-blue-300" />
            </div>

            {/* Directors Level */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                {directors.map((director, index) => (
                  <TeamCard key={director.id} member={director} index={index + 1} isConnected />
                ))}
              </div>
            </div>

            {/* Connection lines from Directors to Managers */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-blue-300" />
            </div>

            {/* Managers Level */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {managers.map((manager, index) => (
                <TeamCard key={manager.id} member={manager} index={index + 3} isConnected />
              ))}
            </div>

            {/* Connection line from Managers to Team Members */}
            {teamMembers.length > 0 && (
              <>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300" />
                </div>

                {/* Team Members Level */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  {teamMembers.map((member, index) => (
                    <TeamCard key={member.id} member={member} index={index + 6} isConnected />
                  ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center mt-16"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Users className="text-blue-400" size={32} />
                <h3 className="text-2xl font-semibold text-slate-900">
                  {t('team.cta.title')}
                </h3>
              </div>
              <p className="text-slate-600 mb-6">
                {t('team.cta.description')}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsJobModalOpen(true)}
                className="text-white px-8 py-4 rounded-full text-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
                style={{ backgroundColor: '#0076e3' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005bb5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0076e3'}
              >
                <Briefcase size={20} />
                <span>{t('team.cta.button')}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        <JobModal
          isOpen={isJobModalOpen}
          onClose={() => setIsJobModalOpen(false)}
        />
      </section>
    </WhiteToBlueGradient>
  );
};

export default TeamSection;