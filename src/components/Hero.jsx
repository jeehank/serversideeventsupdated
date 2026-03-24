import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FuzzyText from './FuzzyText';
import ScrollVelocity from './ScrollVelocity';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const imagesWrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const heroContentRef = useRef(null);
  
  const canvasRef = useRef(null);
  const frameCount = 148;
  const videoImages = useRef([]);
  const frameRef = useRef({ frame: 0 });
  
  const cursor = useRef({ x: 0, y: 0 });
  const laggedCursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    cursor.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    laggedCursor.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const render = () => {
      laggedCursor.current.x += (cursor.current.x - laggedCursor.current.x) * 0.12;
      laggedCursor.current.y += (cursor.current.y - laggedCursor.current.y) * 0.12;
      
      const dx = cursor.current.x - laggedCursor.current.x;
      const dy = cursor.current.y - laggedCursor.current.y;

      if (revealRef.current) {
        revealRef.current.style.setProperty('--x', `${laggedCursor.current.x}px`);
        revealRef.current.style.setProperty('--y', `${laggedCursor.current.y}px`);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imgArray = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      imgArray.push(img);
    }
    videoImages.current = imgArray;

    const renderVideo = () => {
      const currentFrame = Math.round(frameRef.current.frame);
      const img = videoImages.current[currentFrame];
      if (img && img.complete) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let finalWidth, finalHeight, offsetX, offsetY;
        if (canvasRatio > imgRatio) {
            finalWidth = canvas.width;
            finalHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - finalHeight) / 2;
        } else {
            finalWidth = canvas.height * imgRatio;
            finalHeight = canvas.height;
            offsetX = (canvas.width - finalWidth) / 2;
            offsetY = 0;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, finalWidth, finalHeight);
      }
    };

    videoImages.current[0].onload = renderVideo;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderVideo();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=350%", 
        pin: true,
        scrub: 1, 
      }
    });

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const currentFrame = Math.round(frameRef.current.frame);
      const img = videoImages.current[currentFrame];
      if (img && img.complete) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let fw, fh, ox, oy;
        if (canvasRatio > imgRatio) {
            fw = canvas.width; fh = canvas.width / imgRatio;
            ox = 0; oy = (canvas.height - fh) / 2;
        } else {
            fw = canvas.height * imgRatio; fh = canvas.height;
            ox = (canvas.width - fw) / 2; oy = 0;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, ox, oy, fw, fh);
      }
    };

    
    tl.to(frameRef.current, {
      frame: frameCount - 1,
      snap: "frame",
      duration: 2,
      ease: "none",
      onUpdate: () => {
        if (videoImages.current[Math.round(frameRef.current.frame)]?.complete) {
            render();
        }
      }
    }, 0);

    tl.to(canvasRef.current, {
      opacity: 0,
      duration: 0.2
    }, 2); 

    const offset = 2.2; 

    
    tl.to(heroContentRef.current, { opacity: 0, y: -50, duration: 0.2 }, offset + 0);

    
    tl.to(imagesWrapperRef.current, { scale: 0.4, borderRadius: "2rem", duration: 1, ease: "power2.inOut" }, offset + 0);
    tl.to('.hero-img', { scale: 1.2, duration: 1, ease: "power2.inOut" }, offset + 0);

    
    tl.to(revealRef.current, { opacity: 0, duration: 0.8 }, offset + 0.2);

    
    tl.fromTo(giantTextRef.current, { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }, offset + 0.2);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="hero-section section">
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 50, 
          backgroundColor: '#000',
          pointerEvents: 'none' 
        }} 
      />
      <div className="hero-atmosphere"></div>



      
      <div ref={giantTextRef} className="giant-bg-text-wrapper">
        <ScrollVelocity
          texts={['X-CELSIOR', 'X-CELSIOR']}
          velocity={100}
          className="giant-scroll-text"
        />
        <ScrollVelocity
          texts={['X-CELSIOR', 'X-CELSIOR']}
          velocity={-100}
          className="giant-scroll-text"
        />
      </div>

      
      <div ref={imagesWrapperRef} className="hero-images-wrapper">
        <div className="hero-image-container base-layer">
          <img src="/xcelsior1.png" alt="X-Celsior Base" className="hero-img" />
        </div>

        <div ref={revealRef} className="hero-image-container reveal-layer">
          <img src="/xcelsior2.png" alt="X-Celsior Reveal" className="hero-img" />
        </div>
      </div>

      <div ref={heroContentRef} className="hero-content">
        <h1 className="hero-title">
          <FuzzyText 
            baseIntensity={0.2} 
            hoverIntensity={0.4} 
            enableHover={true}
            gradient={['#88ccff', '#2266cc', '#003388']}
            fontSize="clamp(4rem, 8vw, 10rem)"
          >
            X-CELSIOR’26
          </FuzzyText>
        </h1>
        <p className="hero-subtitle">The 2nd Edition of Kolkata’s Biggest School Tech Fest</p>
      </div>
    </section>
  );
}
