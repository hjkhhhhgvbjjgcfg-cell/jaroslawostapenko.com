import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 py-8 border-t border-slate-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Yaroslav Ostapenko. Wszelkie prawa zastrzeżone.
        </p>
        <p className="text-slate-600 text-xs mt-2">
          Stworzone przy użyciu React, TypeScript & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};