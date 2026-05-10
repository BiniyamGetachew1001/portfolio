
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { PremiumShowreel } from './components/PremiumShowreel';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { LongFormShowreel } from './components/LongFormShowreel';
import { Tools } from './components/Tools';
import { Testimonials } from './components/Testimonials';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { StickyCTA } from './components/StickyCTA';
import { BTS } from './components/BTS';
import { CaseStudies } from './components/CaseStudies';
import { LeadMagnet } from './components/LeadMagnet';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Sync loading state with the preloader duration + animation buffer
  useEffect(() => {
    // 2000ms count + 200ms pause + 800ms curtain transition buffer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      
      {/* The Preloader now handles its own exit animation visually, but we keep it in DOM until complete */}
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>

      <motion.div
        className="relative w-full bg-black min-h-screen selection:bg-white selection:text-black"
      >
        <Navbar />
        <StickyCTA />
        <main>
          {/* 1. The Hook */}
          <Hero />
          
          {/* 3. The New Premium Showreel */}
          <PremiumShowreel />

          {/* 3.1 Long Form Narrative Showcase */}
          <LongFormShowreel />

          {/* 4. The Breakdown (BTS) */}
          <BTS />
          
          {/* 5. The Strategy (Case Studies) */}
          <CaseStudies />
          
          {/* 6. The Workflow Architecture */}
          <Process />

          {/* 7. The Expertise (Specific Services) */}
          <Services />
          
          {/* 9. The Lead Magnet */}
          <LeadMagnet />
          
          {/* 10. The Connection (The Architect) */}
          <About />

          {/* 11. Social Proof (Restored) */}
          <Testimonials />
          
          {/* 12. The Arsenal (Tech Stack) */}
          <Tools />
        </main>
        
        {/* 13. The Action */}
        <Footer />
      </motion.div>
    </>
  );
}
