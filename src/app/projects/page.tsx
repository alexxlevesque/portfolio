import Link from 'next/link';

export default function Projects() {
    return (
        <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-24">
            <header className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">projects</h1>
            </header>

            <section className="mb-10">
                <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">2026 — patientaware: context-aware ai platform</h2>
                <div className="mt-3 space-y-2 text-[15px] leading-7">
                    <p>&gt; developed ai-powered clinical platform using backboard.ai to aggregate longitudinal patient data and generate physician-facing summaries, reducing appointment prep time and improving diagnostic accuracy.</p>
                    <p>&gt; built context-aware patient dashboard integrated with ohip for continuous symptom logging and structured clinical insights, improving appointment efficiency and care continuity.</p>
                    <p>&gt; architected thread-based patient data storage system to maintain persistent clinical context across appointments, enabling seamless access to ai-curated summaries.</p>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">2025 — adaptive reinforcement learning ensemble strategy, queen's ai club</h2>
                <div className="mt-3 space-y-2 text-[15px] leading-7">
                    <p>&gt; implemented and trained an ensemble of ppo, a2c, and td3 reinforcement learning agents, with experiment tracking and version control managed via git, enabling adaptive allocation across multiple market regimes.</p>
                    <p>&gt; engineered a diversification framework that reduced portfolio volatility and improved risk-adjusted returns, validated by sharpe ratio and drawdown analysis versus spy buy-and-hold.</p>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">2025 — autonomous multi-agent robotic firefighting</h2>
                <div className="mt-3 space-y-2 text-[15px] leading-7">
                    <p>&gt; developed and optimized lloyd's algorithm in matlab for adaptive k-means clustering of dynamic fire hotspot data, reducing cluster convergence time by 30% and improving autonomous robot deployment efficiency.</p>
                    <p>&gt; leveraged gis wildfire spatial data and analysis tools to delineate and model fire perimeters, enabling accurate real-time input for robotic firefighting cluster optimization and enhancing fire containment strategies.</p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">links</h2>
                <div className="mt-3 text-[15px] leading-7 space-y-1">
                    <p>&gt; <Link href="/" className="underline">home</Link> · <Link href="/experience" className="underline">experience</Link> · <Link href="/blog" className="underline">notes</Link></p>
                    <p>&gt; <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="underline">resume</a> · <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="underline">linkedin</a> · <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="underline">github</a></p>
                </div>
            </section>
        </main>
    );
}
