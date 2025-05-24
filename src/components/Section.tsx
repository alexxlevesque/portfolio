'use client';

import { useEffect, useRef } from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="section-card fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
} 