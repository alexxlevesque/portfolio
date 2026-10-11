import Link from 'next/link';
import RisoImage from '@/components/RisoImage';
import RisoTitle from '@/components/RisoTitle';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-10 md:gap-12 items-start">
        <RisoImage
          src="/headshot.jpg"
          alt="Alex Levesque"
          sizes="256px"
          cell={3.5}
          scale={1.45}
          priority
          className="shrink-0 w-48 h-48 sm:w-64 sm:h-64 border-2 border-ink-blue shadow-plate"
        />
        <div className="flex-1 space-y-6">
          <div>
            <RisoTitle className="riso-display text-6xl sm:text-7xl">Alex Levesque</RisoTitle>
            <p className="mt-4 font-mono text-sm uppercase tracking-wider font-bold">Applied Math & Computer Engineering<br /><span className="font-normal opacity-80">Queen&apos;s University</span></p>
          </div>
          <p className="text-lg leading-relaxed max-w-2xl">
            I&apos;m interested in machine learning, statistics, and their applications to finance and decision-making. I like making tools that make technical work more efficient and that optimize my workflows.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="riso-button">Resume</a>
            <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="riso-button">LinkedIn</a>
            <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="riso-button">GitHub</a>
            <a href="mailto:alex.levesque@queensu.ca" className="riso-button">Email</a>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="riso-display text-3xl sm:text-4xl"><span className="riso-highlight">Experience and areas of interest</span></h2>

        <div className="space-y-4 text-base sm:text-lg leading-relaxed">
          <p>
            <strong className="riso-mark font-extrabold">Finance.</strong> Next summer, I will partake in a Sales &apos; Trading internship at Scotiabank, where I hope to link machine learning and finance in a professional setting.
          </p>

          <p>
            <strong className="riso-mark font-extrabold">Data science.</strong> At Scotiabank, I built LLM pipelines for unstructured audit data, analytics dashboards, and clustering workflows for risk operations.
          </p>

          <p>
            <strong className="riso-mark font-extrabold">Generative AI.</strong> At the Immigration and Refugee Board of Canada, I shipped Azure workflows for document transcription, classification, and legal retrieval.
          </p>

          <p>
            <strong className="riso-mark font-extrabold">Social sciences:</strong> I&apos;m naturally drawn to sociology, neuroscience, human behavior, and mental models. I spend my free time reading on such subjects to improve conscientiousness and emotional intelligence.
          </p>

          <p>
            <strong className="riso-mark font-extrabold">Engineering projects:</strong> I've built many projects in engineering and beyond. I've built a reinforcement learning trading project, a theoretical autonomous robotic firefighting project, and a working water filter!
          </p>
        </div>
      </section>

      <section className="space-y-4 border-t-2 border-dashed border-ink-blue/60 pt-8">
        <p className="text-base leading-relaxed">
          For selected projects and lecture notes, see the pages below.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="riso-button">Projects</Link>
          <Link href="/library" className="riso-button">Notes</Link>
        </div>
      </section>
    </div>
  );
}
