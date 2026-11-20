import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sprout, CheckCircle2, Pencil, Trash2, LogOut, MapPin, Droplets } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import SampleTagPreview from '../components/onboarding/SampleTagPreview';

const API_URL = 'http://localhost:3001/users';

export default function FarmProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser, logout } = useContext(AuthContext);

  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Farm profile not found');
        const data = await res.json();
        setFarmer(data);
      } catch (err) {
        console.error('Error loading farm profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarm();
  }, [id]);

  const handleResetSetup = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasOnboarded: false }),
      });
      const updated = await res.json();
      updateUser(updated);
      navigate('/onboarding/1');
    } catch (err) {
      console.error('Reset failed:', err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      logout();
      navigate('/');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 text-sm font-semibold text-stone-600">
        Loading shamba profile...
      </div>
    );
  }

  const profile = farmer?.farmProfile;

  if (!farmer || !profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50 px-4">
        <p className="text-sm font-semibold text-stone-700">No completed farm setup found.</p>
        <button
          type="button"
          onClick={() => navigate('/onboarding/1')}
          className="cursor-pointer rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white"
        >
          Start Onboarding
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-6">
       
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-extrabold text-emerald-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-white">
              <Sprout className="h-5 w-5" />
            </span>
            <span>ShambaSync</span>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Log Out</span>
          </button>
        </div>

        
        <div className="rounded-3xl bg-emerald-900 p-7 text-white shadow-sm">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Onboarding Complete</span>
          </div>
          <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">{profile.farmTitle}</h1>
          <p className="mt-1 text-sm text-emerald-100/85">
            Managed by {profile.ownerName} • {profile.totalAcres} Acres
          </p>
        </div>

        <SampleTagPreview
          farmName={profile.farmName}
          ownerName={profile.ownerName}
          growsCrops={profile.growsCrops}
        />

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-stone-900">Saved Shamba Details</h2>

          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div className="flex items-start gap-2.5 rounded-xl bg-stone-50 p-3.5">
              <MapPin className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0" />
              <div>
                <p className="text-xs text-stone-500">Location</p>
                <p className="font-semibold text-stone-900">
                  {[profile.subCounty, profile.county, profile.country].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl bg-stone-50 p-3.5">
              <Droplets className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0" />
              <div>
                <p className="text-xs text-stone-500">Water & Crops</p>
                <p className="font-semibold text-stone-900">
                  {profile.waterSource} •{' '}
                  {profile.growsCrops ? `${profile.cropAcres} Acres Crops` : 'Livestock Only'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4">
            <p className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
              Active Receipt Letterhead
            </p>
            <p className="mt-1 text-sm font-extrabold text-stone-900">
              {profile.letterhead.businessHeader}
            </p>
            <p className="text-xs text-stone-600">
              {profile.letterhead.taglineAddress}
              {profile.letterhead.contactPhone ? ` • Tel: ${profile.letterhead.contactPhone}` : ''}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4">
            <button
              type="button"
              onClick={handleResetSetup}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-900 hover:bg-emerald-100"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span>Edit Farm Setup</span>
            </button>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}