import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Countdown.css';

gsap.registerPlugin(ScrollTrigger);

const TARGET_DATE = new Date('April 24, 2026 00:00:00').getTime();

export default function Countdown() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.reveal-char');
      
      gsap.fromTo(chars, 
        { opacity: 0, transform: 'translateY(50%)' },
        { 
          opacity: 1, 
          transform: 'translateY(0%)',
          stagger: 0.02,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          }
        }
      );
    }
  }, []);

  return (
    <section id="countdown" className="countdown-section" ref={sectionRef}>
      <div className="countdown-container">
        <div className="timer-wrapper">
          <div className="time-block">
            <span className="time-value glitch" data-text={timeLeft.days.toString().padStart(2, '0')}>{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="time-label">DAYS</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-block">
            <span className="time-value glitch" data-text={timeLeft.hours.toString().padStart(2, '0')}>{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="time-label">HOURS</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-block">
            <span className="time-value glitch" data-text={timeLeft.minutes.toString().padStart(2, '0')}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="time-label">MINUTES</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-block">
            <span className="time-value glitch" data-text={timeLeft.seconds.toString().padStart(2, '0')}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="time-label">SECONDS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
