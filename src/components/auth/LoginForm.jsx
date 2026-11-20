import { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginForm({ onLogin, loading, error, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email: email.trim().toLowerCase(), password });
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
        Log in to ShambaSync
      </h1>
      <p className="mt-1.5 text-sm text-stone-600">
        Enter your credentials to access your farm workflow.
      </p>

      {error && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-sm font-semibold text-stone-700">
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="farmer@example.com"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="block text-sm font-semibold text-stone-700">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full cursor-pointer rounded-full bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="mt-8 border-t border-stone-200 pt-6 text-center">
        <p className="text-sm text-stone-600">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="cursor-pointer font-bold text-emerald-800 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}