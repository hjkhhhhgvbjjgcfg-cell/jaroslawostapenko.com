import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
              <Code2 size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-white'} transition-colors`}>
              Yaroslav<span className="text-blue-600">.dev</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium hover:text-blue-500 transition-colors ${
                  scrolled ? 'text-slate-600' : 'text-slate-200 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Zatrudnij mnie
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} className={!scrolled ? "lg:text-white" : ""} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl transition-all duration-300 origin-top ${
          isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-slate-600 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};