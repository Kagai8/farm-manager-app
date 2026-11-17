import { CheckCircle2 } from 'lucide-react';
import farmerImage from '../../assets/images/farmer.jpeg';

const HIGHLIGHTS = [
  'Three Universal Asset Trackers: Manage Individual tagged livestock, Poultry batches, and Crop plots in one standardized system.',
  'Weather, Analytics & Printouts: Pair county-level weather forecasts and cost-to-yield tracking with printout-ready receipts and health records.',
  'Built for Farms: Lightweight, mobile-first interface tailored to local counties, acreage tracking and workflows.',
];

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="flex min-h-screen flex-col justify-center bg-white py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <img
            src={farmerImage}
            alt="Kenyan agri-tech team and farmers"
            className="max-h-[460px] w-full rounded-2xl object-cover shadow-xl"
          />
        </div>

        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase">
            Our Mission
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            Built for Every Farmer
          </h2>
          <p className="mt-4 text-lg font-medium text-stone-800">
            We are a team of agri-tech enthusiasts dedicated to bridging the digital divide in
             farming.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            ShambaSync is a unified farm operations platform built specifically for  diverse agricultural landscape.<br />

            Designed to replace scattered notebooks and guesswork, ShambaSync digitizes your entire farm lifecycle—from birth, 
            hatching, and planting through daily inputs, health events, and harvests. By turning raw field activity into clear 
            analytics and timely alerts, it empowers farmers to reduce waste and make profitable decisions.
          </p>

          <ul className="mt-6 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-medium text-stone-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}