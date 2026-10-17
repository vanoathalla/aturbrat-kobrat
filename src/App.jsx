import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import PricingCalculator from './components/PricingCalculator';
import Squad from './components/Squad';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import Toast from './components/Toast';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handleSelectService = (serviceId) => {
    setSelectedServiceId(serviceId);
    const element = document.getElementById('kalkulator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('⚡ Layanan dipilih! Estimasi otomatis diperbarui.');
  };

  // Keyboard shortcut Ctrl+K or Cmd+K to launch terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="kobrat-app">
      {/* Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onShowToast={showToast}
      />

      {/* Hero Header */}
      <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Services Grid */}
      <Services onSelectService={handleSelectService} />

      {/* Interactive Pricing Estimator */}
      <PricingCalculator
        selectedServiceId={selectedServiceId}
        onShowToast={showToast}
      />

      {/* The Circle Squad */}
      <Squad />

      {/* Portfolio Showcase */}
      <Portfolio />

      {/* Testimonials */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Footer */}
      <Footer onShowToast={showToast} />

      {/* Interactive CLI Terminal Modal */}
      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Global Toast Alerts */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
