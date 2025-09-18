import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import Logo from './Logo.jsx';
import { Menu, X, CircleDot, DollarSign, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

const Header = ({ onLoginClick, onSignUpClick }) => {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // Intersection Observer for scroll-based section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: [0.1, 0.3, 0.5, 0.7]
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && ['home', 'features', 'pricing'].includes(sectionId)) {
            setActivePage(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['home', 'features', 'pricing'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (page) => (e) => {
    e.preventDefault();
    setActivePage(page);
    
    // Add a small delay for smoother visual feedback
    setTimeout(() => {
      const element = document.getElementById(page);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: page === 'home' ? 'start' : 'center',
          inline: 'nearest'
        });
      }
    }, 50);
    
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 px-4">
      <header className="w-full max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <div className="p-3">
          <Logo />
        </div>

        <button
          className="md:hidden p-3 rounded-2xl text-muted-foreground hover:text-foreground"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <div className="rounded-full px-1 py-1 backdrop-blur-md bg-background/80 border border-border shadow-lg">
            <ToggleGroup type="single" value={activePage} onValueChange={(value) => value && setActivePage(value)}>
              {/* Home toggle scrolls to hero section */}
              <ToggleGroupItem
                value="home"
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300 ease-out relative",
                  activePage === 'home' ? 'text-accent-foreground bg-accent shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                onClick={handleNavClick('home')}
              >
                Home
              </ToggleGroupItem>
              {/* Features toggle scrolls to section */}
              <ToggleGroupItem
                value="features"
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300 ease-out relative",
                  activePage === 'features' ? 'text-accent-foreground bg-accent shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                onClick={handleNavClick('features')}
              >
                <CircleDot size={16} className="inline-block mr-1.5" /> Features
              </ToggleGroupItem>
              {/* Pricing toggle scrolls to section */}
              <ToggleGroupItem
                value="pricing"
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300 ease-out relative",
                  activePage === 'pricing' ? 'text-accent-foreground bg-accent shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                onClick={handleNavClick('pricing')}
              >
                <DollarSign size={16} className="inline-block mr-1.5" /> Pricing
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md py-4 px-6 border border-border rounded-2xl shadow-lg z-50">
            <div className="flex flex-col gap-4">
              {/* Home: scrolls */}
              <a
                href="#home"
                className={`px-3 py-2 text-sm rounded-md transition-all duration-300 ease-out ${
                  activePage === 'home' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={handleNavClick('home')}
              >
                Home
              </a>
              {/* Features: scrolls */}
              <a
                href="#features"
                className={`px-3 py-2 text-sm rounded-md transition-all duration-300 ease-out ${
                  activePage === 'features' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={handleNavClick('features')}
              >
                <CircleDot size={16} className="inline-block mr-1.5" /> Features
              </a>
              {/* Pricing: scrolls */}
              <a
                href="#pricing"
                className={`px-3 py-2 text-sm rounded-md transition-all duration-300 ease-out ${
                  activePage === 'pricing' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={handleNavClick('pricing')}
              >
                <DollarSign size={16} className="inline-block mr-1.5" /> Pricing
              </a>

              <button
                onClick={onLoginClick}
                className={`px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted`}
              >
                Login
              </button>

              <button
                onClick={onSignUpClick}
                className={`px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted`}
              >
                Sign Up
              </button>

              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <div className="flex items-center gap-2">
                  <Moon size={16} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Switch
                    checked={!isDarkMode}
                    onCheckedChange={toggleTheme}
                    className="data-[state=checked]:bg-primary"
                  />
                  <Sun size={16} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full px-3 py-2">
                <Moon size={16} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                <Switch
                  checked={!isDarkMode}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
                <Sun size={16} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
          <div className="rounded-2xl flex gap-2">
            <Button onClick={onLoginClick} variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted">
              Login
            </Button>
            <Button onClick={onSignUpClick} variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Sign Up
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;