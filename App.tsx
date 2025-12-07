
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useReducer, useEffect, useState } from 'react';
import { GameState, GameAction, BuildingType, UnitId, Country, DiplomaticActionType, SpyMissionType, BattleResult, Army, MapTile } from './types';
import { generateInitialState, BUILDINGS, UNITS, TECH_TREE } from './gameData';
import { gameReducer } from './gameEngine';
import { ResourceBar, Card, Button } from './components/UI';
import { DiplomacyView } from './components/DiplomacyView';
import { TechTree } from './components/TechTree';
import { HexMap } from './components/HexMap';
import { Map, Briefcase, Shield, Globe, Cpu, Play, Sword, X, User } from 'lucide-react';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, null, () => generateInitialState());
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'military' | 'relations' | 'tech'>('overview');

  const playerCountry = state.countries[state.playerCountryId];

  // Auto-save effect
  useEffect(() => {
    // console.log('Game State Saved', state.turn);
  }, [state.turn]);

  const handleNextTurn = () => dispatch({ type: 'NEXT_TURN' });

  const handleBuild = (id: string, amount: number = 1) => {
    dispatch({ type: 'BUILD_BUILDING', countryId: state.playerCountryId, buildingId: id as BuildingType, amount });
  };

  const handleRecruit = (id: string, amount: number = 1) => {
    dispatch({ type: 'RECRUIT_UNIT', countryId: state.playerCountryId, unitId: id as UnitId, amount });
  };

  const handleDiplomacyAction = (action: DiplomaticActionType) => {
      if (state.selectedCountryId) {
          dispatch({ type: 'DIPLOMACY_ACTION', sourceId: state.playerCountryId, targetId: state.selectedCountryId, action });
      }
  };

  const handleSpyMission = (mission: SpyMissionType) => {
       if (state.selectedCountryId) {
          dispatch({ type: 'SEND_SPY', sourceId: state.playerCountryId, targetId: state.selectedCountryId, mission });
      }
  };

  const handleResearch = (techId: string) => {
      dispatch({ type: 'START_RESEARCH', countryId: state.playerCountryId, techId });
  }

  const handleCreateArmy = (generalId: string, units: Record<string, number>, location: string) => {
      dispatch({ type: 'CREATE_ARMY', countryId: state.playerCountryId, generalId, units, location });
      dispatch({ type: 'CLOSE_MODAL' });
  };

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  // --- SCREENS ---

  const OverviewScreen = () => (
    <div className="space-y-4 animate-fade-in">
        <Card title="Nation Status">
             <div className="flex items-center gap-4 mb-4">
                 <div className="text-6xl">{playerCountry.flagEmoji}</div>
                 <div>
                     <h2 className="text-2xl font-bold text-white">{playerCountry.name}</h2>
                     <p>Leader: Commander (You)</p>
                 </div>
             </div>
             <div className="grid grid-cols-2 gap-2 text-sm">
                 <div className="bg-stone-900/50 p-2 rounded">
                    <span className="block text-stone-500 text-xs">Total Armies</span>
                    {playerCountry.armies.length}
                 </div>
                 <div className="bg-stone-900/50 p-2 rounded">
                    <span className="block text-stone-500 text-xs">Generals</span>
                    {playerCountry.generals.length}
                 </div>
                 <div className="bg-stone-900/50 p-2 rounded">
                    <span className="block text-stone-500 text-xs">Territory</span>
                    {(Object.values(state.map) as MapTile[]).filter(t => t.ownerId === playerCountry.id).length} Provinces
                 </div>
                 <div className="bg-stone-900/50 p-2 rounded">
                    <span className="block text-stone-500 text-xs">World Rank</span>
                    #{(Object.values(state.countries) as Country[]).sort((a,b) => b.resources.money - a.resources.money).findIndex(c => c.id === playerCountry.id) + 1}
                 </div>
             </div>
        </Card>

        <Card title="News Feed">
            {state.messages.length === 0 && <p className="italic">No new messages.</p>}
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {state.messages.slice().reverse().map(msg => (
                    <div key={msg.id} className={`p-3 rounded border-l-2 relative ${msg.type === 'alert' ? 'bg-red-900/20 border-red-500' : msg.type === 'war' ? 'bg-orange-900/20 border-orange-500' : 'bg-stone-900/50 border-stone-500'}`}>
                        <button className="absolute top-1 right-1 text-stone-600 hover:text-stone-300" onClick={() => dispatch({ type: 'DISMISS_MESSAGE', messageId: msg.id })}><X size={12} /></button>
                        <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-stone-300">{msg.title}</h4>
                            <span className="text-[10px] text-stone-600">Turn {msg.turn}</span>
                        </div>
                        <p className="text-xs text-stone-400 mt-1">{msg.body}</p>
                    </div>
                ))}
            </div>
        </Card>
    </div>
  );

  const MapScreen = () => {
      const selectedTile = state.selectedTileId ? state.map[state.selectedTileId] : null;
      const selectedArmy = state.selectedArmyId ? state.armies[state.selectedArmyId] : null;

      return (
          <div className="animate-fade-in relative">
              <HexMap 
                state={state} 
                onSelectTile={(id) => dispatch({ type: 'SELECT_TILE', tileId: id })}
                onMoveArmy={(armyId, tileId) => dispatch({ type: 'MOVE_ARMY', armyId, targetTileId: tileId })}
              />
              
              {/* Tile Details Panel */}
              <div className="bg-stone-800 p-4 border-t border-stone-700 min-h-[200px]">
                  {selectedTile ? (
                      <div>
                          <div className="flex justify-between items-start mb-2">
                              <div>
                                  <h3 className="font-bold text-lg text-white">{selectedTile.name}</h3>
                                  <p className="text-xs text-stone-400 capitalize">{selectedTile.biome} | Owner: {selectedTile.ownerId ? state.countries[selectedTile.ownerId].name : 'Unclaimed'}</p>
                              </div>
                              <div className="text-right">
                                  <div className="text-xs text-stone-500">Defense</div>
                                  <div className="text-green-400 font-bold">+{selectedTile.defenseBonus}%</div>
                              </div>
                          </div>
                          
                          {/* Armies Here */}
                          <div className="mb-2">
                            <h4 className="text-xs font-bold text-stone-500 uppercase">Armies Present</h4>
                            <div className="flex gap-2 mt-1">
                                {(Object.values(state.armies) as Army[]).filter(a => a.location === selectedTile.id).map(army => (
                                    <div 
                                        key={army.id} 
                                        onClick={() => dispatch({ type: 'SELECT_ARMY', armyId: army.id })}
                                        className={`p-2 rounded cursor-pointer border ${state.selectedArmyId === army.id ? 'bg-yellow-900 border-yellow-500' : 'bg-stone-700 border-stone-600'}`}
                                    >
                                        <div className="text-xs font-bold text-white">{army.name}</div>
                                        <div className="text-[10px] text-stone-400">{state.countries[army.ownerId].name}</div>
                                    </div>
                                ))}
                                {Object.values(state.armies).filter(a => a.location === selectedTile.id).length === 0 && <span className="text-xs text-stone-600 italic">None</span>}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 mt-4">
                              {selectedTile.ownerId === playerCountry.id && (
                                   <Button onClick={() => dispatch({ type: 'OPEN_MODAL', content: 'army_manager' })} className="flex-1 text-xs">
                                      <User size={14}/> Form Army
                                   </Button>
                              )}
                          </div>
                      </div>
                  ) : (
                      <p className="text-stone-500 text-center mt-4">Select a province on the map.</p>
                  )}
              </div>
          </div>
      )
  };

  const MilitaryScreen = () => (
      <div className="space-y-4 animate-fade-in">
        <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-white">Military Command</h2>
            <Button onClick={() => dispatch({ type: 'RECRUIT_GENERAL', countryId: state.playerCountryId })} disabled={playerCountry.resources.money < 5000} className="text-xs" variant="secondary">
                Recruit General ($5k)
            </Button>
        </div>

        {/* Generals List */}
        <div className="flex gap-2 overflow-x-auto pb-2 px-2">
            {playerCountry.generals.map(gid => {
                const gen = state.generals[gid];
                return (
                    <div key={gid} className="bg-stone-800 p-2 rounded min-w-[120px] border border-stone-700">
                        <div className="text-2xl text-center mb-1">{gen.portrait}</div>
                        <div className="text-xs font-bold text-center text-white">{gen.name}</div>
                        <div className="text-[10px] text-center text-stone-500">{gen.status}</div>
                        <div className="flex justify-between text-[10px] mt-2 text-stone-400">
                            <span>S:{gen.stats.strategy}</span>
                            <span>B:{gen.stats.bravery}</span>
                            <span>L:{gen.stats.logistics}</span>
                        </div>
                    </div>
                )
            })}
        </div>

        <h3 className="font-bold text-stone-400 px-2 mt-4">Reserves Recruitment</h3>
        {Object.values(UNITS).map(u => {
            const isLocked = u.techRequired && !playerCountry.researchedTechs.includes(u.techRequired);
            return (
                <Card key={u.id}>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="font-bold text-stone-200 flex items-center gap-2">
                                {u.name}
                                {isLocked && <span className="text-[10px] bg-red-900 text-red-200 px-1 rounded">LOCKED</span>}
                            </h4>
                            <p className="text-xs text-stone-500 uppercase tracking-wider">{u.category}</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-yellow-500 font-mono font-bold">${u.cost.toLocaleString()}</span>
                            <span className="text-xs text-stone-500">In Reserve: {playerCountry.units[u.id] || 0}</span>
                        </div>
                    </div>
                    <Button 
                        disabled={playerCountry.resources.money < u.cost || isLocked} 
                        onClick={() => handleRecruit(u.id)}
                        className={`w-full text-sm ${playerCountry.resources.money < u.cost || isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLocked ? `Requires Tech` : 'Recruit to Reserve'}
                    </Button>
                </Card>
            );
        })}
      </div>
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans pb-20 selection:bg-yellow-900 selection:text-white">
      <div className="sticky top-0 z-50">
        <div className="bg-stone-900 border-b border-stone-800 px-4 py-2 flex justify-between items-center">
            <div className="font-serif font-bold text-yellow-600 tracking-wider">EMPIRE <span className="text-white">{state.year}</span></div>
            <div className="text-xs text-stone-500 font-mono">Month {state.month} | Turn {state.turn}</div>
        </div>
        <ResourceBar resources={playerCountry.resources} />
      </div>

      <main className="container mx-auto max-w-md h-full">
        {activeTab === 'overview' && <OverviewScreen />}
        {activeTab === 'map' && <MapScreen />}
        {activeTab === 'military' && <MilitaryScreen />}
        {activeTab === 'relations' && <DiplomacyView 
            playerCountry={playerCountry} 
            targetCountry={(state.selectedCountryId && state.countries[state.selectedCountryId]) || state.countries[Object.keys(state.countries)[1]]} // Default to something if null
            relation={state.relations[playerCountry.id][state.selectedCountryId || '']}
            onAction={handleDiplomacyAction}
            onSpy={handleSpyMission}
            onAttack={() => {}}
            onBack={() => {}}
        />} 
        {activeTab === 'tech' && <div className="p-4"><TechTree researchedTechs={playerCountry.researchedTechs} currentResearch={playerCountry.currentResearch} onSelectResearch={handleResearch} /></div>}
      </main>

      <button onClick={handleNextTurn} className="fixed bottom-24 right-4 w-16 h-16 bg-yellow-600 hover:bg-yellow-500 text-stone-900 rounded-full shadow-xl flex items-center justify-center border-2 border-yellow-400 z-40 transition-transform active:scale-95">
          <Play fill="currentColor" size={24} />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-stone-800 h-16 z-50 flex justify-around items-center">
        <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<Globe size={20} />} label="Overview" />
        <NavButton active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={<Map size={20} />} label="Map" />
        <NavButton active={activeTab === 'military'} onClick={() => setActiveTab('military')} icon={<Shield size={20} />} label="Command" />
        <NavButton active={activeTab === 'tech'} onClick={() => setActiveTab('tech')} icon={<Cpu size={20} />} label="Tech" />
      </nav>

      {/* Army Creator Modal */}
      {state.modalOpen && state.modalContent === 'army_manager' && (
           <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-stone-900 border border-stone-700 rounded-lg max-w-sm w-full p-4">
                  <h3 className="text-xl font-bold text-white mb-4">Form New Army</h3>
                  <div className="mb-4">
                      <label className="block text-xs text-stone-500 mb-1">Select General</label>
                      <select className="w-full bg-stone-800 p-2 rounded text-white" id="genSelect">
                          {playerCountry.generals.filter(g => state.generals[g].status === 'available').map(g => (
                              <option key={g} value={g}>{state.generals[g].name}</option>
                          ))}
                      </select>
                  </div>
                  <div className="mb-4 max-h-40 overflow-y-auto">
                      {Object.keys(UNITS).map(u => (
                          playerCountry.units[u as UnitId] > 0 && (
                              <div key={u} className="flex justify-between items-center bg-stone-800 p-2 mb-1 rounded">
                                  <span>{UNITS[u].name}</span>
                                  <span className="text-yellow-500">x{playerCountry.units[u as UnitId]}</span>
                              </div>
                          )
                      ))}
                  </div>
                  <div className="flex gap-2">
                      <Button onClick={closeModal} variant="secondary" className="flex-1">Cancel</Button>
                      <Button onClick={() => {
                          const genSelect = document.getElementById('genSelect') as HTMLSelectElement;
                          if (genSelect.value) {
                             // Simplification: Adds 1 soldier just to test logic
                             handleCreateArmy(genSelect.value, { soldier: 1 }, state.selectedTileId!);
                          }
                      }} className="flex-1">Deploy</Button>
                  </div>
              </div>
           </div>
      )}

      {/* Battle Result Modal */}
      {state.modalOpen && state.modalContent === 'battle_result' && state.currentBattleResult && (
           <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-stone-900 border border-red-900 rounded-lg max-w-sm w-full p-4 relative">
                   <button onClick={closeModal} className="absolute top-2 right-2"><X /></button>
                   <h2 className="text-2xl font-bold text-red-500 mb-2 flex items-center gap-2"><Sword/> BATTLE REPORT</h2>
                   <div className="text-stone-300 mb-4 h-48 overflow-y-auto font-mono text-xs bg-black/30 p-2 rounded">
                       {state.currentBattleResult.details.map((l, i) => <div key={i}>{l}</div>)}
                   </div>
                   <Button onClick={closeModal} className="w-full">Close</Button>
               </div>
           </div>
      )}

    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${active ? 'text-yellow-500 bg-stone-800' : 'text-stone-500 hover:text-stone-300'}`}>
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

export default App;
