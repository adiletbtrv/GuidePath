import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FeaturedGuides } from '@/components/landing/FeaturedGuides';
import { CTASection } from '@/components/landing/CTASection';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <HowItWorks />
        <FeaturedGuides />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
