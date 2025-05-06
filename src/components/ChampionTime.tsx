export default function ChampionTime({ time }: { time: string | null }) {
    return (
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Denn hämmers gschafft:</h2>
        <p className="text-lg">{time || '--:--:--'}</p>
      </div>
    );
  }