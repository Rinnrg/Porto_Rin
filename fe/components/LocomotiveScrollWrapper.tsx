"use client";
import { useEffect } from 'react';

interface LocomotiveScrollWrapperProps {
  children: React.ReactNode;
}

export default function LocomotiveScrollWrapper({ children }: LocomotiveScrollWrapperProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let ease = 0.1;
    let rafId: number;
    let isScrolling = false;

    // Smooth scroll animation loop
    const smoothScroll = () => {
      currentScrollY += (targetScrollY - currentScrollY) * ease;
      
      // Only update if there's a significant difference
      if (Math.abs(targetScrollY - currentScrollY) > 0.5) {
        window.scrollTo(0, currentScrollY);
        rafId = requestAnimationFrame(smoothScroll);
      } else {
        // Snap to final position
        window.scrollTo(0, targetScrollY);
        isScrolling = false;
      }
    };

    // Start smooth scroll if not already running
    const startSmoothScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        currentScrollY = window.scrollY;
        smoothScroll();
      }
    };

    // Wheel event handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update target position
      targetScrollY += delta * 1.2;
      targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
      
      startSmoothScroll();
    };

    // Touch handlers for mobile
    let touchStartY = 0;
    let touchLastY = 0;
    let touchVelocity = 0;
    let lastTouchTime = Date.now();

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
      touchVelocity = 0;
      lastTouchTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      const touchY = e.touches[0].clientY;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTouchTime;
      const deltaY = touchLastY - touchY;
      
      // Calculate velocity for momentum
      touchVelocity = deltaTime > 0 ? deltaY / deltaTime : 0;
      touchLastY = touchY;
      lastTouchTime = currentTime;
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY += deltaY * 2;
      targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
      
      startSmoothScroll();
    };

    const handleTouchEnd = () => {
      // Add momentum based on velocity
      if (Math.abs(touchVelocity) > 0.1) {
        const momentum = touchVelocity * 200; // Momentum multiplier
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        targetScrollY += momentum;
        targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
        
        startSmoothScroll();
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      let scrollAmount = 0;
      
      switch (e.key) {
        case 'ArrowUp':
          scrollAmount = -100;
          break;
        case 'ArrowDown':
          scrollAmount = 100;
          break;
        case 'PageUp':
          scrollAmount = -window.innerHeight * 0.8;
          break;
        case 'PageDown':
          scrollAmount = window.innerHeight * 0.8;
          break;
        case 'Home':
          targetScrollY = 0;
          startSmoothScroll();
          e.preventDefault();
          return;
        case 'End':
          targetScrollY = maxScroll;
          startSmoothScroll();
          e.preventDefault();
          return;
      }
      
      if (scrollAmount !== 0) {
        e.preventDefault();
        targetScrollY += scrollAmount;
        targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
        startSmoothScroll();
      }
    };

    // Handle native scroll events (for scrollbar dragging)
    const handleScroll = () => {
      if (!isScrolling) {
        targetScrollY = window.scrollY;
        currentScrollY = window.scrollY;
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize
    targetScrollY = window.scrollY;
    currentScrollY = window.scrollY;

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return <>{children}</>;
}
