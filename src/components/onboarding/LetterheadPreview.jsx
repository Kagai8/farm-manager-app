export default function LetterheadPreview({ formData }) {
  const locationFallback = [formData.subCounty, formData.county, formData.country]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4">
      <p className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
        Printout Header Preview
      </p>
      <p className="mt-1 text-base font-extrabold text-stone-900">
        {formData.businessHeader || formData.farmName || `${formData.ownerName}'s Farm`}
      </p>
      <p className="text-xs text-stone-600">
        {formData.taglineAddress || locationFallback}
        {formData.contactPhone ? ` • Tel: ${formData.contactPhone}` : ''}
      </p>
    </div>
  );
}