export default function StepFarmBasics({
  formData,
  onChange,
  waterSources,
  countries,
  states,
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">1. Farm Identity & Location</h2>
        <p className="mt-1 text-sm text-stone-600">
          Set your shamba details and location for local weather forecasts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="farmName" className="block text-sm font-semibold text-stone-700">
            Farm Name <span className="font-normal text-stone-400">(Optional)</span>
          </label>
          <input
            id="farmName"
            name="farmName"
            type="text"
            value={formData.farmName}
            onChange={onChange}
            placeholder="e.g., Delmonte"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
          <p className="mt-1 text-xs text-stone-500">
            Leave blank to use your first name for asset codes.
          </p>
        </div>

        <div>
          <label htmlFor="ownerName" className="block text-sm font-semibold text-stone-700">
            Owner Full Name
          </label>
          <input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            value={formData.ownerName}
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="block text-sm font-semibold text-stone-700">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="county" className="block text-sm font-semibold text-stone-700">
            County / State
          </label>
          {states.length > 0 ? (
            <select
              id="county"
              name="county"
              value={formData.county}
              onChange={onChange}
              className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
            >
              <option value="">Select county / state</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="county"
              name="county"
              type="text"
              value={formData.county}
              onChange={onChange}
              placeholder="e.g., Nakuru"
              className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
            />
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="subCounty" className="block text-sm font-semibold text-stone-700">
            Sub-County / Ward
          </label>
          <input
            id="subCounty"
            name="subCounty"
            type="text"
            value={formData.subCounty}
            onChange={onChange}
            placeholder="e.g., Naivasha"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="totalAcres" className="block text-sm font-semibold text-stone-700">
            Total Size (Acres) <span className="text-emerald-700">*</span>
          </label>
          <input
            id="totalAcres"
            name="totalAcres"
            type="number"
            min="0.1"
            step="0.1"
            required
            value={formData.totalAcres}
            onChange={onChange}
            placeholder="e.g., 5"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="waterSource" className="block text-sm font-semibold text-stone-700">
            Water Source
          </label>
          <select
            id="waterSource"
            name="waterSource"
            value={formData.waterSource}
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          >
            {waterSources.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}