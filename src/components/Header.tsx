export default function Header({ text }: { text: string }) {
    return (
      <div className="relative z-40 py-6">
        <h1 className="text-3xl font-bold text-center ">{text}</h1>
      </div>
    );
  }