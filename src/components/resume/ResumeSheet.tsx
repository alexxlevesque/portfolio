import Link from 'next/link';
import type { ReactNode } from 'react';

// Letter stock at 96 dpi. The desk scales the whole sheet to fit the window.
export const SHEET_WIDTH = 816;
export const SHEET_HEIGHT = 1056;

const ink = 'underline decoration-ink-rose/60 decoration-1 underline-offset-2';

function Section({ numeral, title, children }: { numeral: string; title: string; children: ReactNode }) {
    return (
        <section className="mt-[14px]">
            <h3 className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em]">
                <span>
                    <span className="text-ink-rose">{numeral}.</span> {title}
                </span>
                <span className="h-px flex-1 bg-ink/60" />
            </h3>
            <div className="mt-[7px] space-y-[7px]">{children}</div>
        </section>
    );
}

interface EntryProps {
    title: ReactNode;
    detail?: ReactNode; // follows the title after a comma
    right?: string;
    sub?: ReactNode; // a second, italic line
    subRight?: string;
    children?: ReactNode;
}

function Entry({ title, detail, right, sub, subRight, children }: EntryProps) {
    const meta = 'shrink-0 font-mono text-[10px] tracking-[0.06em] text-ink/75';
    return (
        <div>
            <div className="flex items-baseline justify-between gap-6">
                <p>
                    <span className="font-semibold">{title}</span>
                    {detail && <>, {detail}</>}
                </p>
                {right && <p className={meta}>{right}</p>}
            </div>
            {(sub || subRight) && (
                <div className="flex items-baseline justify-between gap-6">
                    <p className="italic">{sub}</p>
                    {subRight && <p className={meta}>{subRight}</p>}
                </div>
            )}
            {children && <ul className="mt-[2px] space-y-[1px]">{children}</ul>}
        </div>
    );
}

function Item({ children }: { children: ReactNode }) {
    return (
        <li className="relative pl-[14px]">
            <span aria-hidden="true" className="absolute left-[2px] text-ink-rose">•</span>
            {children}
        </li>
    );
}

