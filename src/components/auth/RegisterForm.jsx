import { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function RegisterForm({ onRegister, loading, error, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (localError) setLocalError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match. Please check and try again.');
      return;
    }

    onRegister({
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      password: formData.password,
    });
  };

  const activeError = localError || error;

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
        Register to start your farm setup
      </h1>
      <p className="mt-1.5 text-sm text-stone-600">
        Create your account to start your guided shamba setup.
      </p>

      {activeError && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <span>{activeError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="reg-fullName" className="block text-sm font-semibold text-stone-700">
            Full Name (Farm Owner)
          </label>
          <input
            id="reg-fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g., Quincy Wanjiku"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-sm font-semibold text-stone-700">
            Email Address
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="farmer@example.com"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="reg-phone" className="block text-sm font-semibold text-stone-700">
            Phone Number
          </label>
          <input
            id="reg-phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 0712 345 678"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-sm font-semibold text-stone-700">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="reg-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pr-11 pl-4 text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-stone-400 hover:text-stone-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="reg-confirmPassword"
            className="block text-sm font-semibold text-stone-700"
          >
            Confirm Password
          </label>
          <input
            id="reg-confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full cursor-pointer rounded-full bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {/* Spotify-style bottom switch */}
      <div className="mt-8 border-t border-stone-200 pt-6 text-center">
        <p className="text-sm text-stone-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="cursor-pointer font-bold text-emerald-800 hover:underline"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}