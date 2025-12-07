
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ResourceType = 'money' | 'food' | 'oil' | 'energy' | 'population' | 'researchPoints';

export interface Resources {
  money: number;
  food: number;
  oil: number;
  energy: number;
  population: number;
  researchPoints: number;
}

export interface Cost {
  money: number;
  turn?: number; // turns to build
}

// --- BUILDINGS ---
export type BuildingType = 'farm' | 'factory' | 'oilWell' | 'powerPlant' | 'lab' | 'barracks' | 'bunker';

export interface BuildingDef {
  id: BuildingType;
  name: string;
  description: string;
  cost: number; // Money cost
  output: Partial<Resources>;
  upkeep: Partial<Resources>; // Resources consumed per turn
  maxPerRegion?: number;
}

// --- MILITARY ---
export type UnitCategory = 'infantry' | 'armor' | 'air' | 'navy' | 'missile' | 'defense';
export type UnitId = 'soldier' | 'tank' | 'artillery' | 'jet' | 'bomber' | 'helicopter' | 'destroyer' | 'sub' | 'carrier' | 'nuke' | 'sam';

export interface UnitDef {
  id: UnitId;
  name: string;
  category: UnitCategory;
  cost: number;
  upkeep: number; // Money per turn
  attack: number;
  defense: number;
  movement: number;
  techRequired?: string;
  terrainBonuses?: Partial<Record<BiomeType, number>>; // Multiplier (e.g. 1.5)
}

// --- MAP & PROVINCES ---
export type BiomeType = 'plains' | 'forest' | 'desert' | 'mountain' | 'snow' | 'ocean' | 'city';

export interface HexCoordinate {
  q: number;
  r: number;
  s: number; // q + r + s = 0
}

export interface MapTile {
  id: string; // "q,r"
  coords: HexCoordinate;
  biome: BiomeType;
  ownerId: string | null;
  name: string;
  resourceBonus: Partial<Resources>; // Bonus to owner
  defenseBonus: number; // Percentage
  movementCost: number;
}

// --- ARMIES & GENERALS ---
export interface General {
  id: string;
  name: string;
  portrait: string; // Emoji
  level: number;
  xp: number;
  stats: {
    strategy: number; // Boosts defense
    bravery: number; // Boosts attack
    logistics: number; // Boosts movement/upkeep
  };
  traits: string[];
  status: 'available' | 'assigned' | 'injured' | 'dead';
}

export interface Army {
  id: string;
  generalId: string;
  ownerId: string;
  location: string; // Tile ID "q,r"
  units: Record<UnitId, number>;
  movementPoints: number;
  maxMovement: number;
  name: string;
}

// --- TECHNOLOGY ---
export interface TechDef {
  id: string;
  name: string;
  description: string;
  cost: number; // RP cost
  prerequisites: string[]; // IDs of required techs
  effects: {
    resourceMultiplier?: Partial<Record<ResourceType, number>>;
    combatBonus?: number;
    unlockUnits?: UnitId[];
    unlockBuildings?: BuildingType[];
  };
  x?: number; // For visual tree layout
  y?: number;
}

// --- DIPLOMACY & INTELLIGENCE ---
export type RelationStatus = 'war' | 'hostile' | 'neutral' | 'friendly' | 'alliance';
export type DiplomaticActionType = 'improve_relations' | 'trade_agreement' | 'alliance_offer' | 'declare_war' | 'send_aid' | 'demand_tribute';
export type SpyMissionType = 'gather_intel' | 'sabotage_industry' | 'steal_tech' | 'incite_unrest';

export interface Relation {
  targetCountryId: string;
  status: RelationStatus;
  opinion: number; // -100 to 100
  ceasefireTurns?: number;
  isTradePartner?: boolean;
}

export interface SpyReport {
  turn: number;
  countryId: string;
  success: boolean;
  intelLevel: number; // 0=None, 1=Basic, 2=Full
  revealedData?: Partial<Country>;
  message: string;
}

// --- COUNTRY STATE ---
export interface Country {
  id: string;
  name: string;
  isPlayer: boolean;
  color: string;
  flagEmoji: string;
  
  resources: Resources;
  
  // Economy
  buildings: Record<BuildingType, number>;
  
  // Military
  units: Record<UnitId, number>; // Reserves (not on map)
  armies: string[]; // Army IDs
  generals: string[]; // General IDs
  
  // Tech
  researchedTechs: string[];
  currentResearch: string | null;
  researchProgress: number;

  // Intelligence
  intelligence: Record<string, number>; 

  // AI
  aiPersonality?: 'aggressive' | 'economist' | 'diplomat';
}

// --- WARFARE ---
export interface BattleResult {
  winnerId: string;
  loserId: string;
  attackerLosses: Record<UnitId, number>;
  defenderLosses: Record<UnitId, number>;
  location: string; // Tile ID
  loot: Partial<Resources>;
  details: string[]; // Text log of the battle rounds
}

// --- GLOBAL GAME STATE ---
export interface GameState {
  turn: number;
  year: number;
  month: number;
  playerCountryId: string;
  countries: Record<string, Country>;
  
  // Map
  map: Record<string, MapTile>;
  armies: Record<string, Army>;
  generals: Record<string, General>;

  relations: Record<string, Record<string, Relation>>;
  messages: GameMessage[];
  
  // UI State
  modalOpen: boolean;
  modalContent: 'battle_result' | 'event' | 'army_manager' | null;
  selectedTileId: string | null;
  selectedArmyId: string | null;
  currentBattleResult: BattleResult | null;
  selectedCountryId: string | null;
}

export interface GameMessage {
  id: string;
  turn: number;
  title: string;
  body: string;
  type: 'info' | 'war' | 'economy' | 'alert' | 'spy';
  read: boolean;
  data?: any;
}

export type GameAction = 
  | { type: 'NEXT_TURN' }
  | { type: 'BUILD_BUILDING'; countryId: string; buildingId: BuildingType; amount: number }
  | { type: 'RECRUIT_UNIT'; countryId: string; unitId: UnitId; amount: number }
  | { type: 'CREATE_ARMY'; countryId: string; generalId: string; units: Record<UnitId, number>; location: string }
  | { type: 'RECRUIT_GENERAL'; countryId: string }
  | { type: 'MOVE_ARMY'; armyId: string; targetTileId: string }
  | { type: 'START_RESEARCH'; countryId: string; techId: string }
  | { type: 'SELECT_COUNTRY'; countryId: string | null }
  | { type: 'SELECT_TILE'; tileId: string | null }
  | { type: 'SELECT_ARMY'; armyId: string | null }
  | { type: 'DIPLOMACY_ACTION'; sourceId: string; targetId: string; action: DiplomaticActionType }
  | { type: 'SEND_SPY'; sourceId: string; targetId: string; mission: SpyMissionType }
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_MODAL'; content: GameState['modalContent'] }
  | { type: 'DISMISS_MESSAGE'; messageId: string };
