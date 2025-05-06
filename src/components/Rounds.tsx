import Match from "./Match";

interface MatchType {
  round: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  index: number;
}
interface RoundsProps {
  matches: Record<number, MatchType[]>;
  results: { [key: string]: "home" | "draw" | "away" | null };
  onResult: (key: string, result: "home" | "draw" | "away") => void;
  activeMatchIndex: number;
}

export default function Rounds({ matches, results, onResult, activeMatchIndex }: RoundsProps) {
  return (
    <div>
      {Object.entries(matches).map(([round, games]) => (
        <div key={round}>
          <h3 className="font-semibold text-lg mt-4">Rundi {round}</h3>
          {games.map((match) => {
            const key = `${match.homeTeam}_${match.awayTeam}`;
            const isDisabled = match.index > activeMatchIndex;

            return (
              <div key={key} className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
                <Match
                  match={match}
                  result={results[key]}
                  onResult={onResult}
                  disabled={isDisabled}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
