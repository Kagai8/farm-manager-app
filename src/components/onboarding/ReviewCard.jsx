import { Pencil } from 'lucide-react';

export default function ReviewCard({ title, stepNumber, onEdit, children }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-stone-900">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(stepNumber)}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-emerald-800 hover:underline"
        >
          <Pencil className="h-3 w-3" />
          <span>Edit</span>
        </button>
      </div>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}