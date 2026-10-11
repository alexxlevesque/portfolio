import Link from 'next/link';
import { Analytics } from "@vercel/analytics/next"
import Plate from '@/components/plates/Plate';
import ContourPlate from '@/components/plates/ContourPlate';

export default function Notes() {
    const terms = [
        {
            name: 'Winter 2026',
            courses: [
                {
                    code: 'CMPE 212',
                    title: 'Introduction to Computer Science II',
                    repository: '/documents/CMPE 212 Introduction to Computer Science II_lectures.pdf',
                },
                {
                    code: 'ELEC 274',
                    title: 'Computer Architecture',
                    repository: '/documents/ELEC 274 Computer Architecture_lectures.pdf',
                },
                {
                    code: 'ENPH 239',
                    title: 'Engineering Electricity and Magnetism',
                    repository: '/documents/ENPH 239 Eng. Electricity and Magnetism_lectures.pdf',
                },
                {
                    code: 'MTHE 212',
                    title: 'Linear Algebra',
                    repository: '/documents/MTHE 212 Linear Algebra_lectures.pdf',
                },
                {
                    code: 'MTHE 281',
                    title: 'Introduction to Real Analysis',
                    repository: '/documents/MTHE 281 Introduction to Real Analysis_lectures.pdf',
                },
                {
                    code: 'PHIL 266',
                    title: 'Probability and Inductive Logic',
                    repository: '/documents/PHIL 266 Probability and Inductive Logic_lectures.pdf',
                },
            ]
        },
        {
            name: 'Fall 2025',
            courses: [
                {
                    code: 'APSC 221',
                    title: 'Economics and Business Practice for Engineers',
                    repository: '/documents/APSC 221 Economics and Business Practice_lectures.pdf',
                },
                {
                    code: 'ELEC 271',
                    title: 'Digital Systems',
                    repository: '/documents/ELEC 271 Digital Systems_lectures.pdf',
                },
                {
                    code: 'ELEC 278',
                    title: 'Fundamentals of Information Structures',
                    repository: '/documents/ELEC 278 Fundamentals Of Information Structures_lectures.pdf',
                },
                {
                    code: 'MTHE 217',
                    title: 'Algebraic Structures with Applications',
                    repository: '/documents/MTHE 217 Algebraic Structures with Applications_lectures.pdf',
                },
                {
                    code: 'MTHE 237',
                    title: 'Differential Equations for Engineering Science',
                    repository: '/documents/MTHE 237 Differential Equations for Engineering Science_lectures.pdf',
                },
                {
                    code: 'MTHE 280',
                    title: 'Advanced Calculus',
                    repository: '/documents/MTHE 280 Advanced Calculus_lectures.pdf',
                },
            ]
        }
    ];

    return (
        <div className="space-y-16">
            <Plate
                numeral="III"
                kicker="Lecture notes"
                title="Notes"
            >
                <ContourPlate terms={terms.map((term) => ({ name: term.name, codes: term.courses.map((course) => course.code) }))} />
            </Plate>

            {/* Header */}
            <section className="space-y-4">
                <p className="text-xl leading-relaxed max-w-2xl">
                    Lecture notes from my engineering studies at Queen&apos;s University.
                </p>
            </section>

            {/* Notes Section */}
            <section className="space-y-12">
                {terms.map((term) => (
                    <div key={term.name} className="space-y-2">
                        <h3 className="plate-heading">{term.name}</h3>
                        <ol>
                            {term.courses.map((repo) => (
                                <li key={repo.code}>
                                    <a
                                        href={repo.repository}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-baseline gap-3 sm:gap-5 py-2 transition-colors hover:bg-ink-yellow/40"
                                    >
                                        <span className="plate-label w-20 shrink-0 text-ink-rose">{repo.code}</span>
                                        <span className="text-lg leading-snug group-hover:underline decoration-ink-rose/60 decoration-1 underline-offset-4">{repo.title}</span>
                                        {/* Dotted leader running out to the page reference, as in a table of contents */}
                                        <span aria-hidden="true" className="hidden sm:block flex-1 min-w-8 border-b border-dotted border-ink/50" />
                                        <span className="plate-label ml-auto shrink-0 text-ink/80">View PDF ↗</span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </section>

            <section className="border-t border-ink/70 pt-6">
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <Link href="/" className="plate-link">I. Home →</Link>
                    <Link href="/projects" className="plate-link">II. Projects →</Link>
                </div>
            </section>

            <Analytics />
        </div>
    );
}
