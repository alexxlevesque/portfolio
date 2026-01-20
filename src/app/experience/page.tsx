import Link from 'next/link';

export default function Experience() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <header className="glass-panel p-8 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">experience</h1>
        <p className="text-aero-blue">professional history & research</p>
      </header>

      <section className="glass-panel p-8 mb-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-aero-green mb-4 border-b border-white/10 pb-2">2025 — ai researcher, algoverse ai research</h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-gray-200">
          <p>&gt; conducted ai research in a 12-week program with mentorship from phds at meta, openai, and princeton.</p>
          <p>&gt; enhanced large language models (qwen3-235b-a22b, gpt-oss) by implementing a self-contrastive mixture-of-experts (moe) architecture using pytorch and jupyter notebooks.</p>
          <p>&gt; co-authored a research paper under review, introducing novel contrastive decoding methods achieving a 2% efficiency gain in moe models across benchmarks.</p>
        </div>
      </section>

      <section className="glass-panel p-8 mb-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-aero-green mb-4 border-b border-white/10 pb-2">2025 — genai intern, government of canada – immigration board</h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-gray-200">
          <p>&gt; developed and tested an azure workflow to transcribe, classify, and organize refugee basis of claim documents with 93% accuracy, reducing manual processing time.</p>
          <p>&gt; engineered an azure-based chatbot leveraging cosmos db (nosql), nlp, and embedding pipelines, reducing legal document ingestion time to under 10 minutes.</p>
          <p>&gt; delivered a conference presentation translating ai workflows into actionable insights for stakeholders.</p>
        </div>
      </section>

      <section className="glass-panel p-8 mt-12 bg-black/40 border-white/5">
        <h2 className="text-sm font-bold uppercase tracking-widest text-aero-green mb-4">links</h2>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-aero-cyan hover:text-white transition-colors">home</Link>
          <span className="text-white/20">/</span>
          <Link href="/projects" className="text-aero-cyan hover:text-white transition-colors">projects</Link>
          <span className="text-white/20">/</span>
          <Link href="/blog" className="text-aero-cyan hover:text-white transition-colors">notes</Link>
        </div>
        <div className="flex gap-4 text-sm mt-2">
          <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-aero-cyan hover:text-white transition-colors">resume</a>
          <span className="text-white/20">/</span>
          <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="text-aero-cyan hover:text-white transition-colors">linkedin</a>
          <span className="text-white/20">/</span>
          <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="text-aero-cyan hover:text-white transition-colors">github</a>
        </div>
      </section>
    </main>
  );
}