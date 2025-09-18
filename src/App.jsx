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
import { ThemeProvider } from './contexts/ThemeContext.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', or 'signup'

  const LandingPage = () => (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header 
        onLoginClick={() => setCurrentPage('login')}
        onSignUpClick={() => setCurrentPage('signup')}
      />
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
      {currentPage === 'login' ? (
        <Login 
          onBackToHome={() => setCurrentPage('home')}
          onSwitchToSignUp={() => setCurrentPage('signup')}
        />
      ) : currentPage === 'signup' ? (
        <SignUp 
          onBackToHome={() => setCurrentPage('home')}
          onSwitchToLogin={() => setCurrentPage('login')}
        />
      ) : (
        <LandingPage />
      )}
    </ThemeProvider>
  );
};

export default App;