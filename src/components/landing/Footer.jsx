import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-900 py-8 text-center text-white">
      <div className="mx-auto max-w-7xl px-4">
        <p className="inline-flex items-center gap-2 font-bold">
          <Sprout className="h-5 w-5 text-emerald-300" />
          <span>ShambaSync &copy; 2026</span>
        </p>
        <p className="mt-1 text-xs text-emerald-200/80">Built for Futuristic Agriculture</p>
      </div>
    </footer>
  );
}
