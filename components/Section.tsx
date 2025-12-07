import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  light?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, className = "", children, light = true }) => {
  return (
    <section 
      id={id} 
      className={`py-20 lg:py-32 ${light ? 'bg-slate-50' : 'bg-white'} ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="h-1 w-20 bg-blue-600 rounded-full mt-6"></div>
        </div>
        {children}
      </div>
    </section>
  );
};