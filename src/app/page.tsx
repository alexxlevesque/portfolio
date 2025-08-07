'use client';

import Section from '@/components/Section';
import TechStackBadge from '@/components/TechStackBadge';
import ProjectDetails from '@/components/ProjectDetails';
import BottomNavigation from '@/components/BottomNavigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isWaving, setIsWaving] = useState(false);

  // Featured project (your best/most recent project)
  const featuredProject = {
    id: 2,
    title: "Clue Game Strategy Optimization",
    description: "Bayesian-powered Clue game assistant for optimal gameplay through probability tracking and move suggestions.",
    longDescription: "This project implements a sophisticated Clue game assistant that leverages Bayesian reasoning and probabilistic inference to help players track game state, calculate probabilities, and make optimal suggestions. The system provides real-time probability updates for cards in the murder envelope and player hands, helping solve the mystery faster and more effectively. Inspired by probabilistic models in finance, AI, and information theory, it can consistently win Clue in fewer than 7 turns.",
    purpose: "This project served as my introduction to fundamental probability concepts and essential Python libraries like NumPy and Pandas. Through building this solver, I gained hands-on experience with Bayesian statistics while learning how to manipulate data structures and create interactive applications with Streamlit.",
    techStack: ["Python", "Pandas", "NumPy", "Bayesian Inference"],
    date: "Completed: May 2025",
    category: "ai",
    image: "/images/projects/clue-solver.jpg",
    link: "https://github.com/alexxlevesque/cluegamesolver",
    features: [
      "Real-time probability updates for envelope and player cards",
      "Bayesian inference engine for optimal move suggestions",
      "Interactive Streamlit UI for game state tracking",
      "Consistent wins in fewer than 7 turns",
      "Separate probability distributions for suspects, weapons, and rooms"
    ]
  };

  const handleProjectClick = () => {
    setSelectedProject(featuredProject.id);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <main className="min-h-screen pb-20">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-navy-900 dark:text-white mb-4">
              Alex Levesque
            </h1>
            <h2 className="text-2xl sm:text-3xl text-navy-700 dark:text-gray-300 mb-8">
              Applied Math & Computer Engineering @ Queen's University
            </h2>
            <ul className="space-y-3 text-lg text-navy-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <span>• </span>
                <span className="font-medium">machine learning</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>• </span>
                <span className="font-medium">engineering</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>• </span>
                <span className="font-medium">quantitative finance</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>• </span>
                <span className="font-medium">GRAMMY award-winning music producer</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Profile Picture */}
        <div className="flex justify-center -mt-24 sm:-mt-32 md:-mt-48 mb-8 sm:mb-12">
          <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full overflow-hidden border-4 border-navy-200 dark:border-navy-700 shadow-lg transition-all duration-500 ease-in-out">
            <Image
              src="/images/profile/headshot.JPG"
              alt="Alex Levesque"
              fill
              sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 480px"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Education Section */}
        <Section title="Education">
          <div className="space-y-4">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-navy-200 dark:border-navy-700">
                  <Image
                    src="/images/queens-logo.jpg"
                    alt="Queen's University Logo"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-navy-900 dark:text-blue-100 transition-colors duration-500 ease-in-out">
                  <a 
                    href="https://www.queensu.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Queen's University
                  </a>
                </h3>
                <p className="text-navy-700 dark:text-blue-200 transition-colors duration-500 ease-in-out">
                  <a 
                    href="https://www.queensu.ca/mathstat/undergraduate/prospective-undergraduate/mthe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Bachelor of Applied Science - Applied Mathematics and Computer Engineering
                  </a>
                </p>
                <p className="text-navy-600 dark:text-blue-300 text-sm transition-colors duration-500 ease-in-out">
                  Relevant Coursework: C++, probability/stochastics, mathematical finance, and computer science
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Featured Project Section */}
        <Section title="Featured Project">
          <div className="max-w-4xl mx-auto">
            <div className="group relative bg-white dark:bg-navy-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-navy-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ease-in-out" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-navy-900 dark:text-blue-100 mb-2 transition-colors duration-500 ease-in-out">
                  {featuredProject.title}
                </h3>
                <p className="text-navy-700 dark:text-blue-200 mb-4 transition-colors duration-500 ease-in-out">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredProject.techStack.slice(0, 4).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded transition-colors duration-500 ease-in-out"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-navy-600 dark:text-blue-300 transition-colors duration-500 ease-in-out">
                    {featuredProject.date}
                  </span>
                  <div className="flex gap-2">
                    {featuredProject.link && (
                      <a
                        href={featuredProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-navy-800 hover:bg-navy-900 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    <button
                      onClick={handleProjectClick}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-500 ease-in-out"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link
                href="/projects"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                View All Projects →
              </Link>
            </div>
          </div>
        </Section>
        {/* Contact Section */}
        <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">Feel free to reach out to me!</h2>
            <p className="text-navy-600 dark:text-gray-400 mb-6">
              Connect and message me on{' '}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline"
              >
                LinkedIn
              </a>{' '}
              if you'd like to work on or chat about something.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/documents/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-navy-800 hover:bg-navy-900 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <path d="M14 2v6h6"/>
                  <path d="M16 13H8"/>
                  <path d="M16 17H8"/>
                  <path d="M10 9H8"/>
                </svg>
                Download Resume
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Project Details Modal */}
        {selectedProject && (
          <ProjectDetails
            project={featuredProject}
            onClose={handleCloseModal}
          />
        )}
      </main>

      <BottomNavigation />
    </>
  );
}
