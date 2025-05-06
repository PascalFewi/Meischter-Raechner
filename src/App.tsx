import { useState } from "react";
import Header from "./components/Header";
import Rounds from "./components/Rounds";
import ChampionTime from "./components/ChampionTime";
import Standings from "./components/Standings";
import { matches, initialTeams } from "./data";
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

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
  const [width, height] = useWindowSize();
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
    <div className="z-50">       
    {championTime && (
      <Confetti
        width={width}
        height={height}
        colors={['#ff0000', '#0000ff']}
        recycle={true}
        numberOfPieces={100}
      />
    )}

    {!championTime && ( 
       <div className="sticky top-0 bg-white my shadow-md z-10">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 flex z-10">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`h-full opacity-5 z-20 ${i % 2 === 0 ? 'bg-red-600' : 'bg-blue-600'}`}
                style={{
                  aspectRatio: '5 / 2',
                  minHeight: '100%',
                }}
              />
            ))}
          </div>  
          <Header text="Meister Rächner"/>
        </div>
      </div>)}

      {championTime && ( 
       <div className="sticky top-0 bg-white my shadow-md">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 flex z-10">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`h-full opacity-20 z-20 ${i % 2 === 0 ? 'bg-red-600' : 'bg-blue-600'}`}
                style={{
                  aspectRatio: '5 / 2',
                  minHeight: '100%',
                }}
              />
            ))}
          </div> 
          <div > 
            <Header text="Meister!"/>
          </div>
        </div>
      </div>)}

      <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 mt-6 px-4 sm:px-6 md:px-10 lg:px-20">
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
            <a href="https://druckerei-dietrich.ch">
            <div className="hidden md:flex mt-20 p-2 px-10 rounded-md shadow-md items-center gap-6 text-left"
                style={{
                  backgroundColor: '#002856',
                  color: '#ffffff',
                  border: '2px solid #002856'
                }} >
                <img src="src/assets/DD_Gross.jpg" alt="Druckerei Dietrich" className="rounded-md max-h-24 w-auto"
                />
                <p className="text-xl font-semibold">
                 Druckerei Dietrich druckt em FCB de Duume!
                </p>
              </div>
              </a>
          </div>
        </div>
      </div>
      <footer className="mt-16 text-center text-sm text-gray-500 py-4">
        <p>e Websitte vom Pascal</p>
        <a href="https://druckerei-dietrich.ch">
        <div className="md:hidden mt-12 mx-4 p-2 px-6 rounded-md shadow-md flex items-center gap-4"
          style={{
          backgroundColor: '#002856',
          color: '#ffffff',
          border: '2px solid #002856'
        }}>
          <img
            src="src/assets/DD_Gross.jpg"
            alt="Druckerei Dietrich"
            className="rounded-md max-h-20 w-auto"
          />
          <p className="text-base font-semibold">
            Druckerei Dietrich druckt em FCB de Duume!
          </p>
        </div>
        </a>
      </footer>

        <img  src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fpascalfewi.github.io%2FMeischter-Raechner%2F&label=Bsuecher&icon=person-fill&color=%23000"></img>

    </div>
  );
}
