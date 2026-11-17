import { Sprout, Tractor } from 'lucide-react';

export default function StepCropCheck({ formData, onUpdate }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">2. Crop Production Check</h2>
        <p className="mt-1 text-sm text-stone-600">
          Do you cultivate crops on this shamba alongside or instead of livestock?
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onUpdate({ growsCrops: true })}
          className={`flex cursor-pointer flex-col items-start rounded-2xl border-2 p-5 text-left transition ${
            formData.growsCrops === true
              ? 'border-emerald-700 bg-emerald-50/70'
              : 'border-stone-200 bg-white hover:border-stone-300'
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="mt-3 text-base font-bold text-stone-900">Yes, I grow crops</span>
          <span className="mt-1 text-xs text-stone-600">
            Enable crop plot tracking, harvest yields, and acreage allocation.
          </span>
        </button>

        <button
          type="button"
          onClick={() => onUpdate({ growsCrops: false, cropAcres: '' })}
          className={`flex cursor-pointer flex-col items-start rounded-2xl border-2 p-5 text-left transition ${
            formData.growsCrops === false
              ? 'border-emerald-700 bg-emerald-50/70'
              : 'border-stone-200 bg-white hover:border-stone-300'
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <Tractor className="h-5 w-5" />
          </span>
          <span className="mt-3 text-base font-bold text-stone-900">No crops right now</span>
          <span className="mt-1 text-xs text-stone-600">
            Focus strictly on dairy cattle, goats, sheep, and poultry flocks.
          </span>
        </button>
      </div>

      {formData.growsCrops && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
          <label htmlFor="cropAcres" className="block text-sm font-semibold text-stone-800">
            Land Allocated to Crops (Acres) <span className="text-emerald-700">*</span>
          </label>
          <input
            id="cropAcres"
            type="number"
            min="0.1"
            step="0.1"
            max={formData.totalAcres || undefined}
            value={formData.cropAcres}
            onChange={(e) => onUpdate({ cropAcres: e.target.value })}
            placeholder={`Max ${formData.totalAcres || 'total'} acres`}
            className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none sm:max-w-xs"
          />
          <p className="mt-1.5 text-xs text-stone-600">
            Must not exceed your total farm size of <strong>{formData.totalAcres || 0} acres</strong>.
          </p>
        </div>
      )}
    </div>
  );
}