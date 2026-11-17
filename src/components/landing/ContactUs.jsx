import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact-us"
      className="flex min-h-screen flex-col justify-center bg-stone-100 py-24"
    >
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase">
            Get In Touch
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-2 text-stone-600">
            Have questions about setting up your farm on ShambaSync? Send us a note.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-stone-700">
                Full Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Quincy Wanjiku"
                className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-stone-700">
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="farmer@example.com"
                className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-semibold text-stone-700"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="3"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help your farm?"
                className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white transition hover:bg-emerald-900"
            >
              Send Message
            </button>
          </form>

          {submitted && (
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              <span>Asante! Your message has been received. Our team will reach out shortly.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}