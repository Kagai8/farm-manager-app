import { Sparkles } from 'lucide-react';

export default function ChecklistHero({ farmTitle }) {
  return (
    <div className="rounded-3xl bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-7 text-white shadow-sm">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Shamba Profile Ready</span>
      </div>
      <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">
        Welcome to {farmTitle || 'Your Shamba'}
      </h1>
      <p className="mt-2 text-sm text-emerald-100/85">
        Your farm location and preferences are saved. Tick off your starter tasks below or jump
        straight into your dashboard.
      </p>
    </div>
  );
}