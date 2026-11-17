import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import farmerCutout from '../../assets/images/login_register.png';

export default function AuthShowcase() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-800 px-12 pt-12 text-white lg:flex lg:w-1/2 xl:px-16 xl:pt-14">
      <div className="relative z-10">
        <Link to="/" className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
            <Sprout className="h-5 w-5" />
          </span>
          <span>ShambaSync</span>
        </Link>

        <h2 className="mt-8 max-w-md text-3xl leading-tight font-extrabold xl:text-4xl">
          Every livestock, flock, and acre accounted for.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-emerald-100/85">
          Digitize your daily farm records, track records, and generate
          print-ready records and reports built for farmers everywhere.
        </p>
      </div>
      <div className="relative z-10 mt-6 flex flex-1 items-end justify-center">
        <img
          src={farmerCutout}
          alt="Kenyan farmer"
          className="max-h-120 w-auto object-contain object-bottom drop-shadow-2xl select-none"
        />
      </div>
    </div>
  );
}