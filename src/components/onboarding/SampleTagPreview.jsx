import { Tag } from 'lucide-react';

export default function SampleTagPreview({ farmName, ownerName, growsCrops }) {
  const hasFarmName = Boolean((farmName || '').trim());
  const rawRoot = hasFarmName
    ? farmName.trim()
    : (ownerName || 'FARM').trim().split(/\s+/)[0];

  const samplePrefix = rawRoot
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 3)
    .padEnd(3, 'X');

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-950 p-4 text-white">
      <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-300 uppercase">
        <Tag className="h-3.5 w-3.5" />
        <span>Sample Asset Tag Format</span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-emerald-800/80 px-3 py-1 font-mono text-sm font-bold text-emerald-100">
          {samplePrefix}-COW-000001
        </span>
        {growsCrops && (
          <span className="rounded-lg bg-emerald-800/80 px-3 py-1 font-mono text-sm font-bold text-emerald-100">
            {samplePrefix}-PLOT-001
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-emerald-200/80">
        {hasFarmName
          ? `Derived from your farm name "${farmName.trim()}".`
          : `No farm name entered — automatically derived from your first name "${rawRoot}".`}
      </p>
    </div>
  );
}