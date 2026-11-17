import { Smartphone, PlusCircle, TrendingUp } from 'lucide-react';

const STEPS = [
  {
    icon: Smartphone,
    title: '1. Register Your Farm',
    description: 'Create your account and complete your guided farm setup in minutes',
  },
  {
    icon: PlusCircle,
    title: '2. Add Your Assets',
    description: 'Log your livestock, poultry batches, or crop plots with automated farm codes',
  },
  {
    icon: TrendingUp,
    title: '3. Track & Grow',
    description: 'View real-time dashboards, get local weather forecasts, and maximize profits',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex min-h-screen flex-col justify-center bg-stone-100 py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase">
            Simple Workflow
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            How ShambaSync Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-stone-600">
            Three easy steps to digitize daily farm operations.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex flex-col items-center rounded-2xl border border-stone-200/80 bg-white p-8 text-center shadow-xs transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-stone-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}