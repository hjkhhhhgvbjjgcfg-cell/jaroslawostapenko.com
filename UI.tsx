
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Resources } from '../types';
import { Coins, Zap, Droplet, Users, Wheat, Microscope } from 'lucide-react';

export const ResourceIcon = ({ type, size = 16 }: { type: keyof Resources, size?: number }) => {
  switch (type) {
    case 'money': return <Coins size={size} className="text-yellow-400" />;
    case 'energy': return <Zap size={size} className="text-yellow-200" />;
    case 'oil': return <Droplet size={size} className="text-stone-800" />;
    case 'population': return <Users size={size} className="text-blue-300" />;
    case 'food': return <Wheat size={size} className="text-green-400" />;
    case 'researchPoints': return <Microscope size={size} className="text-purple-400" />;
    default: return null;
  }
};

export const ResourceBar: React.FC<{ resources: Resources }> = ({ resources }) => {
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="bg-stone-900 border-b border-stone-700 text-white p-2 flex overflow-x-auto gap-4 no-scrollbar items-center shadow-lg">
       <div className="flex items-center gap-1 min-w-fit px-2 py-1 bg-stone-800 rounded">
         <ResourceIcon type="money" />
         <span className="font-mono font-bold text-sm text-yellow-400">${formatNumber(resources.money)}</span>
       </div>
       <div className="flex items-center gap-1 min-w-fit">
         <ResourceIcon type="population" />
         <span className="font-mono text-xs">{formatNumber(resources.population)}</span>
       </div>
       <div className="flex items-center gap-1 min-w-fit">
         <ResourceIcon type="food" />
         <span className="font-mono text-xs">{formatNumber(resources.food)}</span>
       </div>
       <div className="flex items-center gap-1 min-w-fit">
         <ResourceIcon type="oil" />
         <span className="font-mono text-xs">{formatNumber(resources.oil)}</span>
       </div>
       <div className="flex items-center gap-1 min-w-fit">
         <ResourceIcon type="energy" />
         <span className="font-mono text-xs">{formatNumber(resources.energy)}</span>
       </div>
    </div>
  );
};

export const Card: React.FC<{ children: React.ReactNode, title?: string, action?: React.ReactNode }> = ({ children, title, action }) => (
  <div className="bg-stone-800 border border-stone-700 rounded-lg p-4 shadow-sm mb-4">
    {(title || action) && (
        <div className="flex justify-between items-center mb-3">
            {title && <h3 className="font-bold text-stone-200">{title}</h3>}
            {action && <div>{action}</div>}
        </div>
    )}
    <div className="text-stone-400 text-sm">
        {children}
    </div>
  </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }> = ({ children, variant = 'primary', className, ...props }) => {
    const base = "px-4 py-2 rounded font-medium transition-colors duration-200 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-yellow-600 hover:bg-yellow-500 text-stone-900 shadow-md",
        secondary: "bg-stone-700 hover:bg-stone-600 text-stone-200",
        danger: "bg-red-900/50 hover:bg-red-800/50 text-red-200 border border-red-800"
    };
    
    return (
        <button className={`${base} ${variants[variant]} ${className || ''}`} {...props}>
            {children}
        </button>
    );
};
