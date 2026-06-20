import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
    return (
        <div className="space-y-16 max-w-5xl mx-auto">
            <header className="mb-16 text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-space_cadet tracking-tight mb-4">Projects</h1>
                <p className="text-ultra_violet font-medium italic"> Implementing my passions into reality.</p>
            </header>

            <section className="space-y-6">

                <ProjectCard
                    title="Adaptive RL Ensemble Strategy"
                    status="COMPLETED"
                    outcome="Adaptive trading strategy that reduces portfolio volatility and improves risk-adjusted returns using an ensemble of reinforcement learning agents."
                    techStack="Python, PyTorch, PPO, A2C, TD3, Git"
                    constraints="Adaptive allocation across varying market regimes, effective diversification to minimize drawdown, rigorous backtesting against SPY benchmark."
                    imageSrc="/trading.png"
                    imageScale={1.3}
                    customFilter="grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(3) brightness(0.8) contrast(1.2)"
                    description={
                        <>
                            <p>
                                Developed at Queen's AI Club (QMIND), this project implemented an ensemble of Reinforcement Learning agents (PPO, A2C, TD3) to manage portfolio allocation adaptively.
                            </p>
                            <p>
                                The diversification framework significantly reduced volatility compared to standard benchmarks like SPY buy-and-hold, validated through extensive Sharpe ratio and drawdown analysis.
                            </p>
                            <div className="mt-6 pt-4 border-t border-black/5">
                                <a
                                    href="https://github.com/ary4f/QMINDARES/tree/main"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-bold text-space_cadet hover:text-ultra_violet transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.645-.735-3.885-1.395-.135-.345-.72-1.395-1.23-1.68-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                    View Source Code
                                </a>
                            </div>
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
                    customFilter="grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(2.3) brightness(0.8) contrast(1.2)"
                    description={
                        <>
                            <p className="font-bold text-space_cadet mb-4 italic">
                                Course project for APSC 200: Engineering Design and Practice. Course Grade: A+ | Role: Primary Technical Contributor
                            </p>
                            <p>
                                Driven by an interest in mathematical optimization, I developed a decentralized multi-agent system designed to tackle the unpredictable nature of wildfires. Moving away from rigid, centralized control, I implemented <strong>Lloyd’s Algorithm</strong> (i. e. K-Means Clustering) to allow a fleet of drones to "self-organize" based on real-time environmental data.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                <div className="rounded-lg overflow-hidden border border-black/5 shadow-sm">
                                    <img src="/firefighting_1.png" alt="Multi-agent fire containment simulation" className="w-full h-auto" />
                                </div>
                                <div className="rounded-lg overflow-hidden border border-black/5 shadow-sm">
                                    <img src="/firefighting_2.png" alt="Drone agent trajectory plots" className="w-full h-auto" />
                                </div>
                            </div>
                            <p>
                                I built a custom simulation environment in MATLAB where I experimented with:
                            </p>
                            <ul className="list-disc ml-4 mt-2 space-y-2">
                                <li><strong>Dynamic Spatial Partitioning:</strong> Using Voronoi regions to ensure agents automatically distribute themselves to the most critical "hotspots" without human intervention.</li>
                                <li><strong>Sensor Fusion Logic:</strong> Designing an "Observation Set" function that allows agents to weigh environmental density, effectively giving the swarm a collective "vision" of the fire's intensity.</li>
                                <li><strong>Robustness & Scalability:</strong> Engineering the system to be decentralized so that the failure of one drone doesn't compromise the mission, as neighboring agents autonomously re-calculate and compensate for the gap.</li>
                            </ul>
                        </>
                    }
                />

            </section>

            <hr className="border-black/5 my-12" />

            <section>
                <div className="flex flex-wrap gap-6 text-base text-space_cadet/80 uppercase tracking-wider font-bold">
                    <Link href="/" className="hover:text-steel_blue transition-colors">Home</Link>
                    <Link href="/library" className="hover:text-steel_blue transition-colors">Library</Link>
                </div>
            </section>
        </div>
    );
}
