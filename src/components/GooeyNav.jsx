"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import './GooeyNav.css';

const GooeyNav = ({
  items,
  initialActiveIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const indicatorRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    
    const currentIndex = items.findIndex(item => item.href === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [pathname, items]);

  useEffect(() => {
    if (!containerRef.current || !indicatorRef.current) return;

    const itemsNodes = containerRef.current.querySelectorAll('.nav-item');
    if (itemsNodes[activeIndex]) {
      const activeNode = itemsNodes[activeIndex];
      const rect = activeNode.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const left = rect.left - containerRect.left;
      const width = rect.width;

      gsap.to(indicatorRef.current, {
        x: left,
        width: width,
        duration: 0.6,
        ease: 'elastic.out(1, 0.7)',
      });
    }
  }, [activeIndex]);

  const handleItemClick = (index, href) => {
    setActiveIndex(index);
    router.push(href);
  };

  return (
    <div className="gooey-nav-container">
      <nav className="gooey-nav" ref={containerRef}>
        <div className="nav-items-wrapper">
          <div className="nav-indicator" ref={indicatorRef}></div>

          {items.map((item, index) => (
            <button
              key={index}
              className={`nav-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleItemClick(index, item.href)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      
      <div className="nav-right">
        <button className="nav-registration-btn" onClick={() => router.push('/register')}>
          Register Now
        </button>
      </div>
    </div>
  );
};

export default GooeyNav;

