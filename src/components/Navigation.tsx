'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'resume'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-navy-900/80 border-b border-navy-200 dark:border-navy-700 transition-colors duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <a
              href="#home"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-500 ease-in-out ${
                activeSection === 'home'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-navy-500 dark:text-navy-400 hover:text-navy-900 dark:hover:text-white'
              }`}
            >
              Home
            </a>
            <a
              href="#projects"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-500 ease-in-out ${
                activeSection === 'projects'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-navy-500 dark:text-navy-400 hover:text-navy-900 dark:hover:text-white'
              }`}
            >
              Projects
            </a>
            <a
              href="#skills"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-500 ease-in-out ${
                activeSection === 'skills'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-navy-500 dark:text-navy-400 hover:text-navy-900 dark:hover:text-white'
              }`}
            >
              Skills
            </a>
            <a
              href="#resume"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-500 ease-in-out ${
                activeSection === 'resume'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-navy-500 dark:text-navy-400 hover:text-navy-900 dark:hover:text-white'
              }`}
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 