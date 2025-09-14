import React from 'react';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import Features from './components/Features.jsx';
import Testimonials from './components/Testimonials.jsx';
import Pricing from './components/Pricing.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default App;