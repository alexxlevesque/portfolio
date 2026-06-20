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
          <p className="text-base text-pale_dogwood leading-relaxed max-w-2xl">
            I&apos;m interested in machine learning, quantitative systems, and the mathematical structure behind intelligent software. I like building practical tools that make difficult technical work more accurate, faster, and easier to reason about.
          </p>
          <div className="pt-4 flex flex-wrap gap-6 text-sm text-pale_dogwood uppercase tracking-wider font-medium">
            <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">Resume</a>
            <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">LinkedIn</a>
            <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">GitHub</a>
            <a href="mailto:alex.levesque@queensu.ca" className="hover:text-steel_blue transition-colors">Email</a>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <header className="space-y-3">
          <h2 className="text-2xl font-serif font-bold text-isabelline">Experience and Areas of Interest</h2>

        </header>

        <div className="space-y-6 text-pale_dogwood leading-relaxed">
          <p>
            <strong className="text-isabelline">Data science infrastructure:</strong> At Scotiabank, I designed and deployed an end-to-end LLM parsing pipeline for unstructured audit files using Vertex AI and Openpyxl, delivering 25%+ labor savings with near-constant time behavior at scale. I also built a Power BI dashboard for CAD spend and policy violations that saved the expense team about five hours per week, and developed an HDBSCAN-based clustering pipeline that reduced tech risk event loss exposure across $70M+ in scenarios while cutting LLM calls by 66.7%.
          </p>

          <p>
            <strong className="text-isabelline">Generative AI engineering:</strong> At the Immigration and Refugee Board of Canada, I developed Azure-based workflows to transcribe, classify, and organize refugee claim documents with high accuracy, and built a chatbot pipeline for legal document retrieval and ingestion. I&apos;m especially interested in applied LLM systems that need to be useful under real operational constraints, not just impressive in demos.
          </p>


          <p>
            <strong className="text-isabelline">Quantitative modeling:</strong> I&apos;m drawn to probability, statistics, and optimization problems where modeling choices matter as much as implementation details. My reinforcement learning trading project explored adaptive portfolio allocation through PPO, A2C, and TD3 ensembles with a focus on volatility reduction and risk-adjusted performance.
          </p>

          <p>
            <strong className="text-isabelline">Engineering systems:</strong> I enjoy building systems that combine mathematical structure with practical constraints. My autonomous robotic firefighting project used decentralized clustering and spatial partitioning to model wildfire containment, reflecting a broader interest in control, coordination, and decision-making under uncertainty.
          </p>

          <p>
            <strong className="text-isabelline">Philosophy, writing, and music.</strong> I like ideas that sit a little outside engineering too. I produced music throughout high school, winning a GRAMMY award for my work. I am also an avid reader, I practice piano, and I love exploring the world on a bicycle. I enjoy researching topics outside of my field of study, such as economics, psychology, human behavior, geopolitics, and image processing.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-sm text-pale_dogwood leading-relaxed">
          For selected projects and lecture notes, see the pages below.
        </p>
        <div className="flex flex-wrap gap-6 text-sm text-pale_dogwood uppercase tracking-wider font-medium">
          <Link href="/projects" className="hover:text-steel_blue transition-colors">Projects</Link>
          <Link href="/library" className="hover:text-steel_blue transition-colors">Library</Link>
        </div>
      </section>
    </div>
  );
}
