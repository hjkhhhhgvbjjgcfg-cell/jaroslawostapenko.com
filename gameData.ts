
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BuildingDef, UnitDef, TechDef, Country, GameState, BiomeType, MapTile, HexCoordinate, General } from './types';

// --- CONSTANTS ---
export const INITIAL_YEAR = 2027;
export const MAP_RADIUS = 8; // Size of the map (radius in hexes)

// --- BIOMES ---
export const BIOMES: Record<BiomeType, { defense: number, moveCost: number, color: string, symbol: string }> = {
  plains: { defense: 0, moveCost: 1, color: '#4d7c43', symbol: '' },
  forest: { defense: 20, moveCost: 2, color: '#2d4c25', symbol: '🌲' },
  desert: { defense: -10, moveCost: 2, color: '#c2b280', symbol: '🌵' },
  mountain: { defense: 50, moveCost: 4, color: '#5b5b5b', symbol: '🏔️' },
  snow: { defense: 10, moveCost: 3, color: '#e5e7eb', symbol: '❄️' },
  ocean: { defense: 0, moveCost: 99, color: '#1e3a8a', symbol: '🌊' },
  city: { defense: 40, moveCost: 1, color: '#374151', symbol: '🏙️' }
};

// --- BUILDINGS ---
export const BUILDINGS: Record<string, BuildingDef> = {
  farm: {
    id: 'farm',
    name: 'Industrial Farm',
    description: 'Produces food for your population.',
    cost: 1000,
    output: { food: 500 },
    upkeep: { money: 50, energy: 10 }
  },
  factory: {
    id: 'factory',
    name: 'Civilian Factory',
    description: 'Generates tax revenue and industrial goods.',
    cost: 5000,
    output: { money: 200 },
    upkeep: { energy: 50, oil: 10 }
  },
  oilWell: {
    id: 'oilWell',
    name: 'Oil Rig',
    description: 'Extracts crude oil from the earth.',
    cost: 8000,
    output: { oil: 100 },
    upkeep: { money: 100, energy: 20 }
  },
  powerPlant: {
    id: 'powerPlant',
    name: 'Nuclear Plant',
    description: 'Generates massive amounts of energy.',
    cost: 15000,
    output: { energy: 1000 },
    upkeep: { money: 500 }
  },
  lab: {
    id: 'lab',
    name: 'Research Lab',
    description: 'Generates research points for technology.',
    cost: 10000,
    output: { researchPoints: 50 },
    upkeep: { money: 1000, energy: 100 }
  },
  barracks: {
    id: 'barracks',
    name: 'Military Base',
    description: 'Increases max unit capacity and defense.',
    cost: 3000,
    output: {},
    upkeep: { money: 200, food: 100, energy: 50 }
  },
  bunker: {
    id: 'bunker',
    name: 'Defense Bunker',
    description: 'Provides massive defense bonuses to the province.',
    cost: 5000,
    output: {},
    upkeep: { money: 100, energy: 10 }
  }
};

