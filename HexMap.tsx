
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { GameState, MapTile, HexCoordinate, Army } from '../types';
import { BIOMES } from '../gameData';
import { User, Shield, Target } from 'lucide-react';

const HEX_SIZE = 40;
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
const HEX_HEIGHT = 2 * HEX_SIZE;

interface HexMapProps {
    state: GameState;
    onSelectTile: (id: string) => void;
    onMoveArmy: (armyId: string, tileId: string) => void;
}

export const HexMap: React.FC<HexMapProps> = ({ state, onSelectTile, onMoveArmy }) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    const hexToPixel = (q: number, r: number) => {
        const x = HEX_SIZE * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
        const y = HEX_SIZE * (3 / 2 * r);
        return { x, y };
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => isDragging.current = false;

    // Filter armies visible
    const armiesOnMap = Object.values(state.armies) as Army[];

    return (
        <div 
            className="w-full h-[60vh] bg-stone-900 overflow-hidden relative border-y border-stone-700 cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <svg className="w-full h-full pointer-events-none">
                <g transform={`translate(${window.innerWidth/2 + offset.x}, ${300 + offset.y})`}>
                    {(Object.values(state.map) as MapTile[]).map(tile => {
                        const { x, y } = hexToPixel(tile.coords.q, tile.coords.r);
                        const isSelected = state.selectedTileId === tile.id;
                        const owner = tile.ownerId ? state.countries[tile.ownerId] : null;
                        
                        // Check if valid move target for selected army
                        let isValidMove = false;
                        if (state.selectedArmyId) {
                            const army = state.armies[state.selectedArmyId];
                            const armyTile = state.map[army.location];
                            // Distance 1 check simplified
                            const dist = (Math.abs(armyTile.coords.q - tile.coords.q) + Math.abs(armyTile.coords.r - tile.coords.r) + Math.abs(armyTile.coords.s - tile.coords.s)) / 2;
                            if (dist === 1 && army.movementPoints >= tile.movementCost) isValidMove = true;
                        }

                        return (
                            <g key={tile.id} transform={`translate(${x}, ${y})`} 
                               onClick={(e) => {
                                   // Keep pointer events enabled for groups
                                   // But SVG logic is tricky with pan. 
                                   // Actually we should put click handler on polygon
                               }}
                               className="pointer-events-auto cursor-pointer"
                            >
                                <polygon 
                                    points={`${0},${-HEX_SIZE} ${HEX_WIDTH/2},${-HEX_SIZE/2} ${HEX_WIDTH/2},${HEX_SIZE/2} ${0},${HEX_SIZE} ${-HEX_WIDTH/2},${HEX_SIZE/2} ${-HEX_WIDTH/2},${-HEX_SIZE/2}`}
                                    fill={BIOMES[tile.biome].color}
                                    stroke={isSelected ? 'white' : owner ? owner.color : '#333'}
                                    strokeWidth={isSelected ? 3 : 1}
                                    className="transition-colors hover:opacity-90"
                                    onClick={() => {
                                        if (isValidMove && state.selectedArmyId) {
                                            onMoveArmy(state.selectedArmyId, tile.id);
                                        } else {
                                            onSelectTile(tile.id);
                                        }
                                    }}
                                />
                                {tile.biome === 'mountain' && <text x="-8" y="5" fontSize="16">⛰️</text>}
                                {tile.biome === 'forest' && <text x="-8" y="5" fontSize="16">🌲</text>}
                                {tile.biome === 'city' && <text x="-8" y="5" fontSize="16">🏙️</text>}
                                {tile.biome === 'desert' && <text x="-8" y="5" fontSize="16">🏜️</text>}
                                
                                {isValidMove && <circle r="5" fill="yellow" className="animate-ping" />}
                            </g>
                        );
                    })}

                    {/* Render Armies */}
                    {armiesOnMap.map(army => {
                        const tile = state.map[army.location];
                        if (!tile) return null;
                        const { x, y } = hexToPixel(tile.coords.q, tile.coords.r);
                        const isSelected = state.selectedArmyId === army.id;
                        const owner = state.countries[army.ownerId];

                        return (
                            <g key={army.id} transform={`translate(${x}, ${y})`} className="pointer-events-none">
                                <rect x="-12" y="-12" width="24" height="24" rx="4" fill={owner.color} stroke="white" strokeWidth={isSelected ? 2 : 1} />
                                <text x="-8" y="4" fontSize="12">⚔️</text>
                            </g>
                        );
                    })}
                </g>
            </svg>
            
            <div className="absolute top-4 left-4 bg-black/50 p-2 rounded text-white text-xs pointer-events-none">
                Use mouse to pan. Click tiles to inspect.
            </div>
        </div>
    );
};
