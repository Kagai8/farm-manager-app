import { Sprout } from 'lucide-react';

export default function OnboardingHeader({ step }) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-lg font-extrabold text-emerald-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-white">
            <Sprout className="h-5 w-5" />
          </span>
          <span>ShambaSync Setup</span>
        </div>
        <span className="text-xs font-bold text-stone-500">Step {step} of 4</span>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`h-2 rounded-full transition ${
              num <= step ? 'bg-emerald-700' : 'bg-stone-200'
            }`}
          />
        ))}
      </div>
    </>
  );
}