// The resume as a printed page, kept in step with /documents/resume.pdf.
export default function ResumeSheet() {
    return (
        <article
            className="relative font-serif text-[13px] leading-[1.27] text-ink"
            style={{ width: SHEET_WIDTH, height: SHEET_HEIGHT, padding: '44px 52px' }}
        >
            <header className="border-b border-ink/70 pb-[10px]">
                <h2 className="font-display text-[36px] font-medium leading-none tracking-tight">Alex Levesque</h2>
                <p className="mt-[10px] font-mono text-[10px] uppercase tracking-[0.14em]">
                    <a href="mailto:alex12levesque@gmail.com" className={ink}>alex12levesque@gmail.com</a>
                    <span className="mx-2 text-ink-rose">/</span>
                    <a href="https://alexlevesque.vercel.app" className={ink}>alexlevesque.vercel.app</a>
                    <span className="mx-2 text-ink-rose">/</span>
                    <a href="https://www.linkedin.com/in/alex-levesque/" target="_blank" rel="noopener noreferrer" className={ink}>LinkedIn</a>
                </p>
            </header>

            <Section numeral="I" title="Education">
                <Entry
                    title="Queen’s University"
                    detail="Smith Engineering"
                    right="Kingston, ON"
                    sub={<>BASc Applied Mathematics and Computer Engineering <span className="not-italic">(GPA 3.8/4.3)</span></>}
                    subRight="Sep 2024 – Apr 2029"
                >
                    <Item>Coursework: Algorithms, Probability, Real Analysis, Microeconomics, Engineering Design</Item>
                </Entry>
                <Entry
                    title="University of Warwick"
                    right="Coventry, UK"
                    sub="Exchange Semester, Department of Economics"
                    subRight="Jan 2027 – Mar 2027"
                >
                    <Item>Coursework: Data Science, Macroeconomics of Global (de-)Integration, Topics in Financial Economics</Item>
                </Entry>
            </Section>

            <Section numeral="II" title="Experience">
                <Entry title="Scotiabank" right="Toronto, ON" sub="Incoming Sales & Trading Summer Analyst" subRight="Apr 2027 – Aug 2027" />
                <Entry title="Scotiabank" right="Toronto, ON" sub="Data Science Intern" subRight="May 2026 – Aug 2026">
                    <Item>Designed and deployed an end-to-end, concurrent LLM parsing pipeline for unstructured audit files using Vertex AI and OpenPyXL, cutting manual effort by <b className="font-semibold">25%+</b> while holding processing time near-constant as file volume scaled</Item>
                    <Item>Reduced <b className="font-semibold">$2M+</b> in tech-risk loss exposure by building an HDBSCAN clustering pipeline, tuning it to minimize cluster overlap while cutting LLM calls by <b className="font-semibold">66.7%</b>, and proposing targeted control improvements to senior executives</Item>
                    <Item>Built an interactive Power BI dashboard tracking <b className="font-semibold">4</b> KPIs across CAD expense spend and policy violations, used to brief stakeholders on the highest-spend business lines</Item>
                </Entry>
                <Entry title="Government of Canada" right="Ottawa, ON" sub="Generative AI Engineering Intern" subRight="May 2025 – Aug 2025">
                    <Item>Implemented an Azure-based GenAI workflow in PowerApps to transcribe, categorize, and organize refugee documents, achieving <b className="font-semibold">93%</b> accuracy and reducing manual processing time by <b className="font-semibold">50%+</b></Item>
                    <Item>Engineered an Azure RAG chatbot with an ETL pipeline, Cosmos DB, and vector storage to automate legal information retrieval, reducing average lookup time from <b className="font-semibold">hours to minutes</b></Item>
                </Entry>
            </Section>

            <Section numeral="III" title="Projects">
                <p className="italic">
                    For more projects and in-depth analyses, see <Link href="/projects" className={`not-italic ${ink}`}>II. Projects</Link>.
                </p>
                <Entry title="Adaptive Reinforcement Learning Ensemble Strategy" detail="Queen’s AI Club (QMIND)">
                    <Item>Built and trained an ensemble of PPO, A2C, and TD3 reinforcement learning agents for daily portfolio allocation across <b className="font-semibold">9</b> ETFs, using Stable-Baselines3 within a custom Gymnasium trading environment</Item>
                    <Item>Validated backtests with <b className="font-semibold">10,000</b>-sample bootstrap confidence intervals and <b className="font-semibold">10</b> bps transaction-cost modeling, confirming an annualized Sharpe ratio of <b className="font-semibold">1.14</b> at roughly <b className="font-semibold">half</b> the drawdown of a passive S&amp;P 500 benchmark</Item>
                </Entry>
                <Entry title="Autonomous Multi-Agent Robotic Firefighting" detail="Second-Year Course Project">
                    <Item>Implemented and optimized Lloyd’s algorithm (k-means) in MATLAB to adaptively cluster dynamic fire hotspot data, reducing cluster convergence time by <b className="font-semibold">30%</b> and tightening robot-to-hotspot coverage</Item>
                    <Item>Built the multi-agent coordination and simulation component in MATLAB, enabling <b className="font-semibold">10</b> robots to cover <b className="font-semibold">80%+</b> of hotspots in under <b className="font-semibold">100</b> iterations</Item>
                </Entry>
            </Section>

            <Section numeral="IV" title="Awards">
                <Entry title="GRAMMY Award" detail="The Recording Academy" right="Feb 2024">
                    <Item>Recognized for contributions to Killer Mike’s <i>MICHAEL</i>, winner of Best Rap Album at the 66th GRAMMY Awards</Item>
                    <Item>Produced records for Migos, Gunna, Peso Pluma, Roddy Ricch, Polo G, A Boogie, Lil Tjay, Skepta, and Cam’ron</Item>
                </Entry>
                <Entry title="Canada’s Top Students" detail="Scotiabank" right="Nov 2025">
                    <Item>Selected as <b className="font-semibold">1 of 30</b> students from <b className="font-semibold">500+</b> applicants for Scotiabank’s national conference and case competition</Item>
                </Entry>
            </Section>

            <Section numeral="V" title="Skills & Interests">
                <div className="space-y-[1px]">
                    <p><span className="font-semibold">Programming &amp; Tools:</span> Python, MATLAB, Excel, Power BI, scikit-learn, Pandas</p>
                    <p><span className="font-semibold">Languages:</span> English and French (bilingual)</p>
                    <p><span className="font-semibold">Interests:</span> Music production, karate (black belt), strength training, distance running, reading, FC Bayern Munich</p>
                </div>
            </Section>
        </article>
    );
}
