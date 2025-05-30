export const initialTeams = [
    { name: 'FC Basel 1893', points: 64, gamesPlayed: 34 },
    { name: 'Servette FC', points: 55, gamesPlayed: 34 },
    { name: 'BSC Young Boys', points: 53, gamesPlayed: 34 },
    { name: 'FC Lausanne-Sport', points: 50, gamesPlayed: 34 },
    { name: 'FC Luzern', points: 51, gamesPlayed: 34 },
    { name: 'FC Lugano', points: 52, gamesPlayed: 34 },
  ];
  
  export const matches = [
    { round: 35, date: '10. Mai 2025', time: '20:30', homeTeam: 'FC Lugano', awayTeam: 'FC Basel 1893', location: 'Stadio di Cornaredo' },
    { round: 35, date: '11. Mai 2025', time: '14:15', homeTeam: 'FC Luzern', awayTeam: 'FC Lausanne-Sport', location: 'swissporarena' },
    { round: 35, date: '11. Mai 2025', time: '16:30', homeTeam: 'Servette FC', awayTeam: 'BSC Young Boys', location: 'Stade de Genève' },
    { round: 36, date: '14. Mai 2025', time: '20:30', homeTeam: 'FC Lausanne-Sport', awayTeam: 'FC Basel 1893', location: 'Stade de la Tuilière' },
    { round: 36, date: '15. Mai 2025', time: '20:30', homeTeam: 'BSC Young Boys', awayTeam: 'FC Luzern', location: 'Stadion Wankdorf' },
    { round: 36, date: '15. Mai 2025', time: '20:30', homeTeam: 'Servette FC', awayTeam: 'FC Lugano', location: 'Stade de Genève' },
    { round: 37, date: '18. Mai 2025', time: '14:15', homeTeam: 'BSC Young Boys', awayTeam: 'FC Basel 1893', location: 'Stadion Wankdorf' },
    { round: 37, date: '18. Mai 2025', time: '16:30', homeTeam: 'FC Luzern', awayTeam: 'Servette FC', location: 'swissporarena' },
    { round: 37, date: '18. Mai 2025', time: '16:30', homeTeam: 'FC Lausanne-Sport', awayTeam: 'FC Lugano', location: 'Stade de la Tuilière' },
    { round: 38, date: '24. Mai 2025', time: '18:00', homeTeam: 'FC Lugano', awayTeam: 'BSC Young Boys', location: 'Stadio di Cornaredo' },
    { round: 38, date: '24. Mai 2025', time: '18:00', homeTeam: 'FC Basel 1893', awayTeam: 'FC Luzern', location: 'St. Jakob-Park' },
    { round: 38, date: '24. Mai 2025', time: '18:00', homeTeam: 'Servette FC', awayTeam: 'FC Lausanne-Sport', location: 'Stade de Genève' },
  ];

export const gamesPlayed: { [key: string]: "home" | "draw" | "away" } = {
  "FC Lugano_FC Basel 1893": "away",         // 10. Mai
  "FC Luzern_FC Lausanne-Sport": "draw",     // 11. Mai
  "Servette FC_BSC Young Boys": "draw",      // 11. Mai

  "FC Lausanne-Sport_FC Basel 1893": "away", // 14. Mai
  "BSC Young Boys_FC Luzern": "home",        // 15. Mai
  "Servette FC_FC Lugano": "home",           // 15. Mai

  "BSC Young Boys_FC Basel 1893": "home",    // 18. Mai
  "FC Luzern_Servette FC": "away",           // 18. Mai
  "FC Lausanne-Sport_FC Lugano": "draw",     // 18. Mai

  "FC Lugano_BSC Young Boys": "draw",        // 24. Mai
  "FC Basel 1893_FC Luzern": "home",         // 24. Mai
  "Servette FC_FC Lausanne-Sport": "draw",   // 24. Mai
};
  