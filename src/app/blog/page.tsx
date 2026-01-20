'use client';

import Link from 'next/link';
import { Analytics } from "@vercel/analytics/next"

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
    <div className="space-y-12">
      <header className="mb-12">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-isabelline tracking-tight">Notes</h1>
          <p className="text-rose_quartz text-sm leading-relaxed">
            Course materials and lecture notes from my undergraduate studies.
          </p>
        </div>
      </header>

      <div className="space-y-16">
        {terms.map((term) => (
          <section key={term.name} className="space-y-8">
            <h2 className="text-xl font-serif font-bold text-pale_dogwood border-b border-white/5 pb-2">
              {term.name}
            </h2>
            <div className="space-y-8">
              {term.courses.map((repo) => (
                <div key={repo.code} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group">
                  {/* Icon/Code Box */}
                  <div className="shrink-0 w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-center p-1 text-rose_quartz group-hover:border-white/20 transition-colors">
                    {repo.code.replace(' ', '\n')}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-isabelline group-hover:text-white transition-colors">
                      <a href={repo.repository} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-white/30 underline-offset-4">
                        {repo.title}
                      </a>
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs uppercase tracking-wider text-pale_dogwood">{repo.code}</span>
                      <span className="text-white/10 text-xs">•</span>
                      <a href={repo.repository} target="_blank" rel="noopener noreferrer" className="text-sm text-rose_quartz hover:text-isabelline transition-colors">View PDF</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <hr className="border-white/10" />

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