'use client';

import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if the cursor is over a clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', () => setIsVisible(true));
    
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', () => setIsVisible(true));
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        a, button, [role="button"], [class*="cursor-pointer"] {
          cursor: none !important;
        }
      `}</style>
      {/* Main cursor */}
      <div 
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`
          rounded-full bg-white border-2 border-gray-400 transition-all duration-100
          shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] dark:shadow-[0_0_10px_3px_rgba(255,255,255,0.2)]
          ${isPointer ? 'w-5 h-5 scale-105' : 'w-4 h-4'}
        `} />
      </div>
    </>
  );
};

export default CustomCursor; 