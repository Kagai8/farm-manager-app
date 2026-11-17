import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import heroImage from '../../assets/images/hero_image.avif';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative flex min-h-dvh flex-col justify-between overflow-hidden bg-emerald-950 text-white"
    >
      
      <img
        src={heroImage}
        alt="Kenyan farmers harvesting in misty green field"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-950/35 to-emerald-950/90 lg:bg-gradient-to-r lg:from-emerald-950/92 lg:via-emerald-950/55 lg:to-emerald-950/40" />

      
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <div className="max-w-xl">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-emerald-300 uppercase">
            Farming With Purpose
          </span>

          <h1 className="mt-3 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Empowering <span className="text-emerald-300 italic">Every</span> Farmer
          </h1>

          <p className="mt-4 text-base leading-relaxed text-stone-200 sm:text-lg">
            Track your livestock, poultry, and crops in one unified platform Reduce waste,
            optimize productivity, and turn raw farm activity into profitable decisions
          </p>

          
          <div className="mt-6 flex items-center gap-6 border-t border-white/15 pt-5">
            <div>
              <p className="text-2xl font-extrabold text-emerald-300">3 Trackers</p>
              <p className="text-xs text-stone-300">Livestock, Poultry & Crops</p>
            </div>
            <div className="h-9 w-px bg-white/20" />
            <div>
              <p className="text-2xl font-extrabold text-emerald-300"> Consistency and Reliability</p>
              <p className="text-xs text-stone-300">Built for Farmer workflows</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 sm:px-6 lg:flex lg:items-end lg:justify-between lg:px-8 lg:pb-12">
        <a
          href="#how-it-works"
          className="hidden items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:text-white lg:inline-flex"
        >
          <span>How does it work?</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
          
          <button
            onClick={() => navigate('/register')}
            className="flex w-full cursor-pointer items-center justify-between gap-6 rounded-full bg-white py-2.5 pr-2.5 pl-6 text-left text-emerald-950 shadow-2xl transition hover:bg-emerald-50 sm:w-auto"
          >
            <div>
              <span className="block text-base font-extrabold">Get Started</span>
              <span className="block text-xs text-stone-500">Set up your farm in minutes</span>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-white">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 py-1 text-xs font-semibold text-emerald-200 hover:text-white lg:hidden"
          >
            <span>Learn More</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}