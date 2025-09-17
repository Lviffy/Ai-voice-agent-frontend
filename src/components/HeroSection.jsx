import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Loader } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen -mt-16 pt-16 flex flex-col items-center justify-start overflow-hidden bg-background">
      {/* Cosmic particle effect (background dots) */}
      <div className="absolute inset-0 cosmic-grid opacity-30"></div>

      {/* Gradient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[600px] h-[600px] rounded-full">
        <div className="w-full h-full opacity-10 bg-primary blur-[120px]"></div>
      </div>

      <div className="flex-1 flex items-center justify-center pt-12">
      <div className={`relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center space-y-8 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-muted text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            AI-Powered Education Support
            <Loader className="h-3 w-3 animate-spin text-primary" />
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-foreground leading-[1.1] space-y-2">
          <div className="whitespace-nowrap">Multilingual AI Voice Agent</div>
          <div className="whitespace-nowrap">for <span className="text-primary">Student & Parent Support</span></div>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
          Seamless, conversational solutions for education institutions. Our AI agent handles multilingual support, voice interactions, 24/7 service, context management, and privacy-focused conversations to streamline campus communications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 items-center">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground text-base h-12 px-8 transition-all duration-200 min-h-[48px]">
            Request a Demo
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-accent hover:text-accent-foreground text-base h-12 px-8 transition-all duration-200 min-h-[48px]">
            Contact Sales
          </Button>
        </div>

        <div className="pt-6 text-sm text-muted-foreground">
          24/7 Support • Multi-language Ready • Privacy Compliant
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;