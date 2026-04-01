import { Navbar } from "@/components/Navbar";
import { MobileCTA } from "@/components/MobileCTA";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { QuickAccess } from "@/sections/QuickAccess";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Departments } from "@/sections/Departments";
import { Doctors } from "@/sections/Doctors";
import { Testimonials } from "@/sections/Testimonials";
import { Accreditations } from "@/sections/Accreditations";
import { Blog } from "@/sections/Blog";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow -mt-8 relative z-10 w-full overflow-hidden">
        <Hero />
        <QuickAccess />
        <WhyChooseUs />
        <Departments />
        <Doctors />
        <Testimonials />
        <Blog />
        <Accreditations />
      </main>

      <Footer />
      
      {/* Premium Floating Mobile CTA */}
      <MobileCTA />
    </div>
  );
}
