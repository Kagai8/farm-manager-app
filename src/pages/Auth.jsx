import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import AuthShowcase from '../components/auth/AuthShowcase';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const API_URL = 'http://localhost:3001/users';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  const isRegister = location.pathname === '/register';
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Server error');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users:', err);
        setError('Cannot reach the database. Make sure "npm run server" is running on port 3001.');
      }
    };

    fetchUsers();
  }, []);

  
  useEffect(() => {
    document.title = isRegister
      ? 'Register Farm | ShambaSync'
      : 'Log In | ShambaSync';
  }, [isRegister]);

  const switchMode = (registerMode) => {
    setError('');
    navigate(registerMode ? '/register' : '/login', { replace: true });
  };

  const saveSession = (user) => {
    const sessionUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      hasOnboarded: user.hasOnboarded,
      farmProfile: user.farmProfile,
    };
    localStorage.setItem('shambasync_user', JSON.stringify(sessionUser));
  };

  const handleLogin = ({ email, password }) => {
    setError('');

    const matchedUser = users.find((u) => u.email.toLowerCase() === email);

    if (!matchedUser || matchedUser.password !== password) {
      setError('Invalid email or password. Please check your credentials.');
      return;
    }

    saveSession(matchedUser);
    navigate(matchedUser.hasOnboarded ? '/dashboard' : '/onboarding');
  };

  const handleRegister = async ({ fullName, email, phone, password }) => {
    setError('');

    const emailExists = users.some((u) => u.email.toLowerCase() === email);
    if (emailExists) {
      setError('An account with this email already exists. Try logging in instead.');
      return;
    }

    setLoading(true);

    try {
      const newUser = {
        fullName,
        email,
        phone,
        password,
        hasOnboarded: false,
        farmProfile: null,
      };

      const createRes = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!createRes.ok) throw new Error('Failed to create account');
      const createdUser = await createRes.json();

      setUsers((prev) => [...prev, createdUser]);
      saveSession(createdUser);
      navigate('/onboarding');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Cannot reach the database. Make sure "npm run server" is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-stone-50">
      <AuthShowcase />

      <div className="flex w-full flex-col justify-center px-5 py-10 sm:px-10 lg:w-1/2 xl:px-16">
        <div className="mx-auto w-full max-w-md">
          
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 transition hover:text-emerald-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-2 font-bold text-emerald-900 lg:hidden">
              <Sprout className="h-5 w-5 text-emerald-700" />
              <span>ShambaSync</span>
            </div>
          </div>
          {isRegister ? (
            <RegisterForm
              onRegister={handleRegister}
              loading={loading}
              error={error}
              onSwitchToLogin={() => switchMode(false)}
            />
          ) : (
            <LoginForm
              onLogin={handleLogin}
              loading={loading}
              error={error}
              onSwitchToRegister={() => switchMode(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}