"use client";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Hero from '../src/components/Hero';
import Countdown from '../src/components/Countdown';
import Sponsors from '../src/components/Sponsors';
import Footer from '../src/components/Footer';
import ScrollVelocity from '../src/components/ScrollVelocity';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Countdown />
      <Sponsors />

        
        <div style={{ padding: '8rem 0', background: 'transparent', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ScrollVelocity
            texts={["XCELSIOR'26 IS BACK"]}
            velocity={100}
            className="custom-scroll-text"
          />
          <ScrollVelocity
            texts={["XCELSIOR'26 IS BACK"]}
            velocity={-100}
            className="custom-scroll-text outline-text"
          />
        </div>

      <Footer />
    </div>
  );
}
