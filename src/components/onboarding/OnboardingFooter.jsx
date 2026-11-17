import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OnboardingFooter({ step, submitting, onBack, onNext, onConfirm }) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-5">
      {step > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-bold text-stone-700 transition hover:bg-stone-100"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      ) : (
        <div />
      )}

      {step < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-800 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-900"
        >
          <span>Continue</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <button
          type="button"
          disabled={submitting}
          onClick={onConfirm}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-800 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-900 disabled:opacity-60"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{submitting ? 'Saving Setup...' : 'Confirm & Save Setup'}</span>
        </button>
      )}
    </div>
  );
}