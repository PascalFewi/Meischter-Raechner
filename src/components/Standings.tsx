export default function Standings({ teams }: any) {
    const baselPoints = teams.find((t: any) => t.name === "FC Basel 1893")?.points || 0;
    const allEliminated = teams
    .filter((t: any) => t.name !== "FC Basel 1893")
    .every((t: any) => t.maxPossiblePoints < baselPoints);
  
    return (
      <div>
        <h2 className="text-xl font-semibold">Tabälle</h2>
        <table className="table-auto w-full mt-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left border-b border-gray-300">Team</th>
              <th className="p-2 text-right border-b border-gray-300">Pünggt</th>
              <th className="p-2 text-right border-b border-gray-300">Rundi gspielt</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team: any) => {
              const stillPossible = team.name === "FC Basel 1893" || team.maxPossiblePoints >= baselPoints;
              const isBaselChampion = allEliminated && team.name === "FC Basel 1893";
              return (
                <tr key={team.name} className={`${isBaselChampion ? 'bg-green-200 font-semibold' : stillPossible ? '' : 'text-gray-400'}`}>
                  <td className="p-2 ">{team.name}</td> 
                  <td className="p-2 text-right">{team.points}</td>
                  <td className="p-2 text-right">{team.gamesPlayed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }