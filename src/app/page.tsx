import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">alex levesque</h1>
        <p className="mt-2 text-sm text-pale-dogwood">applied math & computer engineering @ queen's university</p>
        <div className="mt-4 text-sm text-rose-quartz space-x-4">
          <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">resume</a>
          <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">linkedin</a>
          <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">github</a>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">academics</h2>
        <div className="mt-3 space-y-2 text-[15px] leading-7">
          <p>&gt; 2024—present — queen's university — applied mathematics & computer engineering.</p>
          <p className="text-rose-quartz">focus: computer science, real analysis, probability theory, control systems, stochastic calculus.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">internships</h2>
        <div className="mt-3 space-y-3 text-[15px] leading-7">
          <p>&gt; 2025 — ai technician intern — immigration and refugee board of canada.
            <span className="block text-rose-quartz">azure, copilots, power automate; document transcription/classification; translation for legal workflows.</span>
          </p>
          <p>&gt; 2025 — llm research member — algoverse ai research.
            <span className="block text-rose-quartz">12-week program with mentors from meta/openai/princeton; optimize MoE for efficiency, published a paper.</span>
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">key projects</h2>
        <div className="mt-3 space-y-3 text-[15px] leading-7">
          <p>&gt; 2026 — patientaware — context-aware ai platform —
            <span className="block text-rose-quartz">context-aware ai platform addressing inefficiencies in canada's medical system; physician-facing summaries, ohip integration, and thread-based patient data storage system.</span>
          </p>
          <p>&gt; 2025 — adaptive reinforcement learning ensemble strategy — qmind —
            <span className="block text-rose-quartz">ensemble of ppo, a2c, and td3 agents with adaptive allocation across market regimes; diversification framework reducing volatility and improving risk-adjusted returns via sharpe ratio analysis.</span>
          </p>
          <p>&gt; 2025 — clue game strategy optimization — bayesian assistant —
            <a href="https://github.com/alexxlevesque/cluegamesolver" target="_blank" rel="noopener noreferrer" className="underline ml-1">github</a>
            <span className="block text-rose-quartz">real-time probability updates, streamlit ui, consistent wins in fewer than 7 turns.</span>
          </p>
          <p>&gt; 2025 — ai forecasting paper — novel time series prediction methods —
            <a href="https://medium.com/qmind-ai/transforming-market-predictions-with-machine-learning-and-random-forests-36e1d550da60" target="_blank" rel="noopener noreferrer" className="underline ml-1">medium</a>
            <span className="block text-rose-quartz">comparative model analysis, statistical validation, implementation guidelines.</span>
          </p>
          <p>&gt; 2025 — ai ethics paper — copyright law in generative ai —
            <a href="https://qmind.ca/project/86" target="_blank" rel="noopener noreferrer" className="underline ml-1">qmind</a>
            <span className="block text-rose-quartz">published to cucai 2025, policy recommendations, interdisciplinary approach.</span>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">technical skills</h2>
        <div className="mt-3 text-[15px] leading-7 space-y-1">
          <p><span className="text-rose-quartz">languages</span>: python, c++, typescript, sql</p>
          <p><span className="text-rose-quartz">ml / data</span>: numpy, pandas, scikit-learn, pytorch</p>
          <p><span className="text-rose-quartz">platforms</span>: azure, copilot studio, power automate</p>
          <p><span className="text-rose-quartz">tools</span>: git, solidworks, vscode, jupyter notebooks</p>
        </div>
      </section>
    </main>
  );
}
