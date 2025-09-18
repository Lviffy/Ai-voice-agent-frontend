import React, { useState } from 'react';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import ProblemStatement from './components/ProblemStatement.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import ValueProposition from './components/ValueProposition.jsx';
import Features from './components/Features.jsx';
import Pricing from './components/Pricing.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Dashboard from './components/Dashboard.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'signup', or 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials) => {
    // In a real app, you would validate credentials with your backend
    console.log('Login attempt:', credentials);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleSignUp = (userData) => {
    // In a real app, you would create the user account with your backend
    console.log('Sign up attempt:', userData);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const LandingPage = () => (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header onLoginClick={() => setCurrentPage('login')} />
      <main>
        <HeroSection />
        <ProblemStatement />
        <Features />
        <HowItWorks />
        <ValueProposition />
        <Pricing />
      </main>
      <Footer />
    </div>
  );

  return (
    <ThemeProvider>
      {currentPage === 'dashboard' && isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : currentPage === 'login' ? (
        <Login 
          onBackToHome={() => setCurrentPage('home')}
          onSwitchToSignUp={() => setCurrentPage('signup')}
          onLogin={handleLogin}
        />
      ) : currentPage === 'signup' ? (
        <SignUp 
          onBackToHome={() => setCurrentPage('home')}
          onSwitchToLogin={() => setCurrentPage('login')}
          onSignUp={handleSignUp}
        />
      ) : (
        <LandingPage />
      )}
    </ThemeProvider>
  );
};

export default App;