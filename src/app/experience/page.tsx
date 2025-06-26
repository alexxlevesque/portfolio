'use client';

import Section from '@/components/Section';
import BottomNavigation from '@/components/BottomNavigation';

export default function Experience() {
  const experiences = [
    {
      id: 1,
      title: "AI Research & Cloud Engineering",
      company: "Government of Canada - Immigration and Refugee Board",
      period: "2024 - Present",
      description: "Conducting AI research and cloud engineering work for the Canadian government.",
      technologies: ["AI/ML", "Cloud Computing", "Research"],
      achievements: [
        "Placeholder achievement 1",
        "Placeholder achievement 2",
        "Placeholder achievement 3"
      ]
    },
    // Add more experiences as needed
  ];

  return (
    <>
      <main className="min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-8 text-center">
            Experience
          </h1>
          
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-navy-200 dark:bg-navy-700"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow bg-white dark:bg-navy-800 rounded-lg p-6 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-navy-900 dark:text-blue-100">
                        {experience.title}
                      </h3>
                      <span className="text-sm text-navy-600 dark:text-blue-300 mt-1 sm:mt-0">
                        {experience.period}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                      {experience.company}
                    </h4>
                    
                    <p className="text-navy-700 dark:text-blue-200 mb-4">
                      {experience.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <ul className="list-disc list-inside space-y-1 text-navy-700 dark:text-blue-200">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNavigation />
    </>
  );
} 