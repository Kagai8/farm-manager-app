import { Sparkles } from 'lucide-react';
import LetterheadPreview from './LetterheadPreview';

export default function StepLetterhead({ formData, onChange, onAutoFill }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900">3. Printout Letterhead</h2>
          <p className="mt-1 text-sm text-stone-600">
            Customize the header that appears on your printed farm receipts and reports.
          </p>
        </div>

        <button
          type="button"
          onClick={onAutoFill}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-900 transition hover:bg-emerald-100"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Use Farm Defaults</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="businessHeader" className="block text-sm font-semibold text-stone-700">
            Farm / Business Header
          </label>
          <input
            id="businessHeader"
            name="businessHeader"
            type="text"
            value={formData.businessHeader}
            onChange={onChange}
            placeholder="e.g., Delmonte Shamba Enterprises"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="taglineAddress" className="block text-sm font-semibold text-stone-700">
            Tagline or Location Address
          </label>
          <input
            id="taglineAddress"
            name="taglineAddress"
            type="text"
            value={formData.taglineAddress}
            onChange={onChange}
            placeholder="e.g., P.O. Box 120, Kiambu"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="contactPhone" className="block text-sm font-semibold text-stone-700">
            Receipt Contact Phone
          </label>
          <input
            id="contactPhone"
            name="contactPhone"
            type="tel"
            value={formData.contactPhone}
            onChange={onChange}
            placeholder="e.g., 0722 345 678"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="contactEmail" className="block text-sm font-semibold text-stone-700">
            Receipt Contact Email
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={onChange}
            placeholder="farmer@example.com"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>
      </div>

      <LetterheadPreview formData={formData} />
    </div>
  );
}