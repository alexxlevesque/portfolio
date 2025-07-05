'use client';

import Section from '@/components/Section';
import BottomNavigation from '@/components/BottomNavigation';

export default function Experience() {
  const experiences = [
    {
      id: 1,
      title: "AI Research & Cloud Engineering Intern",
      company: "Government of Canada - Immigration and Refugee Board",
      period: "May 2025 - August 2025",
      description: "Conducting AI research and cloud engineering work for the Immigration and Refugee Board of Canada.",
      technologies: ["AI/ML", "Cloud Computing", "Research"],
      achievements: [
        "Developed a Microsoft Power Automate workflow to transcribe and classify refugee Basis of Claim documents, achieving 93% accuracy and significantly reducing manual processing time.",
        "Trained a custom AI translation model in Microsoft Azure, fine-tuned for bilingual and legal contexts to support accurate, domain-specific communication in judicial workflows.",
        "Designed and deployed cloud-based Microsoft CoPilots to assist government board members with task-specific automation, improving daily operational efficiency."
      ]
    },
    {
      id: 2,
      title: "LLM Research Member",
      company: "Algoverse AI Research",
      period: "June 2025 - September 2025",
      description: "Conducting LLM research under the supervision of PhD mentors and industry researchers for the Algoverse AI Research team.",
      technologies: ["AI/ML", "Research Paper Writing", "LLM Research"],
      achievements: [
        "Conducted independent AI Research in a 12-week program led by PhDs from Meta, UCSD, and Cornell, combining weekly lectures with personalized mentorship.",
        "Co-authored a research paper aimed at submission to top-tier AI conferences such as NeurIPS, ACL, and ICML, focusing on novel research in LLMs.",
        "Collaborated in a 3-4 member research team to scope a research question, implement models in Python, and present findings in a publication-ready format."
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