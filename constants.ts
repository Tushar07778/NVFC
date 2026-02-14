
import { Player, NewsPost, Match, Product, LeagueEntry, Donation, Campaign, Milestone, ManagementProfile } from './types';

export const INITIAL_NEWS: NewsPost[] = [
  {
    id: '1',
    title: 'NVFC Signs Star Forward from Mumbai City',
    summary: 'The Narmada Valley giants bolster their attack with a sensational transfer deal.',
    content: 'Full details of the transfer agreement between NVFC and Mumbai City for the services of the clinical striker.',
    category: 'Transfers',
    image: 'https://images.unsplash.com/photo-1551953117-31a430edda97?auto=format&fit=crop&q=80&w=1200',
    date: '2024-10-24',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Match Report: Hard-fought Draw at Kolkata',
    summary: 'NVFC showed immense character to come back from two goals down in a thrilling encounter.',
    content: 'The boys from the valley displayed remarkable resilience under the floodlights.',
    category: 'Match Report',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200',
    date: '2024-10-20',
    isFeatured: false
  },
  {
    id: '3',
    title: 'New Stadium Renovation Plans Unveiled',
    summary: 'The club board approves state-of-the-art upgrade for the Narmada Arena.',
    content: 'The expansion will increase capacity to 50,000 and include high-tech fan zones.',
    category: 'Announcement',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=1200',
    date: '2024-10-15',
    isFeatured: false
  },
  {
    id: '4',
    title: 'Community Outreach: Football for All',
    summary: 'NVFC launches a new initiative to bring football to rural areas of the valley.',
    content: 'The program aims to provide coaching and equipment to underprivileged youth.',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-151029873445e-83f84e3a4b0c?auto=format&fit=crop&q=80&w=1200',
    date: '2024-10-10',
    isFeatured: false
  },
  {
    id: '5',
    title: 'Player of the Month: Arjun Singh',
    summary: 'Arjun Singh voted as the fans\' favorite for the month of September.',
    content: 'The forward scored 5 goals in 4 matches, leading the charge for the club.',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=1200',
    date: '2024-10-05',
    isFeatured: false
  },
  {
    id: '6',
    title: 'Match Preview: The Valley Derby',
    summary: 'Everything you need to know ahead of the massive clash against Satpura FC.',
    content: 'Tactical analysis, team news, and head-to-head records.',
    category: 'Match Report',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200',
    date: '2024-10-01',
    isFeatured: false
  }
];

export const INITIAL_PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Arjun Singh',
    number: 10,
    position: 'Forward',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/2273333/pexels-photo-2273333.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'Local hero and clinical finisher. Arjun is a product of the NVFC youth academy.',
    stats: { appearances: 45, goals: 28, assists: 12 }
  },
  {
    id: '2',
    name: 'Rahul Deshmukh',
    number: 1,
    position: 'Goalkeeper',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/10100742/pexels-photo-10100742.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'Vocal leader and master of the penalty box.',
    stats: { appearances: 60, goals: 0, assists: 0, cleanSheets: 22 }
  },
  {
    id: '4',
    name: 'Karan Mehra',
    number: 4,
    position: 'Defender',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/1142948/pexels-photo-1142948.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'The wall of the Narmada Valley. Karan is known for his perfectly timed tackles.',
    stats: { appearances: 52, goals: 2, assists: 1 }
  },
  {
    id: '5',
    name: 'Vikram Iyer',
    number: 5,
    position: 'Defender',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/1474211/pexels-photo-1474211.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'Calm and composed center-back with great aerial ability.',
    stats: { appearances: 38, goals: 4, assists: 0 }
  },
  {
    id: '3',
    name: 'Suresh Raina',
    number: 7,
    position: 'Midfielder',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'Experienced playmaker with an eye for the final pass.',
    stats: { appearances: 30, goals: 5, assists: 15 }
  },
  {
    id: '6',
    name: 'Aditya Varma',
    number: 6,
    position: 'Midfielder',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'The engine room of the team. Aditya covers every blade of grass.',
    stats: { appearances: 44, goals: 3, assists: 7 }
  },
  {
    id: '8',
    name: 'Ishaan Gupta',
    number: 8,
    position: 'Midfielder',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'Dynamic box-to-box midfielder with a powerful long-range shot.',
    stats: { appearances: 25, goals: 6, assists: 4 }
  },
  {
    id: '11',
    name: 'Sameer Khan',
    number: 11,
    position: 'Forward',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/159515/football-player-football-game-ball-159515.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'Lightning-fast winger who can tear apart defenses on the break.',
    stats: { appearances: 35, goals: 12, assists: 18 }
  },
  {
    id: '9',
    name: 'Rohan Sharma',
    number: 9,
    position: 'Forward',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'Classic target man who excels at hold-up play and finishing.',
    stats: { appearances: 20, goals: 8, assists: 2 }
  },
  {
    id: '12',
    name: 'Deepak Patil',
    number: 12,
    position: 'Goalkeeper',
    nationality: 'Indian',
    image: 'https://images.pexels.com/photos/1321019/pexels-photo-1321019.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: 'Reliable second-choice keeper with lightning reflexes.',
    stats: { appearances: 5, goals: 0, assists: 0, cleanSheets: 3 }
  }
];

