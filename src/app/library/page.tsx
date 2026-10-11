'use client';

import Link from 'next/link';
import { Analytics } from "@vercel/analytics/next"
import RisoTitle from '@/components/RisoTitle';

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
            {/* Header */}
            <header className="space-y-4">
                <RisoTitle className="riso-display text-6xl sm:text-8xl">Notes</RisoTitle>
                <p className="text-lg leading-relaxed max-w-2xl">
                    Lecture notes from my engineering studies at Queen&apos;s University.
                </p>

                {/* External Links */}
                <div className="pt-2 flex flex-wrap gap-3">
                    <a href="https://boxd.it/kmZFf" target="_blank" rel="noopener noreferrer" className="riso-button">Letterboxd</a>
                    <a href="https://www.goodreads.com/user/show/202046676-alex-levesque" target="_blank" rel="noopener noreferrer" className="riso-button">Goodreads</a>
                </div>
            </header>

            {/* Notes Section */}
            <section className="space-y-12">

                <div className="space-y-10">
                    {terms.map((term) => (
                        <div key={term.name} className="space-y-4">
                            <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
                                <span className="riso-highlight">{term.name}</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {term.courses.map((repo) => (
                                    <div key={repo.code} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center group bg-paper p-4 border-2 border-ink-blue transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-plate-sm motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0">
                                        {/* Icon/Code Box */}
                                        <div className="shrink-0 w-14 h-14 p-1.5 bg-ink-blue flex items-center justify-center font-mono text-[11px] leading-tight font-bold text-center text-paper transition-colors group-hover:bg-ink-yellow group-hover:text-ink-blue">
                                            {repo.code}
                                        </div>

                                        <div className="flex-1 min-w-0 w-full">
                                            <h4 className="text-lg font-bold leading-snug sm:truncate">
                                                <a href={repo.repository} target="_blank" rel="noopener noreferrer" className="hover:riso-mark">
                                                    {repo.title}
                                                </a>
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <a href={repo.repository} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wider hover:bg-ink-yellow flex items-center gap-1">
                                                    <span>View PDF</span>
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div className="flex flex-wrap gap-3 border-t-2 border-dashed border-ink-blue/60 pt-8">
                    <Link href="/" className="riso-button">Home</Link>
                    <Link href="/projects" className="riso-button">Projects</Link>
                </div>
            </section>

            <Analytics />
        </div>
    );
}
