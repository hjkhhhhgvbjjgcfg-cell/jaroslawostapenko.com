import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { EMAIL } from '../constants';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide">
                Dostępny do pracy
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                Yaroslav <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Ostapenko
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                Full Stack Developer. Ambitny 18-letni programista tworzący nowoczesne rozwiązania webowe.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25 flex items-center gap-2"
              >
                Skontaktuj się
                <Mail size={18} />
              </a>
              <a 
                href="#experience" 
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700 hover:border-slate-600"
              >
                Moje doświadczenie
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4 text-slate-400">
              <a href={`mailto:${EMAIL}`} className="hover:text-blue-400 transition-colors">
                <Mail size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              {/* Placeholder for Profile Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl bg-slate-800 flex items-center justify-center">
                 <img 
                    src="https://picsum.photos/600/600?grayscale" 
                    alt="Yaroslav Ostapenko"
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                 />
                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent">
                   <p className="text-white font-medium text-lg">Full Stack Developer</p>
                   <p className="text-slate-400 text-sm">HTML • CSS • JS • PHP</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};