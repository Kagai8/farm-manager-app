import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Contact Us', href: '#contact-us' },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/15 bg-emerald-950/80 px-5 py-3 text-white shadow-xl backdrop-blur-md">
        
        <a href="#home" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
            <Sprout className="h-5 w-5" />
          </span>
          <span>ShambaSync</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-emerald-100/85 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => navigate('/login')}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-950 shadow-xs transition hover:bg-emerald-50"
          >
            <User className="h-4 w-4" />
            Login
          </button>
        </div>

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-1.5 text-xs font-semibold tracking-wider text-emerald-100 uppercase hover:bg-white/10 md:hidden"
          aria-label="Toggle Menu"
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      
      {menuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/15 bg-emerald-950/95 p-4 text-white shadow-2xl backdrop-blur-md md:hidden">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-emerald-100 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate('/login');
              }}
              className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-emerald-950"
            >
              <User className="h-4 w-4" />
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}