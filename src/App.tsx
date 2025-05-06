import { useState } from "react";
import Header from "./components/Header";
import Rounds from "./components/Rounds";
import ChampionTime from "./components/ChampionTime";
import Standings from "./components/Standings";
import { matches, initialTeams } from "./data";

const matchesWithIndex = matches.map((m, i) => ({ ...m, index: i }));
const groupedMatches = matchesWithIndex.reduce((acc, match) => {
  if (!acc[match.round]) acc[match.round] = [];
  acc[match.round].push(match);
  return acc;
}, {} as Record<number, typeof matchesWithIndex>);

function recalculateTeams(results: { [key: string]: "home" | "draw" | "away" | null }) {
  const teams = initialTeams.map(t => ({
    ...t,
    points: t.points,
    gamesPlayed: t.gamesPlayed,
  }));

  let championTimeFound: string | null = null;

  for (const match of matches) {
    const key = `${match.homeTeam}_${match.awayTeam}`;
    const result = results[key];
    if (!result) break;

    const home = teams.find(t => t.name === match.homeTeam);
    const away = teams.find(t => t.name === match.awayTeam);
    if (!home || !away) continue;

    if (result === "home") home.points += 3;
    else if (result === "away") away.points += 3;
    else {
      home.points += 1;
      away.points += 1;
    }

    home.gamesPlayed += 1;
    away.gamesPlayed += 1;

    if (!championTimeFound) {
      const basel = teams.find(t => t.name === "FC Basel 1893");
      if (basel) {
        const contenders = teams.filter(t => t.name !== basel.name);
        const allEliminated = contenders.every(
          t => t.points + (38 - t.gamesPlayed) * 3 < basel.points
        );

        if (allEliminated) {
          const [hourStr, minuteStr] = match.time.split(":");
          const hour = parseInt(hourStr, 10) + 2;
          const minute = parseInt(minuteStr, 10);
          if (!isNaN(hour) && !isNaN(minute)) {
            championTimeFound = `${match.date}  -  ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
          }
        }
      }
    }
  }

  const teamsWithMax = teams.map(t => ({
    ...t,
    maxPossiblePoints: t.points + (38 - t.gamesPlayed) * 3,
  }));

  return { teams: teamsWithMax, championTime: championTimeFound };
}

export default function App() {
  const [results, setResults] = useState<{ [key: string]: "home" | "draw" | "away" | null }>({});
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [championTime, setChampionTime] = useState<string | null>(null);
  const [teams, setTeams] = useState(() => recalculateTeams(results).teams);

  const handleResult = (matchKey: string, result: "home" | "draw" | "away") => {
    const matchIndex = matchesWithIndex.findIndex(
      m => `${m.homeTeam}_${m.awayTeam}` === matchKey
    );
    if (matchIndex === -1) return;
  
    const resetResults = { ...results };
    for (let i = matchIndex + 1; i < matchesWithIndex.length; i++) {
      const key = `${matchesWithIndex[i].homeTeam}_${matchesWithIndex[i].awayTeam}`;
      delete resetResults[key];
    }
  
    const updatedResults = {
      ...resetResults,
      [matchKey]: result,
    };
  
    const { teams: newTeams, championTime: detectedTime } = recalculateTeams(updatedResults);
    setResults(updatedResults);
    setTeams(newTeams);
    setActiveMatchIndex(matchIndex + 1);
  
    if (detectedTime) {
      if (!championTime) setChampionTime(detectedTime);
    } else {
      if (championTime) setChampionTime(null);
    }
  };

  return (
    <div className="p-4">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <Rounds
            matches={groupedMatches}
            results={results}
            onResult={handleResult}
            activeMatchIndex={activeMatchIndex}
          />
        </div>
        <div className="space-y-6 overflow-x-auto">
          <ChampionTime time={championTime} />
          <div className="overflow-x-auto rounded-md">
            <Standings teams={[...teams].sort((a, b) => b.points - a.points)} />
          </div>
        </div>
      </div>
    </div>
  );
}
