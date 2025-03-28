'use client';

import Section from '@/components/Section';
import Navigation from '@/components/Navigation';
import ThemeToggle from '@/components/ThemeToggle';
import TechStackBadge from '@/components/TechStackBadge';
import ProjectDetails from '@/components/ProjectDetails';
import Image from 'next/image';
import { useState, useMemo } from 'react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "AI-Powered Business Intelligence Dashboard",
      description: "An end-to-end business analytics tool leveraging real-time data, customer segmentation, and predictive modeling to provide strategic insights for clients.",
      longDescription: "This comprehensive business intelligence platform combines advanced analytics with intuitive visualization to help businesses make data-driven decisions. The system processes real-time data streams, performs customer segmentation, and generates predictive models to forecast business trends and opportunities.",
      techStack: ["Python", "Pandas", "scikit-learn", "XGBoost", "Streamlit"],
      status: "In Progress",
      date: "Expected: Jun 2025",
      category: "ai",
      color: "blue",
      image: "/images/projects/bi-dashboard.jpg",
      features: [
        "Real-time data processing and visualization",
        "Customer segmentation using K-means clustering",
        "Predictive modeling for business trends",
        "Interactive dashboards with Streamlit",
        "Automated report generation"
      ],
      challenges: [
        "Handling large-scale real-time data streams efficiently",
        "Ensuring model accuracy across different business sectors"
      ],
      solutions: [
        "Implemented efficient data processing pipelines using Pandas and NumPy",
        "Developed sector-specific model validation and tuning procedures"
      ]
    },
    {
      id: 2,
      title: "Bayesian Clue Solver & Strategy Engine",
      description: "A probability-driven engine that models the game of Clue using Bayesian inference, simulation, and AI to optimize gameplay strategy.",
      longDescription: "This innovative project applies Bayesian probability theory to the classic board game Clue, creating an AI-powered strategy engine that helps players make optimal decisions. The system uses historical game data and real-time information to calculate probabilities and suggest the most effective moves.",
      techStack: ["Python", "NumPy", "Pandas", "Bayesian"],
      status: "In Progress",
      date: "Expected: Jul 2025",
      category: "ai",
      color: "purple",
      image: "/images/projects/clue-solver.jpg",
      features: [
        "Real-time probability calculations",
        "Strategy optimization using Bayesian inference",
        "Game state simulation and prediction",
        "Interactive command-line interface",
        "Performance analytics dashboard"
      ],
      challenges: [
        "Managing complex probability calculations in real-time",
        "Balancing computational efficiency with accuracy"
      ],
      solutions: [
        "Implemented efficient probability update algorithms",
        "Developed caching mechanisms for frequently accessed calculations"
      ]
    },
    {
      id: 3,
      title: "Deep Learning for Options Pricing & Financial Research",
      description: "A machine learning initiative combining neural networks for pricing European options with a research paper analyzing AI's role in finance and ethical considerations.",
      longDescription: "This comprehensive project combines deep learning techniques with traditional financial models to develop a novel approach to options pricing. The research paper explores the implications of AI in financial markets and addresses key ethical considerations in algorithmic trading.",
      techStack: ["Python", "TensorFlow", "PyTorch", "scikit-learn"],
      status: "In Progress",
      date: "Expected: Aug 2025",
      category: "finance",
      color: "indigo",
      image: "/images/projects/options-pricing.jpg",
      features: [
        "Neural network-based options pricing model",
        "Comparative analysis with traditional models",
        "Market impact analysis",
        "Ethical framework for AI in finance",
        "Interactive visualization tools"
      ],
      challenges: [
        "Achieving model accuracy comparable to traditional methods",
        "Addressing ethical concerns in AI-driven trading"
      ],
      solutions: [
        "Developed hybrid models combining ML with traditional pricing",
        "Created comprehensive ethical guidelines for AI implementation"
      ]
    },
    {
      id: 4,
      title: "Stock ML Prediction",
      description: "Machine learning model for stock price prediction using historical data and advanced algorithms.",
      longDescription: "This project develops a sophisticated machine learning model for stock price prediction, utilizing historical market data and advanced algorithms to forecast future price movements. The system incorporates multiple technical indicators and market sentiment analysis to provide comprehensive predictions.",
      techStack: ["Python", "scikit-learn", "NumPy", "Pandas"],
      status: "Completed",
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
      status: "Completed",
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
      status: "Completed",
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
      <Navigation />
      <ThemeToggle />
      <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white dark:from-navy-900 dark:to-navy-800 transition-all duration-500 ease-in-out">
        {/* Header */}
        <div id="home" className="text-center mb-16 fade-in pt-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 dark:text-blue-100 mb-4 transition-colors duration-500 ease-in-out">
            Alex Levesque
          </h1>
          <p className="text-xl text-navy-700 dark:text-blue-200 transition-colors duration-500 ease-in-out">
            Engineer, Coder, Creator
          </p>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center -mt-48 mb-12">
          <div className="relative w-[480px] h-[480px] rounded-full overflow-hidden border-4 border-navy-200 dark:border-navy-700 shadow-lg transition-all duration-500 ease-in-out">
            <Image
              src="/images/profile/headshot.jpg"
              alt="Alex Levesque"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* About Section */}
        <Section title="About">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-navy-700 dark:text-blue-200 text-lg transition-colors duration-500 ease-in-out">
              I'm Alex - an Applied Mathematics and Computer Engineering student at Queen's University with interests in engineering, artificial intelligence, and quantitative finance. Take a look at some of my projects below and feel free to reach out!
            </p>
          </div>
        </Section>

        {/* Education Section */}
        <Section title="Education">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-blue-100 transition-colors duration-500 ease-in-out">Queen's University</h3>
              <p className="text-navy-700 dark:text-blue-200 transition-colors duration-500 ease-in-out">Bachelor of Applied Science - Applied Mathematics and Computer Engineering</p>
              <p className="text-navy-600 dark:text-blue-300 text-sm transition-colors duration-500 ease-in-out">Relevant Coursework: Software Engineering, Data Structures, Algorithms</p>
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
                      <div className={`absolute top-4 right-4 px-3 py-1 ${
                        project.status === 'Completed'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      } text-sm font-medium rounded-full transition-colors duration-500 ease-in-out`}>
                        {project.status}
                      </div>
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

        {/* Connect Section */}
        <div id="resume">
          <Section title="Connect">
            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://www.dropbox.com/scl/fi/5uk5jqyb0e6vyzat8qxiz/AlexLevesque_Resume_Mar_2025.pdf?rlkey=ryhttnh1rip4qlafs6vmq5diz&dl=0" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-500 ease-in-out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  Resume
                </a>
                <a 
                  href="https://github.com/alexxlevesque" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-navy-800 hover:bg-navy-900 transition-all duration-500 ease-in-out"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/alex-levesque/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-all duration-500 ease-in-out"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="mailto:alex.levesque@queensu.ca" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-500 ease-in-out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email
                </a>
                <a 
                  href="https://www.instagram.com/prodalyx/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-500 ease-in-out"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Music
                </a>
              </div>
            </div>
          </Section>
        </div>
      </main>
    </>
  );
}
