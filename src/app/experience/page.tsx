import Link from 'next/link';

export default function Experience() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">experience</h1>
      </header>

      <section className="mb-10">
        <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">2025 — ai researcher, algoverse ai research</h2>
        <div className="mt-3 space-y-2 text-[15px] leading-7">
          <p>&gt; conducted ai research in a 12-week program with mentorship from phds at meta, openai, and princeton.</p>
          <p>&gt; enhanced large language models (qwen3-235b-a22b, gpt-oss) by implementing a self-contrastive mixture-of-experts (moe) architecture using pytorch and jupyter notebooks.</p>
          <p>&gt; co-authored a research paper under review, introducing novel contrastive decoding methods achieving a 2% efficiency gain in moe models across benchmarks.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">2025 — genai intern, government of canada – immigration board</h2>
        <div className="mt-3 space-y-2 text-[15px] leading-7">
          <p>&gt; developed and tested an azure workflow to transcribe, classify, and organize refugee basis of claim documents with 93% accuracy, reducing manual processing time.</p>
          <p>&gt; engineered an azure-based chatbot leveraging cosmos db (nosql), nlp, and embedding pipelines, reducing legal document ingestion time to under 10 minutes.</p>
          <p>&gt; delivered a conference presentation translating ai workflows into actionable insights for stakeholders.</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">links</h2>
        <div className="mt-3 text-[15px] leading-7 space-y-1">
          <p>&gt; <Link href="/" className="underline">home</Link> · <Link href="/projects" className="underline">projects</Link> · <Link href="/blog" className="underline">notes</Link></p>
          <p>&gt; <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="underline">resume</a> · <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="underline">linkedin</a> · <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="underline">github</a></p>
        </div>
      </section>
    </main>
  );
}