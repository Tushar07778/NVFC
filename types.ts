
export type Position = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward' | 'Coach' | 'Staff';

export interface Player {
  id: string;
  name: string;
  number: number;
  position: Position;
  nationality: string;
  image: string;
  bio: string;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    cleanSheets?: number;
  };
}

export interface NewsPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Match Report' | 'Announcement' | 'Transfer' | 'Event';
  image: string;
  date: string;
  isFeatured: boolean;
}

export interface MatchEvent {
  minute: number;
  type: 'Goal' | 'Yellow' | 'Red' | 'Sub';
  team: 'NVFC' | 'Opponent';
  player: string;
  description?: string;
  assistedBy?: string;
}

export interface MatchStatistics {
  possession: { nvfc: number; opponent: number };
  shots: { nvfc: number; opponent: number };
  shotsOnTarget: { nvfc: number; opponent: number };
  corners: { nvfc: number; opponent: number };
  fouls: { nvfc: number; opponent: number };
  offsides: { nvfc: number; opponent: number };
  saves: { nvfc: number; opponent: number };
}

export interface LineupPlayer {
  id: string;
  name: string;
  number: number;
  position: string;
}

export interface MatchLineup {
  nvfc: {
    formation: string;
    startingXI: LineupPlayer[];
    substitutes: LineupPlayer[];
  };
  opponent: {
    formation: string;
    startingXI: LineupPlayer[];
    substitutes: LineupPlayer[];
  };
}

export interface Commentary {
  minute: number;
  text: string;
  isHighlight?: boolean;
}

export interface HeadToHead {
  nvfcWins: number;
  draws: number;
  opponentWins: number;
  lastFiveMeetings: {
    date: string;
    result: string;
    score: string;
  }[];
}

export interface Match {
  id: string;
  opponent: string;
  opponentLogo: string;
  venue: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Live' | 'Finished';
  isHome: boolean;
  score?: {
    nvfc: number;
    opponent: number;
  };
  currentMinute?: number; // For live matches
  events?: MatchEvent[];
  statistics?: MatchStatistics;
  lineup?: MatchLineup;
  commentary?: Commentary[];
  referee?: string;
  attendance?: number;
  stadiumCapacity?: number;
  weather?: {
    condition: string;
    temperature: number;
  };
  headToHead?: HeadToHead;
  form?: {
    nvfc: string; // e.g., "WWDLW"
    opponent: string;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Jersey' | 'Accessories' | 'Training' | 'Souvenirs';
  image: string;
  stock: number;
  description?: string;
  isNew?: boolean;
  bestseller?: boolean;
}

export interface LeagueEntry {
  rank: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  cause: 'Academy' | 'Infrastructure' | 'Team Development';
  date: string;
  message?: string;
  tier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  target: number;
  raised: number;
  image: string;
  donors: number;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface ManagementProfile {
  name: string;
  role: string;
  image: string;
  bio?: string;
}
