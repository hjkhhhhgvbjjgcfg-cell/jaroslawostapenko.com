
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Country, Relation, DiplomaticActionType, SpyMissionType } from '../types';
import { Card, Button, ResourceIcon } from './UI';
import { Shield, Skull, TrendingUp, Eye, Handshake, AlertTriangle, Crosshair } from 'lucide-react';

interface DiplomacyViewProps {
  playerCountry: Country;
  targetCountry: Country;
  relation: Relation;
  onAction: (action: DiplomaticActionType) => void;
  onSpy: (mission: SpyMissionType) => void;
  onAttack: () => void;
  onBack: () => void;
}

export const DiplomacyView: React.FC<DiplomacyViewProps> = ({ 
  playerCountry, targetCountry, relation, onAction, onSpy, onAttack, onBack 
}) => {
  
  const intelLevel = playerCountry.intelligence[targetCountry.id] || 0;
  
  // Helper to obfuscate numbers based on intel
  const getObservedValue = (val: number, isUnit: boolean = false) => {
    if (intelLevel >= 90) return val.toLocaleString(); // Perfect intel
    if (intelLevel >= 50) {
        // Approximate range +/- 20%
        const min = Math.floor(val * 0.8);
        const max = Math.ceil(val * 1.2);
        return `${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    if (intelLevel >= 20) {
        // Vague
        if (val === 0) return "None";
        if (val < 100) return "Low";
        if (val < 1000) return "Medium";
        return "High";
    }
    return "???";
  };

  const isAtWar = relation.status === 'war';

  return (
    <div className="space-y-4 animate-fade-in pb-20">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="text-stone-400 hover:text-white px-2 py-1 rounded border border-stone-700">
            &larr; Back
        </button>
        <h2 className="text-xl font-bold text-white ml-2">Diplomatic Channel</h2>
      </div>

      {/* Header Info */}
      <Card>
         <div className="flex items-center gap-4 mb-4">
             <div className="text-6xl">{targetCountry.flagEmoji}</div>
             <div className="flex-1">
                 <h2 className="text-2xl font-bold text-white">{targetCountry.name}</h2>
                 <p className="text-sm text-stone-400">Government: Dictatorship</p>
                 <div className={`mt-2 inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${isAtWar ? 'bg-red-900 text-red-200' : 'bg-stone-700 text-stone-300'}`}>
                    Status: {relation.status}
                 </div>
             </div>
         </div>

         {/* Opinion Bar */}
         <div className="mb-2">
            <div className="flex justify-between text-xs text-stone-400 mb-1">
                <span>Opinion</span>
                <span>{relation.opinion} / 100</span>
            </div>
            <div className="h-2 w-full bg-stone-700 rounded-full overflow-hidden">
                <div 
                    className={`h-full transition-all duration-500 ${relation.opinion > 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${Math.abs(relation.opinion)}%`, marginLeft: relation.opinion < 0 ? '50%' : '0', transform: relation.opinion < 0 ? 'translateX(-100%)' : 'none' }}
                />
                {/* Center marker */}
                <div className="w-[2px] h-full bg-stone-500 absolute left-1/2 top-0" />
            </div>
         </div>
      </Card>

      {/* Observed Stats (Intel) */}
      <Card title="Intelligence Report">
         <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div className="bg-stone-900/50 p-2 rounded border border-stone-700">
                <div className="text-stone-500 text-xs mb-1">Treasury</div>
                <div className="font-mono text-yellow-500">{getObservedValue(targetCountry.resources.money)}</div>
            </div>
            <div className="bg-stone-900/50 p-2 rounded border border-stone-700">
                <div className="text-stone-500 text-xs mb-1">Military Power</div>
                <div className="font-mono text-red-400">{getObservedValue(targetCountry.units.soldier + targetCountry.units.tank * 5)} (Est)</div>
            </div>
            <div className="bg-stone-900/50 p-2 rounded border border-stone-700">
                <div className="text-stone-500 text-xs mb-1">Population</div>
                <div className="font-mono text-blue-300">{getObservedValue(targetCountry.resources.population)}</div>
            </div>
            <div className="bg-stone-900/50 p-2 rounded border border-stone-700">
                <div className="text-stone-500 text-xs mb-1">Intel Accuracy</div>
                <div className={`font-mono ${intelLevel > 80 ? 'text-green-400' : 'text-stone-400'}`}>{intelLevel}%</div>
            </div>
         </div>
      </Card>

      {/* Actions Grid */}
      <h3 className="font-bold text-white px-1">Diplomatic Actions</h3>
      <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => onAction('improve_relations')} disabled={playerCountry.resources.money < 1000}>
             <Handshake size={16} /> Improve ($1k)
          </Button>
          <Button onClick={() => onSpy('gather_intel')} disabled={playerCountry.resources.money < 2000} variant="secondary">
             <Eye size={16} /> Send Spy ($2k)
          </Button>
          <Button onClick={() => onAction('trade_agreement')} variant="secondary" disabled>
             <TrendingUp size={16} /> Trade Deal
          </Button>
          <Button onClick={() => onSpy('sabotage_industry')} variant="secondary" disabled={playerCountry.resources.money < 5000}>
             <Skull size={16} /> Sabotage ($5k)
          </Button>
          
          {isAtWar ? (
              <Button onClick={onAttack} variant="danger" className="col-span-2 py-4 text-lg font-bold border-2 border-red-500 animate-pulse">
                  <Crosshair size={24} /> LAUNCH ATTACK
              </Button>
          ) : (
              <Button onClick={() => onAction('declare_war')} variant="danger" className="col-span-2">
                  <AlertTriangle size={16} /> Declare War
              </Button>
          )}
      </div>
    </div>
  );
};
