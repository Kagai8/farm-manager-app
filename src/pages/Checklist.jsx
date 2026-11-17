import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowRight } from 'lucide-react';
import ChecklistHero from '../components/checklist/ChecklistHero';
import ChecklistItem from '../components/checklist/ChecklistItem';

const API_BASE = 'http://localhost:3001';

export default function Checklist() {
  const navigate = useNavigate();
  const [savedUser] = useState(() => JSON.parse(localStorage.getItem('shambasync_user') || 'null'));

  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!savedUser) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchChecklist = async () => {
      try {
        const res = await fetch(`${API_BASE}/checklists?userId=${encodeURIComponent(savedUser.id)}`);
        const data = await res.json();
        if (data.length > 0) {
          setChecklist(data[data.length - 1]);
        }
      } catch (err) {
        console.error('Failed to load checklist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChecklist();
  }, [savedUser, navigate]);

  const handleToggleItem = async (itemId) => {
    if (!checklist) return;

    const updatedItems = checklist.items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );

    setChecklist((prev) => ({ ...prev, items: updatedItems }));

    try {
      await fetch(`${API_BASE}/checklists/${checklist.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updatedItems }),
      });
    } catch (err) {
      console.error('Failed to update checklist item:', err);
    }
  };

  const completedCount = checklist?.items?.filter((i) => i.completed).length || 0;
  const totalCount = checklist?.items?.length || 0;

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex items-center gap-2 text-lg font-extrabold text-emerald-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-white">
            <Sprout className="h-5 w-5" />
          </span>
          <span>ShambaSync</span>
        </div>

        <ChecklistHero farmTitle={checklist?.farmTitle || savedUser?.farmProfile?.farmTitle} />

        <div className="mt-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-xs sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-stone-900">Your Starter Checklist</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
              {completedCount} / {totalCount} Done
            </span>
          </div>

          {loading ? (
            <p className="mt-4 text-sm text-stone-500">Loading your checklist...</p>
          ) : checklist?.items?.length ? (
            <ul className="mt-4 space-y-2.5">
              {checklist.items.map((item) => (
                <ChecklistItem key={item.id} item={item} onToggle={handleToggleItem} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-stone-500">No starter tasks found.</p>
          )}

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}