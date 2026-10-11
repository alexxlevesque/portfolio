import Link from 'next/link';
import Figure from '@/components/Figure';
import Plate from '@/components/plates/Plate';
import ApollonianPlate from '@/components/plates/ApollonianPlate';

const interests = [
  { label: 'Finance.', text: 'Next summer, I will partake in a Sales & Trading internship at Scotiabank, where I hope to link machine learning and finance in a professional setting.' },
  { label: 'Data science.', text: 'At Scotiabank, I built LLM pipelines for unstructured audit data, analytics dashboards, and clustering workflows for risk operations.' },
  { label: 'Generative AI.', text: 'At the Immigration and Refugee Board of Canada, I shipped Azure workflows for document transcription, classification, and legal retrieval.' },
  { label: 'Social sciences:', text: "I'm naturally drawn to sociology, neuroscience, human behavior, and mental models. I spend my free time reading on such subjects to improve conscientiousness and emotional intelligence." },
  { label: 'Engineering projects:', text: "I've built many projects in engineering and beyond. I've built a reinforcement learning trading project, a theoretical autonomous robotic firefighting project, and a working water filter!" },
];

const numerals = ['i', 'ii', 'iii', 'iv', 'v'];

export default function Home() {
  return (
    <div className="space-y-16">
      <Plate
        numeral="I"
        kicker="Applied Math & Computer Engineering"
        title="Alex Levesque"
        formula="|P − F₁| = k · |P − F₂|,  0 < k < 1"
        note="Queen's University"
        caption="Circles of Apollonius about the pole F₁, crossed by the circles through F₁ and its partner F₂ below the sheet."
      >
        <ApollonianPlate />
      </Plate>

      {/* Hero Section */}
      <section className="grid gap-8 sm:grid-cols-[14rem_1fr] sm:gap-12 items-start">
        <Figure
          src="/headshot.jpg"
          alt="Alex Levesque"
          sizes="224px"
          label="Fig. 1"
          caption="Portrait"
          priority
          className="w-48 sm:w-56"
          frameClassName="aspect-[4/5]"
        />
        <div className="space-y-6">
          <p className="text-xl sm:text-2xl leading-relaxed max-w-2xl">
            I&apos;m interested in machine learning, statistics, and their applications to finance and decision-making. I like making tools that make technical work more efficient and that optimize my workflows.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer" className="plate-link">Resume ↗</a>
            <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className="plate-link">LinkedIn ↗</a>
            <a href="https://github.com/alexxlevesque" target="_blank" rel="noopener noreferrer" className="plate-link">GitHub ↗</a>
            <a href="mailto:alex.levesque@queensu.ca" className="plate-link">Email</a>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="plate-heading">Experience and areas of interest</h2>

        <dl className="text-lg leading-relaxed">
          {interests.map(({ label, text }, i) => (
            <div key={label} className="grid gap-1 sm:grid-cols-[14rem_1fr] sm:gap-12 border-b border-dotted border-ink/40 py-4">
              <dt className="font-display text-lg font-semibold italic">
                <span className="mr-3 font-mono text-xs not-italic font-normal text-ink-rose">{numerals[i]}.</span>
                {label}
              </dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-4">
        <p className="text-lg leading-relaxed italic">
          For selected projects and lecture notes, see the pages below.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/projects" className="plate-link">II. Projects →</Link>
          <Link href="/library" className="plate-link">III. Notes →</Link>
        </div>
      </section>
    </div>
  );
}
