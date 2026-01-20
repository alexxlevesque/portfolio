import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
    return (
        <div className="space-y-16 max-w-5xl mx-auto">
            <header className="mb-16 text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-space_cadet tracking-tight mb-4">Projects</h1>
                <p className="text-ultra_violet font-medium italic"> Implementing my passions into reality.</p>
            </header>

            <section className="space-y-12">

                <ProjectCard
                    title="PatientAware: Context-Aware AI Platform"
                    status="CURRENT"
                    outcome="Offline-first clinical platform enabling context-aware summaries and care continuity without relying on constant cloud connectivity."
                    techStack="Backboard.ai, React, OHIP API, Thread-based storage architecture"
                    constraints="Strict data privacy compliance (PHIPA), seamless OHIP integration, persistent clinical context retention despite connectivity loss."
                    imageSrc="/patientaware.png"
                    imagePosition="top"
                    description={
                        <>
                            <p>
                                PatientAware addresses critical inefficiencies in Canada's medical system by providing physician-facing summaries that digest longitudinal patient data.
                            </p>
                            <p>
                                The system features a dashboard for continuous symptom logging and structured clinical insights, ensuring care continuity. Thread-based patient data storage allows for persistent context across appointments.
                            </p>
                        </>
                    }
                />

                <ProjectCard
                    title="Adaptive RL Ensemble Strategy"
                    status="COMPLETED"
                    outcome="Adaptive trading strategy that reduces portfolio volatility and improves risk-adjusted returns using an ensemble of reinforcement learning agents."
                    techStack="Python, PyTorch, PPO, A2C, TD3, Git"
                    constraints="Adaptive allocation across varying market regimes, effective diversification to minimize drawdown, rigorous backtesting against SPY benchmark."
                    imageSrc="/trading.png"
                    description={
                        <>
                            <p>
                                Developed at Queen's AI Club (QMIND), this project implemented an ensemble of Reinforcement Learning agents (PPO, A2C, TD3) to manage portfolio allocation adaptively.
                            </p>
                            <p>
                                The diversification framework significantly reduced volatility compared to standard benchmarks like SPY buy-and-hold, validated through extensive Sharpe ratio and drawdown analysis.
                            </p>
                        </>
                    }
                />

                <ProjectCard
                    title="Autonomous Multi-Agent Robotic Firefighting"
                    status="COMPLETED"
                    outcome="Optimized autonomous robot deployment system for wildfire containment, achieving a 30% reduction in cluster convergence time."
                    techStack="MATLAB, Lloyd's Algorithm, K-Means Clustering, GIS Spatial Analysis Tools"
                    constraints="Real-time dynamic fire hotspot data processing, accurate perimeter modeling, efficient multi-agent coordination."
                    imageSrc="/autonomousrobot.jpg"
                    description={
                        <>
                            <p>
                                This project focused on optimizing the deployment of autonomous firefighting robots. By developing and tuning Lloyd's algorithm in MATLAB for adaptive K-Means clustering, we achieved a 30% reduction in convergence time.
                            </p>
                            <p>
                                We leveraged GIS wildfire spatial data to model fire perimeters accurately, providing real-time inputs that enhanced the efficiency of the robotic cluster's containment strategies.
                            </p>
                        </>
                    }
                />

            </section>

            <hr className="border-black/5 my-12" />

            <section>
                <div className="flex flex-wrap gap-6 text-sm text-space_cadet/80 uppercase tracking-wider font-bold">
                    <Link href="/" className="hover:text-space_cadet transition-colors">Home</Link>
                    <Link href="/blog" className="hover:text-space_cadet transition-colors">Notes</Link>
                    <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-space_cadet transition-colors">Resume</a>
                    <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="hover:text-space_cadet transition-colors">LinkedIn</a>
                    <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="hover:text-space_cadet transition-colors">GitHub</a>
                    <a href="https://open.spotify.com/playlist/5StQUHdTuoxMFTDnhml6ot?si=56b6a2d707f64e3c" target="_blank" rel="noopener noreferrer" className="hover:text-space_cadet transition-colors">Discography</a>
                </div>
            </section>
        </div>
    );
}
