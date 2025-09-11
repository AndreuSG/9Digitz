import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import SecuritySection from './components/SecuritySection';
import ProcessJourney from './components/ProcessJourney';
// import Testimonials from './components/Testimonials';
import TeamSection from './components/TeamSection';
import ContactForm from './components/ContactForm';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <LanguageProvider>
      <div className="bg-slate-900 min-h-screen">
        <Navbar />
        <Hero />
        <ServicesSection />
        <SecuritySection />
        <ProcessJourney />
        {/* <Testimonials /> */}
        <TeamSection />
        <ContactForm />
        <CallToAction />
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}

export default App;