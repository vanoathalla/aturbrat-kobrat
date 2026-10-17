import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

// Multi-Pages
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import CalculatorPage from './pages/CalculatorPage';
import SquadPage from './pages/SquadPage';
import PortfolioPage from './pages/PortfolioPage';
import FAQPage from './pages/FAQPage';
import AdminPage from './pages/AdminPage';
import ArchivePage from './pages/ArchivePage';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
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
    <>
      <ScrollToTop />
      <div className={`kobrat-app ${isAdminRoute ? 'is-admin-view' : ''}`}>
        {/* Only show Public User Navbar on non-admin routes */}
        {!isAdminRoute && (
          <Navbar
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {/* Page Routing */}
        <main className={`main-content ${isAdminRoute ? 'admin-main-content' : ''}`}>
          <Routes>
            <Route path="/" element={<Home onOpenTerminal={() => setIsTerminalOpen(true)} />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/calculator" element={<CalculatorPage onShowToast={showToast} />} />
            <Route path="/squad" element={<SquadPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/faq" element={<FAQPage />} />
            {/* Dedicated Protected Admin Route */}
            <Route 
              path="/admin" 
              element={
                <AdminPage 
                  onShowToast={showToast} 
                  onOpenTerminal={() => setIsTerminalOpen(true)} 
                />
              } 
            />
          </Routes>
        </main>

        {/* Only show Public User Footer on non-admin routes */}
        {!isAdminRoute && <Footer onShowToast={showToast} />}

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
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
