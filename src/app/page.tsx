'use client';

import Section from '@/components/Section';
import TechStackBadge from '@/components/TechStackBadge';
import ProjectDetails from '@/components/ProjectDetails';
import BottomNavigation from '@/components/BottomNavigation';
import CustomCursor from '@/components/CustomCursor';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isWaving, setIsWaving] = useState(false);

  const projects = [
    {
      id: 7,
      title: "Bayesian Clue Solver",
      description: "A sophisticated Clue game assistant that uses Bayesian reasoning and probabilistic inference to help players track game state, calculate probabilities, and make optimal suggestions.",
      longDescription: "This project implements a sophisticated Clue game assistant that leverages Bayesian reasoning and probabilistic inference to help players track game state, calculate probabilities, and make optimal suggestions. The system provides real-time probability updates for cards in the murder envelope and player hands, helping solve the mystery faster and more effectively. Inspired by probabilistic models in finance, AI, and information theory, it can consistently win Clue in fewer than 7 turns.",
      techStack: ["Python", "Streamlit", "Pandas", "NumPy", "Bayesian Inference"],
      date: "2024",
      category: "ai",
      color: "purple",
      image: "/images/projects/clue-solver.jpg",
      features: [
        "Real-time probability updates for envelope and player cards",
        "Bayesian inference engine for optimal move suggestions",
        "Interactive Streamlit UI for game state tracking",
        "Consistent wins in fewer than 7 turns",
        "Separate probability distributions for suspects, weapons, and rooms"
      ],
      challenges: [
        "Implementing complex Bayesian update rules",
        "Maintaining accurate probability distributions",
        "Designing an intuitive user interface"
      ],
      solutions: [
        "Developed sophisticated probability normalization algorithms",
        "Created modular engine architecture for state management",
        "Built interactive Streamlit UI for real-time updates"
      ]
    },
    {
      id: 4,
      title: "Stock ML Prediction",
      description: "Machine learning model for stock price prediction using historical data and advanced algorithms.",
      longDescription: "This project develops a sophisticated machine learning model for stock price prediction, utilizing historical market data and advanced algorithms to forecast future price movements. The system incorporates multiple technical indicators and market sentiment analysis to provide comprehensive predictions.",
      techStack: ["Python", "scikit-learn", "NumPy", "Pandas"],
      date: "Completed: Feb 2025",
      category: "finance",
      color: "green",
      image: "/images/projects/stock-prediction.jpg",
      features: [
        "Multi-factor prediction model",
        "Technical indicator integration",
        "Market sentiment analysis",
        "Performance backtesting",
        "Risk assessment metrics"
      ],
      challenges: [
        "Handling market volatility and regime changes",
        "Incorporating real-time market data"
      ],
      solutions: [
        "Implemented adaptive learning rates",
        "Developed efficient data streaming pipeline"
      ]
    },
    {
      id: 5,
      title: "AI Forecasting Paper",
      description: "Research paper on AI-based forecasting methods with novel approaches to time series prediction.",
      longDescription: "This research paper presents innovative approaches to time series forecasting using artificial intelligence techniques. The study compares various machine learning models and proposes novel methodologies for improving prediction accuracy in complex time series data.",
      techStack: ["Python", "scikit-learn", "LaTeX"],
      date: "Completed: Mar 2025",
      category: "ai",
      color: "orange",
      image: "/images/projects/forecasting-paper.jpg",
      features: [
        "Novel forecasting methodology",
        "Comparative model analysis",
        "Statistical validation framework",
        "Visualization of results",
        "Implementation guidelines"
      ],
      challenges: [
        "Ensuring statistical significance of results",
        "Making complex concepts accessible"
      ],
      solutions: [
        "Developed comprehensive statistical tests",
        "Created clear visual explanations"
      ]
    },
    {
      id: 6,
      title: "Automated Water Treatment System",
      description: "Developed an automated water treatment system using Arduino IDE with 3D-printed components and turbidity sensors for water quality monitoring.",
      longDescription: "Co-designed and implemented an innovative automated water treatment system utilizing Arduino IDE. The system features a custom 3D-printed powder dispenser and integrated turbidity sensors for real-time water quality monitoring. Through automated quality control and precise dispensing mechanisms, the system successfully improved water purity by 50%. This project demonstrates practical application of embedded systems in environmental solutions.",
      techStack: ["Arduino IDE", "C++", "3D Printing", "Sensors", "CAD"],
      date: "2023",
      category: "hardware",
      color: "blue",
      features: [
        "Real-time water quality monitoring system",
        "3D-printed powder dispenser for treatment chemicals",
        "Turbidity sensor integration",
        "Automated quality control system",
        "50% improvement in water purity metrics"
      ],
      challenges: [
        "Calibrating sensors for accurate turbidity readings",
        "Designing a reliable powder dispensing mechanism",
        "Integrating multiple system components"
      ],
      solutions: [
        "Implemented sensor calibration algorithms",
        "Created custom 3D-printed components for precise dispensing",
        "Developed modular code architecture for system integration"
      ],
      image: "/images/projects/arduino-water-treatment.jpg",
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'ai', name: 'Artificial Intelligence', count: projects.filter(p => p.category === 'ai').length },
    { id: 'finance', name: 'Finance', count: projects.filter(p => p.category === 'finance').length },
    { id: 'hardware', name: 'Hardware', count: projects.filter(p => p.category === 'hardware').length }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    if (selectedProject === null) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject);
    if (currentIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentIndex + 1].id);
    }
  };

  const handlePreviousProject = () => {
    if (selectedProject === null) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject);
    if (currentIndex > 0) {
      setSelectedProject(filteredProjects[currentIndex - 1].id);
    }
  };

  const selectedProjectData = selectedProject ? projects.find(p => p.id === selectedProject) : null;

  return (
    <>
      <CustomCursor />
      <main className="min-h-screen pb-20">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-navy-900 dark:text-white mb-4">
              Hi, I'm Alex <span 
                className={`inline-block cursor-pointer transition-transform duration-300 ${isWaving ? 'animate-wave' : ''}`}
                onMouseEnter={() => setIsWaving(true)}
                onAnimationEnd={() => setIsWaving(false)}
              >👋</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl text-navy-700 dark:text-gray-300 mb-8">
              Applied Math & Computer Engineering @ Queen's University
            </h2>
            <ul className="space-y-3 text-lg text-navy-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <span>• </span>
                <span className="font-medium">researching AI applications in business intelligence</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>• </span>
                <a href="#projects" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">building software & AI-powered financial solutions</a>
              </li>
              <li className="flex items-center space-x-2">
                <span>• </span>
                <span className="font-medium">exploring machine learning, engineering, and quantitative finance</span>
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
                  Relevant Coursework: Software Engineering, Data Structures, Algorithms
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <div id="projects">
          <Section title="Projects">
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-500 ease-in-out"
                  />
                  <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-navy-400 transition-colors duration-500 ease-in-out"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Project Categories */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ease-in-out ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-blue-200 hover:bg-navy-200 dark:hover:bg-navy-700'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map(project => (
                  <div
                    key={project.id}
                    className="group relative bg-white dark:bg-navy-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-navy-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ease-in-out" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-navy-900 dark:text-blue-100 mb-2 transition-colors duration-500 ease-in-out">{project.title}</h3>
                      <p className="text-navy-700 dark:text-blue-200 mb-4 transition-colors duration-500 ease-in-out">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map(tech => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded transition-colors duration-500 ease-in-out"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-navy-600 dark:text-blue-300 transition-colors duration-500 ease-in-out">{project.date}</span>
                        <button
                          onClick={() => handleProjectClick(project.id)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-500 ease-in-out"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* Project Details Modal */}
        {selectedProjectData && (
          <ProjectDetails
            project={selectedProjectData}
            onClose={handleCloseModal}
            onNext={handleNextProject}
            onPrevious={handlePreviousProject}
          />
        )}

        {/* Extracurriculars Section */}
        <Section title="Extracurriculars">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-blue-100 transition-colors duration-500 ease-in-out">Music Business</h3>
              <p className="text-navy-700 dark:text-blue-200 transition-colors duration-500 ease-in-out">Grammy-winning music production and business ventures</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-blue-100 transition-colors duration-500 ease-in-out">Queen's AI Club</h3>
              <p className="text-navy-700 dark:text-blue-200 transition-colors duration-500 ease-in-out">Active member and contributor to the university's AI community</p>
            </div>
          </div>
        </Section>

        {/* Skills & Interests Section */}
        <div id="skills">
          <Section title="Skills & Interests">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 justify-items-center">
              <TechStackBadge 
                name="Python" 
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                color="bg-blue-100 dark:bg-blue-900"
              />
              <TechStackBadge 
                name="C" 
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
                color="bg-gray-100 dark:bg-gray-800"
              />
              <TechStackBadge 
                name="C++" 
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
                color="bg-blue-100 dark:bg-blue-900"
              />
              <TechStackBadge 
                name="Git" 
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                color="bg-red-100 dark:bg-red-900"
              />
              <TechStackBadge 
                name="Pandas" 
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"
                color="bg-blue-100 dark:bg-blue-900"
              />
              <TechStackBadge 
                name="NumPy" 
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg"
                color="bg-blue-100 dark:bg-blue-900"
              />
              <TechStackBadge 
                name="Matplotlib" 
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg"
                color="bg-blue-100 dark:bg-blue-900"
              />
            </div>
          </Section>
        </div>

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
          </div>
        </section>
      </main>

      <BottomNavigation />
    </>
  );
}
