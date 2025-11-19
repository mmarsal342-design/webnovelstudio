export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface Message {
  id: string;
  author: MessageAuthor;
  text: string;
  timestamp?: any; // For Firestore serverTimestamp
}

export enum ModelType {
  FLASH = 'gemini-2.5-flash',
  PRO = 'gemini-2.5-pro',
}

export interface PlotPoint {
  id: string;
  summary: string;
}

export interface StoryArcAct {
  title: string;
  description: string;
  plotPoints: PlotPoint[];
}

export interface CustomField {
  id:string;
  label: string;
  value: string;
}

export interface Character {
  id: string;
  name: string;
  roles: string[];
  age: string;
  gender: string;
  physicalDescription: string;
  voiceAndSpeechStyle: string;
  personalityTraits: string;
  habits: string;
  goal: string;
  principles: string;
  conflict: string;
  customFields: CustomField[];
}

export interface Relationship {
  id: string;
  character1Id: string; // Changed from string name to ID
  character2Id: string; // Changed from string name to ID
  type: string;
  description: string;
}

export interface LoreEntry {
    id: string;
    name: string;
    description: string;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
}

// New separate type for reusable world-building
export interface Universe {
  id: string;
  language: 'en' | 'id'; // Language of the content
  name: string;
  description: string;
  isFavorite?: boolean;
  // Structured world-building
  locations: LoreEntry[];
  factions: LoreEntry[];
  lore: LoreEntry[];
  // Legacy fields for simpler use cases or migration
  magicSystem?: string;
  worldBuilding?: string;
}


export interface StoryEncyclopedia {
  id: string;
  language: 'en' | 'id';
  title: string;
  genres: string[];
  otherGenre: string;
  setting: string;
  totalChapters: string;
  wordsPerChapter: string;
  mainPlot: string;
  characters: Character[];
  relationships: Relationship[];
  storyArc: StoryArcAct[];
  comedyLevel: string;
  romanceLevel: string;
  actionLevel: string;
  maturityLevel: string;
  proseStyle: string;
  customProseStyleByExample?: string;
  chapters: Chapter[];
  
  // --- Fields snapshotted from a Universe ---
  universeId: string | null; // Link to the master Universe
  universeName: string;      // Display name of the universe
  locations: LoreEntry[];
  factions: LoreEntry[];
  lore: LoreEntry[];
  magicSystem?: string;
  worldBuilding?: string;
  
  // For real-world templates
  disguiseRealWorldNames?: boolean;
}

// --- Types for Internationalization ---
export type UILanguage = 'en' | 'id';

export type Translations = {
  [key: string]: string | Translations;
};

export interface LanguageContextType {
  uiLang: UILanguage;
  setUiLang: (lang: UILanguage) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}