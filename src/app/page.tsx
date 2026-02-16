import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="shrink-0 w-48 h-48 sm:w-64 sm:h-64 rounded-xl overflow-hidden border border-steel_blue/20 shadow-lg hover:border-steel_blue/40 transition-all relative">
          <Image
            src="/headshot.jpg"
            alt="Alex Levesque"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-isabelline">Alex Levesque</h1>
            <p className="mt-2 text-lg text-rose_quartz font-medium">Applied Math & Computer Engineering<br /><span className="text-sm opacity-80">Queen's University</span></p>
          </div>
          <p className="text-base text-pale_dogwood leading-relaxed max-w-lg">
            Interested in all related to computer science, data science, probability theory, and statistics. My goal is to build intelligent systems to solve real-world problems.
          </p>
          <div className="pt-4 flex flex-wrap gap-6 text-sm text-pale_dogwood uppercase tracking-wider font-medium">
            <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">Resume</a>
            <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">LinkedIn</a>
            <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">GitHub</a>
            <a href="mailto:alex.levesque@queensu.ca" className="hover:text-steel_blue transition-colors">Email</a>
            <a href="https://open.spotify.com/playlist/5StQUHdTuoxMFTDnhml6ot?si=56b6a2d707f64e3c" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">Discography</a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <h2 className="text-2xl font-serif font-bold text-isabelline mb-8">Experience</h2>
        <div className="space-y-12">

          {/* Scotiabank */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
              <h3 className="text-lg font-bold text-isabelline">Data Science Intern</h3>
              <span className="text-sm text-rose_quartz tabular-nums">2026</span>
            </div>
            <div className="text-sm text-rose_quartz mb-3 italic">Scotiabank Velocity Program &bull; Toronto, ON</div>
            <p className="text-pale_dogwood text-sm leading-relaxed">
              Incoming Summer 2026
            </p>
          </div>


          {/* IRB */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
              <h3 className="text-lg font-bold text-isabelline">AI Technician Intern</h3>
              <span className="text-sm text-rose_quartz tabular-nums">2025</span>
            </div>
            <div className="text-sm text-rose_quartz mb-3 italic">Immigration and Refugee Board of Canada &bull; Ottawa, ON</div>
            <p className="text-pale_dogwood text-sm leading-relaxed">
              Developed and deployed Azure-based workflows to transcribe, classify, and organize refugee basis-of-claim documents with 93% accuracy, significantly reducing manual processing time. Built an Azure chatbot using Cosmos DB, NLP, and embedding pipelines to cut legal document ingestion to under 10 minutes and presented the system’s impact to stakeholders at a conference.
            </p>
          </div>

          {/* Algoverse */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
              <h3 className="text-lg font-bold text-isabelline">LLM Research Member</h3>
              <span className="text-sm text-rose_quartz tabular-nums">2025</span>
            </div>
            <div className="text-sm text-rose_quartz mb-3 italic">Algoverse AI Research &bull; Remote</div>
            <p className="text-pale_dogwood text-sm leading-relaxed">
              Conducted AI research in a 12-week program under mentorship from PhDs at Meta, OpenAI, and Princeton. Improved large language model efficiency by implementing a self-contrastive Mixture-of-Experts architecture in PyTorch and co-authoring a paper under review introducing contrastive decoding methods with a 2% benchmarked efficiency gain.
            </p>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-serif font-bold text-isabelline mb-8">Technical Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-pale_dogwood">
          <div className="flex items-baseline space-x-2">
            <span className="font-bold text-steel_blue w-24 shrink-0">Languages</span>
            <span>Python, C++, TypeScript, SQL</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-bold text-steel_blue w-24 shrink-0">ML / Data</span>
            <span>NumPy, Pandas, Scikit-learn, PyTorch</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-bold text-steel_blue w-24 shrink-0">Platforms</span>
            <span>Azure, Copilot Studio, Power Automate</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-bold text-steel_blue w-24 shrink-0">Tools</span>
            <span>Git, SolidWorks, VSCode, Jupyter</span>
          </div>
        </div>
      </section>
    </div>
  );
}
