import SampleTagPreview from './SampleTagPreview';
import ReviewCard from './ReviewCard';

export default function StepReview({ formData, onEditStep }) {
  const locationSummary = [formData.subCounty, formData.county, formData.country]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">4. Review & Confirm Setup</h2>
        <p className="mt-1 text-sm text-stone-600">
          Check your farm profile below before saving and heading to your dashboard.
        </p>
      </div>

      <SampleTagPreview
        farmName={formData.farmName}
        ownerName={formData.ownerName}
        growsCrops={formData.growsCrops}
      />

      <ReviewCard title="Farm & Location" stepNumber={1} onEdit={onEditStep}>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
          <div>
            <dt className="text-stone-500">Farm Name</dt>
            <dd className="font-semibold text-stone-900">
              {formData.farmName.trim() || 'Not set (uses first name)'}
            </dd>
          </div>
          <div>
            <dt className="text-stone-500">Owner</dt>
            <dd className="font-semibold text-stone-900">{formData.ownerName}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Location</dt>
            <dd className="font-semibold text-stone-900">{locationSummary}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Size & Water</dt>
            <dd className="font-semibold text-stone-900">
              {formData.totalAcres} Acres • {formData.waterSource}
            </dd>
          </div>
        </dl>
      </ReviewCard>

      <ReviewCard title="Crop Production" stepNumber={2} onEdit={onEditStep}>
        <p className="text-xs text-stone-700">
          {formData.growsCrops
            ? `Yes — ${formData.cropAcres} acres allocated to crops out of ${formData.totalAcres} total acres.`
            : 'No — livestock and poultry operations only.'}
        </p>
      </ReviewCard>

      <ReviewCard title="Receipt Letterhead" stepNumber={3} onEdit={onEditStep}>
        <p className="text-xs font-semibold text-stone-900">
          {formData.businessHeader || formData.farmName || `${formData.ownerName}'s Farm`}
        </p>
        <p className="text-xs text-stone-600">
          {formData.taglineAddress || locationSummary} • {formData.contactPhone || 'No phone'}
        </p>
      </ReviewCard>
    </div>
  );
}