export const INITIAL_MATCHES: Match[] = [
  // LIVE MATCH
  {
    id: 'm-live-1',
    opponent: 'Mohun Bagan SG',
    opponentLogo: 'https://seeklogo.com/images/M/mohun-bagan-super-giant-logo-8B5E8F5F5F-seeklogo.com.png',
    venue: 'Narmada Arena, Jabalpur',
    date: '2024-11-11',
    time: '19:30',
    status: 'Live',
    isHome: true,
    currentMinute: 67,
    score: { nvfc: 2, opponent: 1 },
    referee: 'Crystal John',
    attendance: 32450,
    stadiumCapacity: 35000,
    weather: { condition: 'Clear', temperature: 24 },
    form: {
      nvfc: 'WWDWL',
      opponent: 'WDWWL'
    },
    headToHead: {
      nvfcWins: 3,
      draws: 2,
      opponentWins: 5,
      lastFiveMeetings: [
        { date: '2024-03-15', result: 'L', score: '0-2' },
        { date: '2023-11-20', result: 'W', score: '3-1' },
        { date: '2023-08-10', result: 'D', score: '1-1' },
        { date: '2023-04-05', result: 'L', score: '1-3' },
        { date: '2022-12-18', result: 'W', score: '2-0' }
      ]
    },
    statistics: {
      possession: { nvfc: 58, opponent: 42 },
      shots: { nvfc: 14, opponent: 8 },
      shotsOnTarget: { nvfc: 6, opponent: 4 },
      corners: { nvfc: 7, opponent: 3 },
      fouls: { nvfc: 9, opponent: 12 },
      offsides: { nvfc: 2, opponent: 4 },
      saves: { nvfc: 3, opponent: 4 }
    },
    lineup: {
      nvfc: {
        formation: '4-3-3',
        startingXI: [
          { id: '2', name: 'Rahul Deshmukh', number: 1, position: 'GK' },
          { id: '15', name: 'Ravi Kumar', number: 2, position: 'RB' },
          { id: '4', name: 'Karan Mehra', number: 4, position: 'CB' },
          { id: '5', name: 'Vikram Iyer', number: 5, position: 'CB' },
          { id: '3', name: 'Amit Joshi', number: 3, position: 'LB' },
          { id: '6', name: 'Aditya Varma', number: 6, position: 'CDM' },
          { id: '8', name: 'Ishaan Gupta', number: 8, position: 'CM' },
          { id: '3', name: 'Suresh Raina', number: 7, position: 'CM' },
          { id: '11', name: 'Sameer Khan', number: 11, position: 'RW' },
          { id: '1', name: 'Arjun Singh', number: 10, position: 'ST' },
          { id: '17', name: 'Rohit Nair', number: 17, position: 'LW' }
        ],
        substitutes: [
          { id: '12', name: 'Deepak Patil', number: 12, position: 'GK' },
          { id: '9', name: 'Rohan Sharma', number: 9, position: 'FW' },
          { id: '14', name: 'Pranav Das', number: 14, position: 'MF' },
          { id: '16', name: 'Sanjay Rao', number: 16, position: 'DF' },
          { id: '19', name: 'Manish Tiwari', number: 19, position: 'MF' }
        ]
      },
      opponent: {
        formation: '4-4-2',
        startingXI: [
          { id: 'o1', name: 'Vishal Kaith', number: 1, position: 'GK' },
          { id: 'o2', name: 'Subhashish Bose', number: 15, position: 'LB' },
          { id: 'o3', name: 'Hector Yuste', number: 5, position: 'CB' },
          { id: 'o4', name: 'Brendan Hamill', number: 4, position: 'CB' },
          { id: 'o5', name: 'Ashish Rai', number: 2, position: 'RB' },
          { id: 'o6', name: 'Sahal Samad', number: 18, position: 'LM' },
          { id: 'o7', name: 'Anirudh Thapa', number: 10, position: 'CM' },
          { id: 'o8', name: 'Lalengmawia', number: 8, position: 'CM' },
          { id: 'o9', name: 'Liston Colaco', number: 17, position: 'RM' },
          { id: 'o10', name: 'Jason Cummings', number: 9, position: 'ST' },
          { id: 'o11', name: 'Dimitri Petratos', number: 11, position: 'ST' }
        ],
        substitutes: [
          { id: 'o12', name: 'Arsh Shaikh', number: 31, position: 'GK' },
          { id: 'o13', name: 'Armando Sadiku', number: 14, position: 'FW' },
          { id: 'o14', name: 'Deepak Tangri', number: 16, position: 'MF' },
          { id: 'o15', name: 'Glan Martins', number: 6, position: 'MF' }
        ]
      }
    },
    events: [
      { minute: 12, type: 'Goal', team: 'NVFC', player: 'Arjun Singh', description: 'Right-footed shot from the centre of the box', assistedBy: 'Sameer Khan' },
      { minute: 28, type: 'Yellow', team: 'Opponent', player: 'Anirudh Thapa', description: 'Foul on Ishaan Gupta' },
      { minute: 34, type: 'Goal', team: 'Opponent', player: 'Jason Cummings', description: 'Header from close range', assistedBy: 'Liston Colaco' },
      { minute: 45, type: 'Yellow', team: 'NVFC', player: 'Aditya Varma', description: 'Tactical foul' },
      { minute: 52, type: 'Goal', team: 'NVFC', player: 'Sameer Khan', description: 'Left-footed strike from outside the box' },
      { minute: 61, type: 'Sub', team: 'Opponent', player: 'Armando Sadiku → Jason Cummings', description: 'Tactical substitution' },
      { minute: 65, type: 'Yellow', team: 'Opponent', player: 'Brendan Hamill', description: 'Foul on Arjun Singh' }
    ],
    commentary: [
      { minute: 67, text: 'NVFC controlling possession in the opponent half. Looking dangerous on the counter.', isHighlight: false },
      { minute: 65, text: '🟨 Yellow card for Brendan Hamill after a cynical foul on Arjun Singh', isHighlight: true },
      { minute: 61, text: '🔄 Substitution for Mohun Bagan: Armando Sadiku replaces Jason Cummings', isHighlight: false },
      { minute: 52, text: '⚽ GOAL! Sameer Khan with a thunderous strike from 25 yards! NVFC 2-1 Mohun Bagan!', isHighlight: true },
      { minute: 45, text: '🟨 Aditya Varma picks up a yellow for stopping a promising attack', isHighlight: true },
      { minute: 34, text: '⚽ GOAL! Jason Cummings heads home from a pinpoint Liston Colaco cross. 1-1!', isHighlight: true },
      { minute: 28, text: '🟨 Anirudh Thapa booked for a late challenge on Ishaan Gupta', isHighlight: true },
      { minute: 12, text: '⚽ GOAL! Arjun Singh opens the scoring! Beautiful team move finished clinically!', isHighlight: true },
      { minute: 1, text: 'Kick-off! NVFC get us underway at the Narmada Arena!', isHighlight: false }
    ]
  },

  // UPCOMING MATCH
  {
    id: 'm1',
    opponent: 'Bengaluru FC',
    opponentLogo: 'https://seeklogo.com/images/B/bengaluru-fc-logo-7E6796EF24-seeklogo.com.png',
    venue: 'Narmada Arena, Jabalpur',
    date: '2024-11-15',
    time: '19:30',
    status: 'Upcoming',
    isHome: true,
    referee: 'Tejas Nagvenkar',
    stadiumCapacity: 35000,
    weather: { condition: 'Partly Cloudy', temperature: 26 },
    form: {
      nvfc: 'WWDWL',
      opponent: 'WDLWW'
    },
    headToHead: {
      nvfcWins: 4,
      draws: 3,
      opponentWins: 3,
      lastFiveMeetings: [
        { date: '2024-04-12', result: 'W', score: '2-1' },
        { date: '2023-12-08', result: 'D', score: '0-0' },
        { date: '2023-09-15', result: 'L', score: '1-2' },
        { date: '2023-05-20', result: 'W', score: '3-0' },
        { date: '2023-02-10', result: 'D', score: '2-2' }
      ]
    },
    lineup: {
      nvfc: {
        formation: '4-3-3',
        startingXI: [
          { id: '2', name: 'Rahul Deshmukh', number: 1, position: 'GK' },
          { id: '15', name: 'Ravi Kumar', number: 2, position: 'RB' },
          { id: '4', name: 'Karan Mehra', number: 4, position: 'CB' },
          { id: '5', name: 'Vikram Iyer', number: 5, position: 'CB' },
          { id: '3', name: 'Amit Joshi', number: 3, position: 'LB' },
          { id: '6', name: 'Aditya Varma', number: 6, position: 'CDM' },
          { id: '8', name: 'Ishaan Gupta', number: 8, position: 'CM' },
          { id: '3', name: 'Suresh Raina', number: 7, position: 'CM' },
          { id: '11', name: 'Sameer Khan', number: 11, position: 'RW' },
          { id: '1', name: 'Arjun Singh', number: 10, position: 'ST' },
          { id: '9', name: 'Rohan Sharma', number: 9, position: 'LW' }
        ],
        substitutes: [
          { id: '12', name: 'Deepak Patil', number: 12, position: 'GK' },
          { id: '17', name: 'Rohit Nair', number: 17, position: 'FW' },
          { id: '14', name: 'Pranav Das', number: 14, position: 'MF' }
        ]
      },
      opponent: {
        formation: '4-2-3-1',
        startingXI: [
          { id: 'b1', name: 'Gurpreet Sandhu', number: 1, position: 'GK' },
          { id: 'b2', name: 'Roshan Singh', number: 32, position: 'LB' },
          { id: 'b3', name: 'Sandesh Jhingan', number: 4, position: 'CB' },
          { id: 'b4', name: 'Aleksandar Jovanovic', number: 5, position: 'CB' },
          { id: 'b5', name: 'Parag Shrivas', number: 2, position: 'RB' },
          { id: 'b6', name: 'Rohit Kumar', number: 8, position: 'CDM' },
          { id: 'b7', name: 'Suresh Wangjam', number: 6, position: 'CDM' },
          { id: 'b8', name: 'Sivasakthi Narayanan', number: 39, position: 'LW' },
          { id: 'b9', name: 'Javi Hernandez', number: 10, position: 'CAM' },
          { id: 'b10', name: 'Sunil Chhetri', number: 11, position: 'RW' },
          { id: 'b11', name: 'Ryan Williams', number: 7, position: 'ST' }
        ],
        substitutes: [
          { id: 'b12', name: 'Lara Sharma', number: 25, position: 'GK' },
          { id: 'b13', name: 'Edgar Mendez', number: 17, position: 'FW' }
        ]
      }
    }
  },

  // FINISHED MATCH 1
  {
    id: 'm2',
    opponent: 'Kerala Blasters',
    opponentLogo: 'https://seeklogo.com/images/K/kerala-blasters-fc-logo-A274EBB303-seeklogo.com.png',
    venue: 'Kochi Stadium',
    date: '2024-10-20',
    time: '19:30',
    status: 'Finished',
    isHome: false,
    score: { nvfc: 2, opponent: 2 },
    referee: 'Rahul Gupta',
    attendance: 28500,
    stadiumCapacity: 30000,
    weather: { condition: 'Humid', temperature: 29 },
    form: {
      nvfc: 'WDWWL',
      opponent: 'LDWDL'
    },
    headToHead: {
      nvfcWins: 2,
      draws: 4,
      opponentWins: 4,
      lastFiveMeetings: [
        { date: '2024-10-20', result: 'D', score: '2-2' },
        { date: '2024-03-10', result: 'L', score: '0-1' },
        { date: '2023-11-25', result: 'D', score: '1-1' },
        { date: '2023-07-14', result: 'W', score: '3-2' },
        { date: '2023-03-05', result: 'L', score: '1-3' }
      ]
    },
    statistics: {
      possession: { nvfc: 52, opponent: 48 },
      shots: { nvfc: 11, opponent: 13 },
      shotsOnTarget: { nvfc: 5, opponent: 6 },
      corners: { nvfc: 4, opponent: 6 },
      fouls: { nvfc: 14, opponent: 11 },
      offsides: { nvfc: 3, opponent: 2 },
      saves: { nvfc: 4, opponent: 3 }
    },
    events: [
      { minute: 18, type: 'Goal', team: 'Opponent', player: 'Adrian Luna', description: 'Free-kick from 22 yards' },
      { minute: 35, type: 'Goal', team: 'NVFC', player: 'Arjun Singh', description: 'Penalty conversion', assistedBy: '' },
      { minute: 42, type: 'Yellow', team: 'NVFC', player: 'Karan Mehra', description: 'Tactical foul' },
      { minute: 58, type: 'Goal', team: 'Opponent', player: 'Dimitrios Diamantakos', description: 'Close-range finish', assistedBy: 'Adrian Luna' },
      { minute: 73, type: 'Sub', team: 'NVFC', player: 'Rohan Sharma → Rohit Nair', description: 'Fresh legs up front' },
      { minute: 81, type: 'Goal', team: 'NVFC', player: 'Sameer Khan', description: 'Brilliant solo effort', assistedBy: '' },
      { minute: 88, type: 'Yellow', team: 'Opponent', player: 'Jessel Carneiro', description: 'Time wasting' }
    ],
    commentary: [
      { minute: 90, text: 'Full Time! A thrilling 2-2 draw in Kochi. NVFC showed great character to come back twice!', isHighlight: true },
      { minute: 81, text: '⚽ GOAL! Sameer Khan with a moment of magic! Beats three defenders and slots home! 2-2!', isHighlight: true },
      { minute: 73, text: '🔄 NVFC substitution: Rohan Sharma makes way for Rohit Nair', isHighlight: false },
      { minute: 58, text: '⚽ GOAL! Dimitrios Diamantakos restores Kerala lead. 2-1 to the home side.', isHighlight: true },
      { minute: 35, text: '⚽ GOAL! Arjun Singh converts from the spot! 1-1!', isHighlight: true },
      { minute: 18, text: '⚽ GOAL! Adrian Luna with a stunning free-kick! Kerala Blasters lead 1-0!', isHighlight: true }
    ]
  },

  // FINISHED MATCH 2
  {
    id: 'm3',
    opponent: 'Mumbai City FC',
    opponentLogo: 'https://seeklogo.com/images/M/mumbai-city-fc-logo-7B27C34D52-seeklogo.com.png',
    venue: 'Narmada Arena, Jabalpur',
    date: '2024-10-05',
    time: '20:00',
    status: 'Finished',
    isHome: true,
    score: { nvfc: 1, opponent: 0 },
    referee: 'Venkatesh R',
    attendance: 34200,
    stadiumCapacity: 35000,
    weather: { condition: 'Clear Night', temperature: 22 },
    form: {
      nvfc: 'DWWWL',
      opponent: 'WWLWW'
    },
    headToHead: {
      nvfcWins: 2,
      draws: 2,
      opponentWins: 6,
      lastFiveMeetings: [
        { date: '2024-10-05', result: 'W', score: '1-0' },
        { date: '2024-02-18', result: 'L', score: '0-3' },
        { date: '2023-10-22', result: 'D', score: '1-1' },
        { date: '2023-06-30', result: 'L', score: '2-3' },
        { date: '2023-03-12', result: 'W', score: '2-1' }
      ]
    },
    statistics: {
      possession: { nvfc: 45, opponent: 55 },
      shots: { nvfc: 8, opponent: 16 },
      shotsOnTarget: { nvfc: 3, opponent: 7 },
      corners: { nvfc: 3, opponent: 9 },
      fouls: { nvfc: 16, opponent: 8 },
      offsides: { nvfc: 1, opponent: 5 },
      saves: { nvfc: 7, opponent: 2 }
    },
    events: [
      { minute: 23, type: 'Yellow', team: 'NVFC', player: 'Vikram Iyer', description: 'Foul on Lallianzuala Chhangte' },
      { minute: 38, type: 'Yellow', team: 'Opponent', player: 'Rahul Bheke', description: 'Handball' },
      { minute: 67, type: 'Goal', team: 'NVFC', player: 'Arjun Singh', description: 'Counter-attack finish', assistedBy: 'Suresh Raina' },
      { minute: 72, type: 'Sub', team: 'Opponent', player: 'Bipin Singh → Alberto Noguera', description: 'Attacking change' },
      { minute: 85, type: 'Yellow', team: 'NVFC', player: 'Aditya Varma', description: 'Professional foul' },
      { minute: 90, type: 'Red', team: 'Opponent', player: 'Mehtab Singh', description: 'Second yellow card' }
    ],
    commentary: [
      { minute: 90, text: 'Full Time! NVFC hold on for a crucial 1-0 victory! Heroic defensive display!', isHighlight: true },
      { minute: 90, text: '🟥 RED CARD! Mehtab Singh sent off for a second bookable offense!', isHighlight: true },
      { minute: 85, text: '🟨 Aditya Varma booked for bringing down Lallianzuala Chhangte', isHighlight: true },
      { minute: 67, text: '⚽ GOAL! Arjun Singh finishes a lightning counter-attack! NVFC lead 1-0!', isHighlight: true },
      { minute: 38, text: '🟨 Rahul Bheke cautioned for handball', isHighlight: false },
      { minute: 23, text: '🟨 Vikram Iyer picks up an early yellow', isHighlight: false },
      { minute: 1, text: 'Match underway at a packed Narmada Arena!', isHighlight: false }
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '24/25 Home Kit - Authentic',
    price: 1999,
    category: 'Jersey',
    image: 'https://images.unsplash.com/photo-1577212017184-80cc1b73524e?auto=format&fit=crop&q=80&w=800',
    stock: 150,
    description: 'The official home skin of the Narmada Valley. Features moisture-wicking technology.',
    bestseller: true,
    isNew: true
  },
  {
    id: 'p2',
    name: '24/25 Away Kit - Gold Edition',
    price: 1899,
    category: 'Jersey',
    image: 'https://images.unsplash.com/photo-1626245053139-44585141fad2?auto=format&fit=crop&q=80&w=800',
    stock: 100,
    description: 'Stand out in the stands with our limited edition Gold Away Kit.',
    isNew: true
  },
  {
    id: 'p3',
    name: 'NVFC Pro Training Top',
    price: 1299,
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1515542706656-8e6ef17a1521?auto=format&fit=crop&q=80&w=800',
    stock: 75,
    description: 'Train like the pros. Lightweight, breathable, and aerodynamic.',
  },
  {
    id: 'p4',
    name: 'Elite Training Pants',
    price: 1099,
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    stock: 120,
    description: 'Tapered fit for maximum mobility on and off the pitch.',
  },
  {
    id: 'p5',
    name: 'Supporter Scarf - Traditional',
    price: 799,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800',
    stock: 50,
    description: 'Raise it high. 100% wool scarf with embroidered club crest.',
    bestseller: true
  },
  {
    id: 'p6',
    name: 'NVFC Snapback Cap via New Era',
    price: 899,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
    stock: 200,
    description: 'Street-ready style. Navy blue with gold 3D embroidery.',
  },
  {
    id: 'p7',
    name: 'Official Match Ball 24/25',
    price: 2499,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=800',
    stock: 30,
    description: 'FIFA Quality Pro certified match ball used in all home games.',
    isNew: true
  },
  {
    id: 'p8',
    name: 'Legacy Hoodie - Navy',
    price: 2199,
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    stock: 60,
    description: 'Premium heavyweight cotton blend for chilly match nights.',
    bestseller: true
  },
  {
    id: 'p9',
    name: 'NVFC Water Bottle',
    price: 399,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-51115da20bc4?auto=format&fit=crop&q=80&w=800',
    stock: 300,
    description: 'Stay hydrated. BPA-free aluminum bottle with matte finish.',
  },
  {
    id: 'p10',
    name: 'Mini Pennant',
    price: 299,
    category: 'Souvenirs',
    image: 'https://images.unsplash.com/photo-1599307223326-f7c688de5192?auto=format&fit=crop&q=80&w=800',
    stock: 500,
    description: 'Perfect for your car or office desk. Show your support anywhere.',
  }
];

// Fix: Added missing INITIAL_LEAGUE_TABLE export required by Matches.tsx
export const INITIAL_LEAGUE_TABLE: LeagueEntry[] = [
  { rank: 1, team: 'Mumbai City FC', played: 8, won: 6, drawn: 2, lost: 0, gf: 18, ga: 5, gd: 13, points: 20 },
  { rank: 2, team: 'Mohun Bagan SG', played: 8, won: 5, drawn: 1, lost: 2, gf: 15, ga: 10, gd: 5, points: 16 },
  { rank: 3, team: 'NVFC', played: 8, won: 4, drawn: 3, lost: 1, gf: 12, ga: 8, gd: 4, points: 15 },
  { rank: 4, team: 'Bengaluru FC', played: 8, won: 4, drawn: 2, lost: 2, gf: 14, ga: 11, gd: 3, points: 14 },
  { rank: 5, team: 'Kerala Blasters', played: 8, won: 3, drawn: 2, lost: 3, gf: 11, ga: 12, gd: -1, points: 11 },
  { rank: 6, team: 'FC Goa', played: 8, won: 2, drawn: 4, lost: 2, gf: 10, ga: 10, gd: 0, points: 10 },
  { rank: 7, team: 'Odisha FC', played: 8, won: 2, drawn: 3, lost: 3, gf: 9, ga: 11, gd: -2, points: 9 },
  { rank: 8, team: 'Chennaiyin FC', played: 8, won: 2, drawn: 2, lost: 4, gf: 8, ga: 13, gd: -5, points: 8 },
];
export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    title: 'Next Gen Academy Pitch',
    description: 'Help us build a FIFA-standard artificial turf for our U-15 and U-18 squads.',
    target: 5000000,
    raised: 3250000,
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=800',
    donors: 1240
  },
  {
    id: 'c2',
    title: 'Stadium Floodlights Upgrade',
    description: 'Lighting up the Narmada Arena for night matches and evening training sessions.',
    target: 2000000,
    raised: 450000,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800',
    donors: 350
  }
];

