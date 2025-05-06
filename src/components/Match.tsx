export default function Match({ match, result, onResult, disabled }: any) {
    const matchKey = `${match.homeTeam}_${match.awayTeam}`;
        return (
    <div className="flex items-center gap-2 py-2">
      <div className="w-40 text-sm">{match.date} {match.time}</div>
      <div className="inline-flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
      <button
          className={`w-40 px-3 py-1 ${result === "home" ? "bg-blue-600 text-white" : "bg-white text-black"} ${!disabled ? "group-hover:bg-blue-100" : ""}`}
          onClick={() => onResult(matchKey, "home")}
          disabled={disabled}
        >
          {match.homeTeam}
        </button>
        <button
          className={`w-12 px-3 py-1 border-l border-r border-gray-300 ${result === "draw" ? "bg-yellow-500 text-white" : "bg-white text-black"} ${!disabled ? "group-hover:bg-yellow-100" : ""}`}
          onClick={() => onResult(matchKey, "draw")}
          disabled={disabled}
        >
          X
        </button>
        <button
          className={`w-40 px-3 py-1 ${result === "away" ? "bg-red-600 text-white" : "bg-white text-black"} ${!disabled ? "group-hover:bg-red-100" : ""}`}
          onClick={() => onResult(matchKey, "away")}
          disabled={disabled}
        >
          {match.awayTeam}
        </button>
      </div>
    </div>

    );
  }

  