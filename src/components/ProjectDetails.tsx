'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ProjectDetailsProps {
  project: {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    status: string;
    date: string;
    category: string;
    color: string;
    image: string;
    longDescription?: string;
    features?: string[];
    challenges?: string[];
    solutions?: string[];
    githubLink?: string;
    demoLink?: string;
  };
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function ProjectDetails({ project, onClose, onNext, onPrevious }: ProjectDetailsProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-navy-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-navy-200 dark:border-navy-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 dark:text-blue-100">{project.title}</h2>
              <p className="text-sm text-navy-600 dark:text-blue-300 mt-1">{project.date}</p>
            </div>
            <button
              onClick={onClose}
              className="text-navy-500 hover:text-navy-700 dark:text-blue-400 dark:hover:text-blue-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Project Image */}
        <div className="relative w-full h-64 sm:h-96">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-navy-900 dark:text-blue-100 mb-2">Overview</h3>
            <p className="text-navy-700 dark:text-blue-200">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Features */}
          {project.features && (
            <div>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-blue-100 mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-navy-700 dark:text-blue-200">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges & Solutions */}
          {project.challenges && project.solutions && (
            <div>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-blue-100 mb-2">Challenges & Solutions</h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="bg-navy-50 dark:bg-navy-700 rounded-lg p-4">
                    <p className="font-medium text-navy-900 dark:text-blue-100 mb-2">Challenge:</p>
                    <p className="text-navy-700 dark:text-blue-200 mb-2">{challenge}</p>
                    <p className="font-medium text-navy-900 dark:text-blue-100 mb-2">Solution:</p>
                    <p className="text-navy-700 dark:text-blue-200">
                      {project.solutions && index < project.solutions.length ? project.solutions[index] : 'No solution provided'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-navy-900 dark:text-blue-100 mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-navy-800 hover:bg-navy-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-navy-200 dark:border-navy-700 flex justify-between">
          <button
            onClick={onPrevious}
            disabled={!onPrevious}
            className="px-4 py-2 text-sm font-medium text-navy-700 dark:text-blue-200 hover:text-navy-900 dark:hover:text-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous Project
          </button>
          <button
            onClick={onNext}
            disabled={!onNext}
            className="px-4 py-2 text-sm font-medium text-navy-700 dark:text-blue-200 hover:text-navy-900 dark:hover:text-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Project →
          </button>
        </div>
      </div>
    </div>
  );
} 