// --- UNITS ---
export const UNITS: Record<string, UnitDef> = {
  soldier: {
    id: 'soldier',
    name: 'Infantry Division',
    category: 'infantry',
    cost: 100,
    upkeep: 10,
    attack: 5,
    defense: 10,
    movement: 1,
    terrainBonuses: { forest: 1.5, city: 1.5 }
  },
  tank: {
    id: 'tank',
    name: 'Main Battle Tank',
    category: 'armor',
    cost: 1500,
    upkeep: 100,
    attack: 60,
    defense: 40,
    movement: 2,
    terrainBonuses: { plains: 1.2, desert: 1.2, mountain: 0.5 }
  },
  artillery: {
    id: 'artillery',
    name: 'Mobile Artillery',
    category: 'armor',
    cost: 2000,
    upkeep: 150,
    attack: 80,
    defense: 10,
    movement: 1
  },
  helicopter: {
    id: 'helicopter',
    name: 'Attack Helicopter',
    category: 'air',
    cost: 5000,
    upkeep: 300,
    attack: 90,
    defense: 30,
    movement: 4,
    techRequired: 'adv_aviation'
  },
  jet: {
    id: 'jet',
    name: 'F-35 Fighter',
    category: 'air',
    cost: 12000,
    upkeep: 500,
    attack: 150,
    defense: 80,
    movement: 10,
    techRequired: 'adv_aviation'
  },
  bomber: {
    id: 'bomber',
    name: 'Stealth Bomber',
    category: 'air',
    cost: 25000,
    upkeep: 1000,
    attack: 400,
    defense: 50,
    movement: 8,
    techRequired: 'stealth_tech'
  },
  destroyer: {
    id: 'destroyer',
    name: 'Guided Missile Destroyer',
    category: 'navy',
    cost: 25000,
    upkeep: 1000,
    attack: 200,
    defense: 200,
    movement: 3
  },
  sub: {
    id: 'sub',
    name: 'Attack Submarine',
    category: 'navy',
    cost: 30000,
    upkeep: 1200,
    attack: 250,
    defense: 100,
    movement: 3,
    techRequired: 'naval_dominance'
  },
  carrier: {
    id: 'carrier',
    name: 'Aircraft Carrier',
    category: 'navy',
    cost: 150000,
    upkeep: 5000,
    attack: 500,
    defense: 500,
    movement: 2,
    techRequired: 'naval_dominance'
  },
  sam: {
    id: 'sam',
    name: 'S-400 Missile System',
    category: 'defense',
    cost: 10000,
    upkeep: 400,
    attack: 100,
    defense: 200,
    movement: 1,
    techRequired: 'missile_tech'
  },
  nuke: {
    id: 'nuke',
    name: 'ICBM',
    category: 'missile',
    cost: 1000000,
    upkeep: 5000,
    attack: 9999,
    defense: 0,
    movement: 100,
    techRequired: 'nuclear_tech'
  }
};

// --- TECH TREE ---
export const TECH_TREE: Record<string, TechDef> = {
  basic_eco: {
    id: 'basic_eco',
    name: 'Market Economy',
    description: 'Improves tax generation by 10%.',
    cost: 500,
    prerequisites: [],
    effects: { resourceMultiplier: { money: 1.1 } },
    x: 10, y: 50
  },
  ind_automation: {
    id: 'ind_automation',
    name: 'Industrial Automation',
    description: 'Factories produce 20% more revenue.',
    cost: 1500,
    prerequisites: ['basic_eco'],
    effects: { resourceMultiplier: { money: 1.2 } },
    x: 30, y: 30
  },
  adv_farming: {
    id: 'adv_farming',
    name: 'GMO Crops',
    description: 'Farms produce 50% more food.',
    cost: 1000,
    prerequisites: ['basic_eco'],
    effects: { resourceMultiplier: { food: 1.5 } },
    x: 30, y: 70
  },
  adv_aviation: {
    id: 'adv_aviation',
    name: 'Advanced Aviation',
    description: 'Unlocks modern fighter jets and helicopters.',
    cost: 2000,
    prerequisites: ['ind_automation'],
    effects: { unlockUnits: ['jet', 'helicopter'] },
    x: 50, y: 20
  },
  missile_tech: {
    id: 'missile_tech',
    name: 'Rocketry',
    description: 'Unlocks Long Range Missile Systems.',
    cost: 3000,
    prerequisites: ['ind_automation'],
    effects: { unlockUnits: ['sam'] },
    x: 50, y: 40
  },
  stealth_tech: {
    id: 'stealth_tech',
    name: 'Stealth Composites',
    description: 'Unlocks Stealth Bombers.',
    cost: 8000,
    prerequisites: ['adv_aviation'],
    effects: { unlockUnits: ['bomber'] },
    x: 70, y: 20
  },
  naval_dominance: {
    id: 'naval_dominance',
    name: 'Blue Water Navy',
    description: 'Unlocks Carriers and Submarines.',
    cost: 5000,
    prerequisites: ['ind_automation'],
    effects: { unlockUnits: ['carrier', 'sub'] },
    x: 50, y: 60
  },
  ai_research: {
    id: 'ai_research',
    name: 'Artificial Intelligence',
    description: 'Boosts research speed by 25%.',
    cost: 10000,
    prerequisites: ['missile_tech', 'naval_dominance'],
    effects: { resourceMultiplier: { researchPoints: 1.25 } },
    x: 70, y: 50
  },
  nuclear_tech: {
    id: 'nuclear_tech',
    name: 'Nuclear Fission',
    description: 'Unlocks the ultimate deterrent.',
    cost: 50000,
    prerequisites: ['ai_research', 'stealth_tech'],
    effects: { unlockUnits: ['nuke'] },
    x: 90, y: 50
  }
};

