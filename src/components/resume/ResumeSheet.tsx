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
                    right="Kingston, ON"
                    sub={<>BASc Applied Mathematics and Computer Engineering <span className="not-italic">(GPA 3.80/4.30)</span></>}
                    subRight="Sep 2024 – Apr 2028"
                >
                    <Item>Coursework: Algorithms, Engineering Design, Probability, Real Analysis, Microeconomics, Philosophy</Item>
                </Entry>
            </Section>

            <Section numeral="II" title="Awards">
                <Entry title="GRAMMY Music Award" detail="The Recording Academy" right="Feb 2024">
                    <Item>Received a GRAMMY Award for contributions to Killer Mike’s <i>MICHAEL</i>, 2024 Rap Album of the Year</Item>
                    <Item>Produced for the Migos, Gunna, Peso Pluma, Roddy Ricch, Polo G, A Boogie, Lil Tjay, Skepta, Cam’ron</Item>
                </Entry>
                <Entry title="Canada’s Top Students" detail="Scotiabank" right="Nov 2025">
                    <Item>Selected as <b className="font-semibold">1 of 30</b> attendees (from 500+) for Scotiabank’s Canada’s Top Students conference and case competition</Item>
                </Entry>
            </Section>

            <Section numeral="III" title="Experience">
                <Entry title="Data Science Intern" right="May 2026 – Aug 2026" sub="Scotiabank" subRight="Toronto, ON">
                    <Item>Designed and deployed an end-to-end, concurrent LLM parsing pipeline for unstructured audit files using Vertex AI and Openpyxl, cutting manual labor by <b className="font-semibold">25%+</b> while holding processing time near-constant as file volume scaled</Item>
                    <Item>Reduced <b className="font-semibold">$70M+</b> in tech-risk loss exposure by building an HDBSCAN clustering pipeline, tuning it to minimize cluster overlap and cut LLM calls by <b className="font-semibold">66.7%</b></Item>
                    <Item>Developed an interactive Power BI expense analysis dashboard surfacing 4 KPIs across CAD spend and policy violations with dynamic 3-, 6-, and 12-month filtering, saving the expense team ~<b className="font-semibold">5 hours/week</b> in manual review</Item>
                </Entry>
                <Entry title="Generative AI Engineering Intern" right="May 2025 – Aug 2025" sub="Government of Canada" subRight="Ottawa, ON">
                    <Item>Designed and implemented an Azure-based GenAI workflow in PowerApps to transcribe, categorize, and organize refugee documents, achieving <b className="font-semibold">93%</b> accuracy and reducing manual processing time by over <b className="font-semibold">50%</b></Item>
                    <Item>Engineered an Azure RAG chatbot with an ETL pipeline, Cosmos DB, and vector storage to automate legal information retrieval, reducing average lookup time from <b className="font-semibold">hours to minutes</b></Item>
                </Entry>
            </Section>

            <Section numeral="IV" title="Projects">
                <p className="italic">
                    For more projects and in-depth analyses, see <Link href="/projects" className={`not-italic ${ink}`}>II. Projects</Link>.
                </p>
                <Entry title="Markowitz Portfolio Optimizer" detail="Convex Optimization">
                    <Item>Built a Markowitz portfolio optimizer in Python with cvxpy, modeling risk minimization as a convex quadratic program that computes provably optimal allocations across 50+ assets in <b className="font-semibold">under 2 ms per solve</b></Item>
                    <Item>Engineered a data pipeline pulling 5 years of market data via yfinance to estimate returns/covariance and trace a 50-portfolio efficient frontier in <b className="font-semibold">&lt;0.1 s</b>, validated by <b className="font-semibold">14 automated tests across 4 modules</b></Item>
                </Entry>
                <Entry title="Adaptive Reinforcement Learning Ensemble Strategy" detail="Queen’s AI Club (QMIND)">
                    <Item>Built and trained an ensemble of PPO, A2C, and TD3 reinforcement learning agents for daily portfolio allocation across 9 ETFs, using Stable-Baselines3 within a custom Gymnasium trading environment</Item>
                    <Item>Validated backtests with 10,000-sample bootstrap confidence intervals and 10 bps transaction-cost modeling, confirming an <b className="font-semibold">annualized Sharpe of 1.14</b> at roughly <b className="font-semibold">half the drawdown</b> of a passive S&amp;P 500 benchmark</Item>
                </Entry>
                <Entry title="Autonomous Multi-Agent Robotic Firefighting" detail="Second Year School Project">
                    <Item>Developed and optimized Lloyd’s algorithm in MATLAB for adaptive k-means clustering of dynamic fire hotspot data, <b className="font-semibold">reducing cluster convergence time by 30%</b> and tightening robot-to-hotspot coverage</Item>
                    <Item>Built the multi-agent coordination and simulation component in MATLAB, enabling 10 robots to cover <b className="font-semibold">100% of hotspots in under 100 iterations</b></Item>
                </Entry>
            </Section>

            <Section numeral="V" title="Skills & Interests">
                <div className="space-y-[1px]">
                    <p><span className="font-semibold">Skills:</span> Python, Excel, SQL, PowerBI, Microsoft Azure, Google Vertex AI, Cosmos DB, Copilot Studio</p>
                    <p><span className="font-semibold">ML/AI:</span> PyTorch, Scikit-learn, HDBSCAN, CVXPY, Pandas, NumPy, Jupyter Notebook, OpenPyXL</p>
                    <p><span className="font-semibold">Interests:</span> Native in English and French, Karate Black Belt, Cycling, Non-Fiction, Psychology</p>
                </div>
            </Section>
        </article>
    );
}
