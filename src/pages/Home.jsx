import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import HowItWorks from '../components/landing/HowItWorks';
import AboutUs from '../components/landing/AboutUs';
import ContactUs from '../components/landing/ContactUs';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <AboutUs />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}