// --- DATA LISTS ---

const GENERAL_NAMES = [
  "Alexander", "Caesar", "Napoleon", "Patton", "Rommel", "Zhukov", "Hannibal", "Scipio", "Eisenhower", "MacArthur", "Montgomery", "Guderian", "Rokossovsky", "Yamamoto", "Nimitz", "Lee", "Grant", "Sherman", "Jackson", "Washington"
];

const COUNTRY_NAMES = [
  { name: "United States", flag: "🇺🇸", pop: 330000 },
  { name: "China", flag: "🇨🇳", pop: 1400000 },
  { name: "Russia", flag: "🇷🇺", pop: 144000 },
  { name: "Germany", flag: "🇩🇪", pop: 83000 },
  { name: "United Kingdom", flag: "🇬🇧", pop: 67000 },
  { name: "France", flag: "🇫🇷", pop: 65000 },
  { name: "Japan", flag: "🇯🇵", pop: 126000 },
  { name: "India", flag: "🇮🇳", pop: 1380000 },
  { name: "Brazil", flag: "🇧🇷", pop: 212000 },
  { name: "Italy", flag: "🇮🇹", pop: 60000 },
];

// --- MAP GENERATION HELPERS ---

function getHexDistance(a: HexCoordinate, b: HexCoordinate): number {
    return (Math.abs(a.q - b.q) + Math.abs(a.r - b.r) + Math.abs(a.s - b.s)) / 2;
}

function generateHexMap(radius: number): Record<string, MapTile> {
    const map: Record<string, MapTile> = {};
    const biomes: BiomeType[] = ['plains', 'plains', 'forest', 'forest', 'desert', 'mountain', 'mountain', 'snow'];

    for (let q = -radius; q <= radius; q++) {
        const r1 = Math.max(-radius, -q - radius);
        const r2 = Math.min(radius, -q + radius);
        for (let r = r1; r <= r2; r++) {
            const s = -q - r;
            const id = `${q},${r}`;
            
            // Simple noise generation for biomes
            const noise = Math.sin(q * 0.5) * Math.cos(r * 0.5) + Math.random() * 0.2;
            let biome: BiomeType = 'plains';
            if (noise > 0.6) biome = 'mountain';
            else if (noise > 0.3) biome = 'forest';
            else if (noise < -0.6) biome = 'desert';
            else if (noise < -0.3) biome = 'ocean'; // Small lakes
            
            // Force center to be plains/city friendly
            if (Math.abs(q) < 2 && Math.abs(r) < 2) biome = 'plains';

            map[id] = {
                id,
                coords: { q, r, s },
                biome,
                ownerId: null,
                name: `Province ${id}`,
                resourceBonus: {
                    food: biome === 'plains' ? 10 : 0,
                    oil: biome === 'desert' ? 20 : 0,
                    money: (biome as BiomeType) === 'city' ? 50 : 5
                },
                defenseBonus: BIOMES[biome].defense,
                movementCost: BIOMES[biome].moveCost
            };
        }
    }
    return map;
}

