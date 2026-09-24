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
            <p className="mt-2 text-xl text-rose_quartz font-medium">Applied Math & Computer Engineering<br /><span className="text-base opacity-80">Queen's University</span></p>
          </div>
          <p className="text-lg text-pale_dogwood leading-relaxed max-w-2xl">
            I&apos;m interested in machine learning, statistics, and their applications to finance and decision-making. I like making tools that make technical work more efficient and that optimize my workflows.
          </p>
          <div className="pt-4 flex flex-wrap gap-6 text-base text-pale_dogwood uppercase tracking-wider font-medium">
            <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">Resume</a>
            <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">LinkedIn</a>
            <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="hover:text-steel_blue transition-colors">GitHub</a>
            <a href="mailto:alex.levesque@queensu.ca" className="hover:text-steel_blue transition-colors">Email</a>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-isabelline">Experience and areas of interest</h2>

        <div className="space-y-4 text-base sm:text-lg text-pale_dogwood leading-relaxed">
          <p>
            <strong className="text-isabelline">Finance.</strong> Next summer, I will partake in a Sales &apos; Trading internship at Scotiabank, where I hope to link machine learning and finance in a professional setting.
          </p>

          <p>
            <strong className="text-isabelline">Data science.</strong> At Scotiabank, I built LLM pipelines for unstructured audit data, analytics dashboards, and clustering workflows for risk operations.
          </p>

          <p>
            <strong className="text-isabelline">Generative AI.</strong> At the Immigration and Refugee Board of Canada, I shipped Azure workflows for document transcription, classification, and legal retrieval.
          </p>

          <p>
            <strong className="text-isabelline">Social sciences:</strong> I&apos;m naturally drawn to sociology, neuroscience, human behavior, and mental models. I spend my free time reading on such subjects to improve conscientiousness and emotional intelligence.
          </p>

          <p>
            <strong className="text-isabelline">Engineering projects:</strong> I've built many projects in engineering and beyond. I've built a reinforcement learning trading project, a theoretical autonomous robotic firefighting project, and a working water filter!
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-base text-pale_dogwood leading-relaxed">
          For selected projects and lecture notes, see the pages below.
        </p>
        <div className="flex flex-wrap gap-6 text-base text-pale_dogwood uppercase tracking-wider font-medium">
          <Link href="/projects" className="hover:text-steel_blue transition-colors">Projects</Link>
          <Link href="/library" className="hover:text-steel_blue transition-colors">Notes</Link>
        </div>
      </section>
    </div>
  );
}
