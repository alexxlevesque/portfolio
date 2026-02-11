'use client';

import Link from 'next/link';
import { Analytics } from "@vercel/analytics/next"
import BookCard from '@/components/BookCard';

export default function Library() {
    const books = [
        {
            title: "Elementary Introduction to Mathematical Finance",
            author: "Sheldon Ross",
            rating: "4/5",
            thoughts: "A thorough walkthrough of the mathematical foundations of finance. I'm not sure if I took much away from this book as I read this book early in my undergrad, however it definitely spiked my interest in understanding mathematical systems behind finance and data science implications.",
            imageSrc: "/books/elementaryintroductiontomathematicalfinance.jpg" // Placeholder path, user can update
        },
        {
            title: "Critique of Pure Reason",
            author: "Immanuel Kant",
            rating: "4/5",
            thoughts: "Incredibly dense and a hard read, but perfect for one who follows rationalist philosophy. Although Kant's ideas were very disputed, they follow strict logic and are present thoroughly. As a beginner, I found it to be tough to grasp, but it was a good introduction to the subject.",
            imageSrc: "/books/critiqueofpurereason.jpg" // Placeholder path
        },
        {
            title: "Becoming a Data Head",
            author: "Alex J. Gutman and Jordan Goldmeier",
            rating: "5/5",
            thoughts: "Excellent book for anyone from an experienced data scientist to someone looking for a spark of interest in the field and usage of data. I remember using some ideas from this book in interviews to effectively articulate my interest in data science.",
            imageSrc: "/books/datahead.jpg" // Placeholder path
        },
        // Add more books here
    ];

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
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-isabelline tracking-tight">Library</h1>
                <p className="text-rose_quartz text-sm leading-relaxed max-w-2xl">
                    A collection of books that have shaped my thinking and lecture notes from my engineering studies.
                </p>
            </header>

            {/* Books Section */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h2 className="text-xl font-serif font-bold text-pale_dogwood">
                        Bookshelf
                    </h2>
                    <span className="text-xs text-white/30 uppercase tracking-wider">Reading List</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book, index) => (
                        <BookCard key={index} {...book} />
                    ))}
                </div>
            </section>

            {/* Notes Section */}
            <section className="space-y-12">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h2 className="text-xl font-serif font-bold text-pale_dogwood">
                        Lecture Notes
                    </h2>
                    <span className="text-xs text-white/30 uppercase tracking-wider">Queen's University</span>
                </div>

                <div className="space-y-10">
                    {terms.map((term) => (
                        <div key={term.name} className="space-y-4">
                            <h3 className="text-sm font-bold text-rose_quartz uppercase tracking-wider">
                                {term.name}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {term.courses.map((repo) => (
                                    <div key={repo.code} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center group bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10">
                                        {/* Icon/Code Box */}
                                        <div className="shrink-0 w-12 h-12 rounded bg-space_cadet/30 border border-white/10 flex items-center justify-center text-[10px] font-bold text-center text-pale_dogwood">
                                            {repo.code}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-base font-bold text-isabelline group-hover:text-white transition-colors truncate">
                                                <a href={repo.repository} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-white/30 underline-offset-4">
                                                    {repo.title}
                                                </a>
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <a href={repo.repository} target="_blank" rel="noopener noreferrer" className="text-xs text-rose_quartz hover:text-isabelline transition-colors flex items-center gap-1">
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
                <div className="flex flex-wrap gap-6 text-sm text-pale_dogwood uppercase tracking-wider font-medium">
                    <Link href="/" className="hover:text-isabelline transition-colors">Home</Link>
                    <Link href="/projects" className="hover:text-isabelline transition-colors">Projects</Link>
                </div>
            </section>

            <Analytics />
        </div>
    );
}
