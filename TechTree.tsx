
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { TechDef } from '../types';
import { TECH_TREE } from '../gameData';
import { Lock, Check, Zap } from 'lucide-react';

interface TechTreeProps {
  researchedTechs: string[];
  currentResearch: string | null;
  onSelectResearch: (id: string) => void;
}

export const TechTree: React.FC<TechTreeProps> = ({ researchedTechs, currentResearch, onSelectResearch }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG Lines
  const renderLines = () => {
    return Object.values(TECH_TREE).map(tech => {
        return tech.prerequisites.map(preId => {
            const pre = TECH_TREE[preId];
            if (!pre) return null;
            // Coordinates in percentage
            const x1 = pre.x;
            const y1 = pre.y;
            const x2 = tech.x;
            const y2 = tech.y;
            
            const isUnlocked = researchedTechs.includes(pre.id);

            return (
                <line 
                    key={`${preId}-${tech.id}`}
                    x1={`${x1}%`} y1={`${y1}%`} 
                    x2={`${x2}%`} y2={`${y2}%`} 
                    stroke={isUnlocked ? "#C5A059" : "#44403C"} 
                    strokeWidth="2"
                    opacity="0.5"
                />
            );
        });
    });
  };

  return (
    <div className="relative w-full h-[600px] bg-stone-900 rounded-lg overflow-hidden border border-stone-800 shadow-inner" ref={containerRef}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* SVG Connector Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {renderLines()}
        </svg>

        {/* Nodes */}
        {Object.values(TECH_TREE).map(tech => {
            const isResearched = researchedTechs.includes(tech.id);
            const isAvailable = tech.prerequisites.every(p => researchedTechs.includes(p));
            const isResearching = currentResearch === tech.id;
            
            // X, Y are in %
            // Adjust position to center the node (approx width 100px)
            const style = {
                left: `${tech.x}%`,
                top: `${tech.y}%`,
                transform: 'translate(-50%, -50%)'
            };

            return (
                <div 
                    key={tech.id}
                    className={`absolute z-10 w-28 p-2 rounded flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 border-2 
                        ${isResearched ? 'bg-green-900/80 border-green-500 text-green-100' : 
                          isResearching ? 'bg-yellow-900/80 border-yellow-500 text-yellow-100 scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)]' :
                          isAvailable ? 'bg-stone-800 border-stone-600 hover:border-white text-stone-300' : 
                          'bg-stone-900 border-stone-800 text-stone-600 opacity-70 grayscale'}`}
                    style={style}
                    onClick={() => {
                        if (isAvailable && !isResearched) {
                            onSelectResearch(tech.id);
                        }
                    }}
                >
                    <div className="mb-1">
                        {isResearched ? <Check size={16} /> : isResearching ? <Zap size={16} className="animate-pulse"/> : isAvailable ? <div className="w-4 h-4 rounded-full border border-current"/> : <Lock size={16} />}
                    </div>
                    <div className="text-[10px] font-bold leading-tight">{tech.name}</div>
                    <div className="text-[9px] mt-1 font-mono opacity-80">{isResearched ? "Done" : `${tech.cost} RP`}</div>
                </div>
            );
        })}
    </div>
  );
};
