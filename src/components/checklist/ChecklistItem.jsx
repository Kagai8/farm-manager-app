import { CheckSquare, Square } from 'lucide-react';

export default function ChecklistItem({ item, onToggle }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        className={`flex w-full cursor-pointer items-start gap-3 rounded-2xl border p-3.5 text-left transition ${
          item.completed
            ? 'border-emerald-200 bg-emerald-50/50 text-stone-500'
            : 'border-stone-200 bg-white text-stone-900 hover:border-emerald-300'
        }`}
      >
        {item.completed ? (
          <CheckSquare className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
        ) : (
          <Square className="mt-0.5 h-5 w-5 shrink-0 text-stone-400" />
        )}
        <span className={`text-sm font-medium ${item.completed ? 'line-through' : ''}`}>
          {item.title}
        </span>
      </button>
    </li>
  );
}