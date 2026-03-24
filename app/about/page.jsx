"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Footer from '../../src/components/Footer';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const aboutRef = useRef(null);

  useGSAP(() => {
    const animConfig = {
      duration: 1.8,
      ease: 'expo.out',
    };

    
    gsap.fromTo('.school-bio', 
      { opacity: 0, x: -100, y: 30 },
      {
        opacity: 1, x: 0, y: 0, ...animConfig,
        scrollTrigger: { trigger: '.about-school', start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo('.school-pic', 
      { opacity: 0, x: 100, y: 30 },
      {
        opacity: 1, x: 0, y: 0, ...animConfig,
        scrollTrigger: { trigger: '.about-school', start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );

    
    gsap.fromTo('.father-pic', 
      { opacity: 0, x: -100, y: 30 },
      {
        opacity: 1, x: 0, y: 0, ...animConfig,
        scrollTrigger: { trigger: '.about-father', start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo('.father-address', 
      { opacity: 0, x: 100, y: 30 },
      {
        opacity: 1, x: 0, y: 0, ...animConfig,
        scrollTrigger: { trigger: '.about-father', start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );

    
    gsap.fromTo('.festival-bio', 
      { opacity: 0, x: -100, y: 30 },
      {
        opacity: 1, x: 0, y: 0, ...animConfig,
        scrollTrigger: { trigger: '.about-festival', start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo('.festival-logo', 
      { opacity: 0, x: 100, y: 30 },
      {
        opacity: 1, x: 0, y: 0, ...animConfig,
        scrollTrigger: { trigger: '.about-festival', start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
  }, { scope: aboutRef });

  return (
    <div className="about-page">
      <section ref={aboutRef} className="about-section section" style={{ minHeight: 'auto', paddingTop: '15vh', paddingBottom: '15vh' }}>
        <div className="about-content" style={{ marginTop: '5vh' }}>
          
          <div className="about-school about-row">
            <div className="school-bio">
              <h3>About Our School</h3>
              <p>St.Xavier's Collegiate School stands as a beacon of academic excellence and holistic development. Since our establishment, we have been committed to nurturing young minds and fostering an environment where students can explore their passions and talents.</p>
              <p>Our school believes in the motto "Nihil Ultra" - Nothing Beyond, which encourages our students to strive for excellence in all endeavors. We provide a platform where academic rigor meets creative expression through our diverse range of clubs and extracurricular activities.</p>
              <p>Through X-CLUBS, we offer students opportunities to engage in various fields - from technology and science to arts and social service. Each club is designed to enhance specific skills while promoting teamwork, leadership, and innovation.</p>
              <p>Under the guidance of our esteemed faculty and the leadership of our Principal, we continue to shape future leaders who will make meaningful contributions to society.</p>
            </div>
            <img src="/school.png" alt="School" className="school-pic" />
          </div>

          <div className="about-father about-row">
            <img src="/father.png" alt="Father" className="father-pic" />
            <div className="father-address">
              <h3>Principal's Address</h3>
              <p>"Education is not just about academic excellence, but about nurturing the complete personality of each student. Through our diverse club activities, we aim to develop not just scholars, but well-rounded individuals ready to contribute meaningfully to society."</p>
              <p>- Fr. Roshan Tirkey, Principal</p>
            </div>
          </div>

          <div className="about-festival about-row">
            <div className="festival-bio">
              <h3>About X-CELSIOR '25</h3>
              <p>St. Xavier’s Collegiate School takes immense pride in presenting the 19th edition of its technological festival, X-Celsior ’25. With a remarkable history and an exceptional track record, we invite you to witness the fusion of innovation, creativity, and intellect as we celebrate this prestigious event.</p>
              <p>X-Celsior has consistently grown bigger and better with each passing year, encouraging technological excellence, problem-solving, and ideas that extend far beyond the classroom. As a fest like no other, X-Celsior has established itself as one of the most prominent school tech fests in East India, bringing together brilliant young minds to explore the limitless possibilities of technology.</p>
              <p>X-Celsior ’25 proudly carries forward the rich Xaverian legacy of excellence, and promises to be yet another landmark celebration of innovation and ingenuity.</p>
            </div>
            <img src="/xcelsiorlogo.png" alt="X-Celsior Logo" className="festival-logo" />
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}