export function generateInitialState(playerCountryIndex: number = 0): GameState {
  const countries: Record<string, Country> = {};
  const relations: Record<string, Record<string, any>> = {};
  const map = generateHexMap(MAP_RADIUS);
  
  // Assign Countries to Map
  // Spiral out from random points? 
  // For simplicity, assign capital cities at fixed points
  const startPositions = [
    {q: 0, r: 0}, 
    {q: 5, r: -5}, {q: -5, r: 5}, {q: 5, r: 0}, {q: -5, r: 0},
    {q: 0, r: 5}, {q: 0, r: -5}, {q: 3, r: 3}, {q: -3, r: -3}, {q: 3, r: -3}
  ];

  COUNTRY_NAMES.forEach((c, index) => {
    if (index >= startPositions.length) return; // Cap at max start pos
    
    const id = `c_${index}`;
    const isPlayer = index === playerCountryIndex;
    const economyScale = Math.max(0.1, c.pop / 1000000); 

    // Find capital tile
    const pos = startPositions[index];
    const tileId = `${pos.q},${pos.r}`;
    if (map[tileId]) {
        map[tileId].ownerId = id;
        map[tileId].biome = 'city'; // Capital is a city
        map[tileId].name = `${c.name} Capital`;
        map[tileId].defenseBonus = 50;
    }

    // Assign surrounding tiles
    Object.values(map).forEach(tile => {
        if (!tile.ownerId && getHexDistance(tile.coords, {q: pos.q, r: pos.r, s: -pos.q-pos.r}) <= 2) {
            tile.ownerId = id;
        }
    });
    
    countries[id] = {
      id,
      name: c.name,
      flagEmoji: c.flag,
      isPlayer,
      color: `hsl(${(index * 360) / 10}, 70%, 40%)`,
      aiPersonality: Math.random() > 0.5 ? 'aggressive' : 'economist',
      resources: {
        money: Math.floor(10000 * economyScale),
        food: Math.floor(5000 * economyScale),
        oil: Math.floor(1000 * economyScale),
        energy: Math.floor(2000 * economyScale),
        population: c.pop * 1000,
        researchPoints: 0
      },
      buildings: {
        farm: 5, factory: 2, oilWell: 1, powerPlant: 1, lab: 0, barracks: 1, bunker: 0
      },
      units: {
        soldier: 50, tank: 10, artillery: 5, helicopter: 0, jet: 0, bomber: 0, destroyer: 0, sub: 0, carrier: 0, sam: 0, nuke: 0
      },
      armies: [],
      generals: [],
      researchedTechs: [],
      currentResearch: null,
      researchProgress: 0,
      intelligence: {}
    };

    relations[id] = {};
  });

  // Initialize Relations
  Object.keys(countries).forEach(source => {
    countries[source].intelligence = {};
    Object.keys(countries).forEach(target => {
      if (source !== target) {
        relations[source][target] = {
          targetCountryId: target,
          status: 'neutral',
          opinion: 0,
          isTradePartner: false
        };
        countries[source].intelligence[target] = 10;
      }
    });
  });

  return {
    turn: 1,
    year: INITIAL_YEAR,
    month: 1,
    playerCountryId: `c_${playerCountryIndex}`,
    countries,
    relations,
    map,
    armies: {},
    generals: {},
    messages: [{
      id: 'msg_0',
      turn: 1,
      title: 'Global Conflict Imminent',
      body: `The year is ${INITIAL_YEAR}. Resources are scarce. Command your armies to secure territories on the map.`,
      type: 'info',
      read: false
    }],
    selectedCountryId: null,
    selectedTileId: null,
    selectedArmyId: null,
    modalOpen: false,
    modalContent: null,
    currentBattleResult: null
  };
}
