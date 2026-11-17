import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../components/common/ErrorAlert';
import OnboardingHeader from '../components/onboarding/OnboardingHeader';
import OnboardingFooter from '../components/onboarding/OnboardingFooter';
import StepFarmBasics from '../components/onboarding/StepFarmBasics';
import StepCropCheck from '../components/onboarding/StepCropCheck';
import StepLetterhead from '../components/onboarding/StepLetterhead';
import StepReview from '../components/onboarding/StepReview';

const API_BASE = 'http://localhost:3001';

const FALLBACK_COUNTRIES = [
  {
    name: 'Kenya',
    states: [
      { name: 'Nairobi County' },
      { name: 'Kiambu County' },
      { name: 'Nakuru County' },
      { name: 'Uasin Gishu County' },
      { name: 'Murang’a County' },
      { name: 'Machakos County' },
      { name: 'Nyeri County' },
      { name: 'Kisumu County' },
      { name: 'Mombasa County' },
      { name: 'Kajiado County' },
    ],
  },
  { name: 'Uganda', states: [{ name: 'Central Region' }, { name: 'Eastern Region' }] },
  { name: 'Tanzania', states: [{ name: 'Arusha' }, { name: 'Kilimanjaro' }, { name: 'Dar es Salaam' }] },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [savedUser] = useState(() => JSON.parse(localStorage.getItem('shambasync_user') || 'null'));

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [waterSources, setWaterSources] = useState(['Borehole', 'River / Stream', 'Rainwater Harvesting']);
  const [countryList, setCountryList] = useState(FALLBACK_COUNTRIES);

  const [formData, setFormData] = useState({
    farmName: '',
    ownerName: savedUser?.fullName || '',
    country: 'Kenya',
    county: 'Kiambu County',
    subCounty: '',
    totalAcres: '',
    waterSource: 'Borehole',
    growsCrops: null,
    cropAcres: '',
    businessHeader: '',
    taglineAddress: '',
    contactPhone: savedUser?.phone || '',
    contactEmail: savedUser?.email || '',
  });

  useEffect(() => {
    if (!savedUser) {
      navigate('/login', { replace: true });
    }
  }, [savedUser, navigate]);

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const res = await fetch(`${API_BASE}/dropdownOptions`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.waterSources?.length) setWaterSources(data.waterSources);
      } catch (err) {
        console.error('Using fallback dropdown options:', err);
      }
    };

    loadDropdowns();
  }, []);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/states');
        if (!res.ok) return;
        const json = await res.json();
        if (Array.isArray(json.data) && json.data.length > 0) {
          setCountryList(json.data);
        }
      } catch (err) {
        console.error('Using fallback location list:', err);
      }
    };

    loadLocations();
  }, []);

  const currentCountryObj = countryList.find((c) => c.name === formData.country);
  const availableStates = currentCountryObj ? currentCountryObj.states.map((s) => s.name) : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'country' ? { county: '' } : {}),
    }));
  };

  const handleUpdate = (updates) => {
    setError('');
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleAutoFillLetterhead = () => {
    const title = formData.farmName.trim() || `${formData.ownerName}'s Farm`;
    setFormData((prev) => ({
      ...prev,
      businessHeader: title,
      taglineAddress: [prev.subCounty, prev.county, prev.country].filter(Boolean).join(', '),
      contactPhone: prev.contactPhone || savedUser?.phone || '',
      contactEmail: prev.contactEmail || savedUser?.email || '',
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.ownerName.trim()) return 'Please enter the farm owner name.';
      if (!formData.totalAcres || Number(formData.totalAcres) <= 0) {
        return 'Please enter a valid total farm size in acres.';
      }
    }

    if (step === 2) {
      if (formData.growsCrops === null) {
        return 'Please select whether you grow crops on this farm.';
      }
      if (formData.growsCrops) {
        const cropSize = Number(formData.cropAcres);
        if (!cropSize || cropSize <= 0) return 'Please enter the acreage allocated to crops.';
        if (cropSize > Number(formData.totalAcres)) {
          return 'Crop acreage cannot exceed your total farm size.';
        }
      }
    }

    return '';
  };

  const handleNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleConfirmSetup = async () => {
    if (!savedUser) return;
    setSubmitting(true);
    setError('');

    try {
      let coordinates = { latitude: -1.2864, longitude: 36.8172 };
      const geoQuery = (formData.subCounty.trim() || formData.county || formData.country).replace(
        /\s+County$/i,
        ''
      );

      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(geoQuery)}&count=1`
        );
        const geoData = await geoRes.json();
        if (geoData.results?.[0]) {
          coordinates = {
            latitude: geoData.results[0].latitude,
            longitude: geoData.results[0].longitude,
          };
        }
      } catch {
        console.log('Geocoding failed, using default coordinates.');
      }

      const farmTitle =
        formData.farmName.trim() || `${formData.ownerName.trim().split(/\s+/)[0]}'s Shamba`;
      const defaultAddress = [formData.subCounty.trim(), formData.county, formData.country]
        .filter(Boolean)
        .join(', ');

      const farmProfile = {
        farmName: formData.farmName.trim(),
        farmTitle,
        ownerName: formData.ownerName.trim(),
        country: formData.country,
        county: formData.county,
        subCounty: formData.subCounty.trim(),
        coordinates,
        totalAcres: Number(formData.totalAcres),
        waterSource: formData.waterSource,
        growsCrops: formData.growsCrops,
        cropAcres: formData.growsCrops ? Number(formData.cropAcres) : 0,
        letterhead: {
          businessHeader: formData.businessHeader.trim() || farmTitle,
          taglineAddress: formData.taglineAddress.trim() || defaultAddress,
          contactPhone: formData.contactPhone.trim(),
          contactEmail: formData.contactEmail.trim(),
        },
      };

      const userRes = await fetch(`${API_BASE}/users/${savedUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasOnboarded: true, farmProfile }),
      });

      if (!userRes.ok) throw new Error('Failed to save farm profile');
      const updatedUser = await userRes.json();

      const locationLabel = formData.county || formData.country;
      const starterTasks = [
        {
          id: 'task-1',
          title: `Verify ${locationLabel} weather alerts on your dashboard`,
          completed: false,
        },
        {
          id: 'task-2',
          title: 'Register your first dairy cow, goat, or poultry flock',
          completed: false,
        },
        ...(formData.growsCrops
          ? [
              {
                id: 'task-3',
                title: `Log your ${formData.cropAcres}-acre crop plot and planting season`,
                completed: false,
              },
            ]
          : []),
        {
          id: 'task-4',
          title: 'Preview and print a sample farm receipt with your letterhead',
          completed: false,
        },
      ];

      await fetch(`${API_BASE}/checklists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: savedUser.id,
          farmTitle,
          items: starterTasks,
        }),
      });

      localStorage.setItem(
        'shambasync_user',
        JSON.stringify({
          id: updatedUser.id,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          phone: updatedUser.phone,
          hasOnboarded: true,
          farmProfile: updatedUser.farmProfile,
        })
      );

      navigate('/checklist');
    } catch (err) {
      console.error('Onboarding submit failed:', err);
      setError('Could not save your setup. Make sure "npm run server" is running on port 3001.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <OnboardingHeader step={step} />

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8">
          <ErrorAlert message={error} />

          {step === 1 && (
            <StepFarmBasics
              formData={formData}
              onChange={handleChange}
              waterSources={waterSources}
              countries={countryList.map((c) => c.name)}
              states={availableStates}
            />
          )}

          {step === 2 && <StepCropCheck formData={formData} onUpdate={handleUpdate} />}

          {step === 3 && (
            <StepLetterhead
              formData={formData}
              onChange={handleChange}
              onAutoFill={handleAutoFillLetterhead}
            />
          )}

          {step === 4 && <StepReview formData={formData} onEditStep={setStep} />}

          <OnboardingFooter
            step={step}
            submitting={submitting}
            onBack={() => {
              setError('');
              setStep((prev) => prev - 1);
            }}
            onNext={handleNext}
            onConfirm={handleConfirmSetup}
          />
        </div>
      </div>
    </div>
  );
}