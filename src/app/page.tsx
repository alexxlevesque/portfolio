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
      id: 1,
      title: "Golf Analytics Machine Learning Project",
      description: "Advanced statistical analysis and machine learning model for predicting golf performance using player statistics, course conditions, and environmental factors.",
      longDescription: "This project analyzes curated professional golf performance data to identify the key factors driving low scores. By leveraging regression techniques and machine learning models, it quantifies how environmental conditions, course characteristics, and player profiles influence performance. The system implements a comprehensive modeling pipeline, starting with Ordinary Least Squares (OLS) regression as a benchmark before exploring more advanced predictive techniques.",
      purpose: "This project served as my introduction to web scraping with BeautifulSoup and advanced my knowledge in data manipulation with Pandas. It provided hands-on experience with statistical modeling and machine learning, particularly in developing domain-specific features and interpreting complex interactions between variables. The project deepened my understanding of sports analytics while teaching me essential data science skills.",
      techStack: ["Python", "Pandas", "NumPy", "scikit-learn", "BeautifulSoup", "SQLite", "Matplotlib", "Seaborn"],
      date: "Completed: July 2025",
      category: "ai",
      image: "/images/projects/golf-modeling.jpg",
      link: "https://github.com/alexxlevesque/golf-performance-modeling",
      features: [
        "Web scraping pipeline for PGA Tour statistics (2017-2025)",
        "Domain-specific feature engineering (Weather-adjusted Strokes Gained, Course Aggressiveness Score)",
        "OLS regression model with interaction terms for non-linear dynamics",
        "SQLite database for efficient data storage and retrieval",
        "Advanced visualization of player performance and course characteristics"
      ]
    },
    {
      id: 2,
      title: "Bayesian Clue Solver",
      description: "Bayesian-powered Clue game assistant for optimal gameplay through probability tracking and move suggestions.",
      longDescription: "This project implements a sophisticated Clue game assistant that leverages Bayesian reasoning and probabilistic inference to help players track game state, calculate probabilities, and make optimal suggestions. The system provides real-time probability updates for cards in the murder envelope and player hands, helping solve the mystery faster and more effectively. Inspired by probabilistic models in finance, AI, and information theory, it can consistently win Clue in fewer than 7 turns.",
      purpose: "This project served as my introduction to fundamental probability concepts and essential Python libraries like NumPy and Pandas. Through building this solver, I gained hands-on experience with Bayesian statistics while learning how to manipulate data structures and create interactive applications with Streamlit.",
      techStack: ["Python", "Streamlit", "Pandas", "NumPy", "Bayesian Inference"],
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
    },
    {
      id: 3,
      title: "Stock ML Prediction",
      description: "Machine learning model for stock price prediction using historical data and advanced algorithms.",
      longDescription: "This project develops a sophisticated machine learning model for stock price prediction, utilizing historical market data and advanced algorithms to forecast future price movements. The system incorporates multiple technical indicators and market sentiment analysis to provide comprehensive predictions.",
      purpose: "This project marked my entry into quantitative finance and algorithmic trading. Through developing this model, I gained valuable experience with financial data analysis, market indicators, and the application of machine learning in trading strategies. The project deepened my understanding of market mechanics while teaching me essential quant skills using Python libraries like scikit-learn and NumPy for financial modeling.",
      techStack: ["Python", "scikit-learn", "NumPy", "Pandas"],
      date: "Completed: Feb 2025",
      category: "finance",
      image: "/images/projects/stock-prediction.jpg",
      link: "https://github.com/alexxlevesque/stockpriceprediction-rf",
      features: [
        "Multi-factor prediction model",
        "Technical indicator integration",
        "Market sentiment analysis",
        "Performance backtesting",
        "Risk assessment metrics"
      ]
    },
    {
      id: 4,
      title: "AI Forecasting Paper",
      description: "Research paper on AI-based forecasting methods with novel approaches to time series prediction.",
      longDescription: "This research paper presents innovative approaches to time series forecasting using artificial intelligence techniques. The study compares various machine learning models and proposes novel methodologies for improving prediction accuracy in complex time series data.",
      purpose: "This research project allowed me to explore the intersection of AI and time series analysis, developing new methodologies for forecasting complex data patterns. Through this work, I gained expertise in statistical validation and the practical application of machine learning models in real-world scenarios.",
      techStack: ["Python", "scikit-learn", "LaTeX"],
      date: "Completed: Mar 2025",
      category: "ai",
      image: "/images/projects/forecasting-paper.jpg",
      link: "https://medium.com/qmind-ai/transforming-market-predictions-with-machine-learning-and-random-forests-36e1d550da60",
      features: [
        "Novel forecasting methodology",
        "Comparative model analysis",
        "Statistical validation framework",
        "Visualization of results",
        "Implementation guidelines"
      ]
    },
    {
      id: 5,
      title: "Automated Water Treatment System",
      description: "Developed an automated water treatment system using Arduino IDE with 3D-printed components and turbidity sensors for water quality monitoring.",
      longDescription: "Co-designed and implemented an innovative automated water treatment system utilizing Arduino IDE. The system features a custom 3D-printed powder dispenser and integrated turbidity sensors for real-time water quality monitoring. Through automated quality control and precise dispensing mechanisms, the system successfully improved water purity by 50%.",
      purpose: "This project demonstrated the practical application of embedded systems in environmental solutions. It provided hands-on experience with hardware integration, sensor calibration, and the development of automated control systems. The project strengthened my understanding of both software and hardware components in real-world applications.",
      techStack: ["Arduino IDE", "C++", "3D Printing", "Sensors", "CAD"],
      date: "2023",
      category: "hardware",
      features: [
        "Real-time water quality monitoring system",
        "3D-printed powder dispenser for treatment chemicals",
        "Turbidity sensor integration",
        "Automated quality control system",
        "50% improvement in water purity metrics"
      ],
      image: "/images/projects/arduino-water-treatment.jpg"
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
                        <div className="flex gap-2">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-navy-800 hover:bg-navy-900 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {project.link.includes('github.com') ? (
                                <>
                                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                  </svg>
                                  GitHub
                                </>
                              ) : project.link.includes('medium.com') ? (
                                <>
                                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 .38-.16.85-.44 1.09l-5.08 5.02h-.08c-.15 0-.3-.07-.3-.2v-3.5l.12-.97.03-.14.03-.15.02-.14.02-.15.01-.14.01-.15V8.2c0-.13.15-.2.3-.2h.08l5.08 5.02c.28.24.44.71.44 1.09zm-8.56-1.5v3.5c0 .13-.15.2-.3.2h-.08l-5.08-5.02c-.28-.24-.44-.71-.44-1.09 0-.38.16-.85.44-1.09l5.08-5.02h.08c.15 0 .3.07.3.2v3.5l-.12.97-.03.14-.03.15-.02.14-.02.15-.01.14-.01.15z"/>
                                  </svg>
                                  Medium
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  View
                                </>
                              )}
                            </a>
                          )}
                          <button
                            onClick={() => handleProjectClick(project.id)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-500 ease-in-out"
                          >
                            Details →
                          </button>
                        </div>
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