export const RECENT_DONATIONS: Donation[] = [
  { id: 'd1', donorName: 'Vikram Malhotra', amount: 50000, cause: 'Infrastructure', date: '2024-10-28', tier: 'Platinum', message: 'For the glory of NVFC!' },
  { id: 'd2', donorName: 'Sarah Jenkins', amount: 10000, cause: 'Academy', date: '2024-10-27', tier: 'Gold' },
  { id: 'd3', donorName: 'Rajesh Kumar', amount: 5000, cause: 'Team Development', date: '2024-10-26', tier: 'Silver', message: 'Keep fighting boys.' },
  { id: 'd4', donorName: 'Amit Patel', amount: 1000, cause: 'Academy', date: '2024-10-25', tier: 'Bronze' },
  { id: 'd5', donorName: 'Priya Sharma', amount: 25000, cause: 'Infrastructure', date: '2024-10-24', tier: 'Gold', message: 'Can\'t wait to see the new lights.' },
];
export const CLUB_HISTORY: Milestone[] = [
  { year: '1988', title: 'Foundation', description: 'Born along the Narmada banks as a local community vision to bring professional football to Jabalpur.' },
  { year: '1995', title: 'Professional Status', description: 'Officially registered as a professional entity in the Indian football pyramid.' },
  { year: '2008', title: 'The Golden Era', description: 'Won 5 consecutive Madhya Pradesh State League titles, becoming the region\'s powerhouse.' },
  { year: '2018', title: 'Narmada Arena', description: 'Inaugurated our world-class 35,000 capacity home stadium with state-of-the-art facilities.' },
  { year: '2021', title: 'National Glory', description: 'Crowned I-League Champions, securing our spot among India\'s elite clubs.' },
  { year: '2024', title: 'Future Bound', description: 'Launched the International Exchange Program with top-tier European academies.' },
];

export const MANAGEMENT_TEAM: ManagementProfile[] = [
  { name: 'Vikram Sethi', role: 'Club President', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600', bio: 'Former national player turned visionary administrator.' },
  { name: 'Dr. Ananya Rai', role: 'Chief Executive Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600', bio: 'Driving the club\'s commercial and global expansion strategies.' },
  { name: 'Marco Rossi', role: 'Technical Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600', bio: 'Bringing 20 years of Serie A coaching experience to the Valley.' },
];
