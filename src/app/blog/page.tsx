'use client';

import { Analytics } from "@vercel/analytics/next"

export default function Notes() {
  const courseRepositories = [
    {
      id: 1,
      title: 'APSC 221 — Economics and Business Practice for Engineers',
      repository: '/documents/APSC 221 Economics and Business Practice_lectures.pdf',
    },
    {
      id: 2,
      title: 'ELEC 271 — Digital Systems',
      repository: '/documents/ELEC 271 Digital Systems_lectures.pdf',
    },
    {
      id: 3,
      title: 'ELEC 278 — Fundamentals of Information Structures',
      repository: '/documents/ELEC 278 Fundamentals Of Information Structures_lectures.pdf',
    },
    {
      id: 4,
      title: 'MTHE 217 — Algebraic Structures with Applications',
      repository: '/documents/MTHE 217 Algebraic Structures with Applications_lectures.pdf',
    },
    {
      id: 5,
      title: 'MTHE 237 — Differential Equations for Engineering Science',
      repository: '/documents/MTHE 237 Differential Equations for Engineering Science_lectures.pdf',
    },
    {
      id: 6,
      title: 'MTHE 280 — Advanced Calculus',
      repository: '/documents/MTHE 280 Advanced Calculus_lectures.pdf',
    },
  ];

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">notes</h1>
        <p className="mt-2 text-sm text-pale-dogwood">course materials and notes from my undergraduate studies.</p>
      </header>

      <section className="mb-10">
        <h2 className="text-sm uppercase tracking-widest text-pale-dogwood">course repositories</h2>
        <div className="mt-3 space-y-3 text-[15px] leading-7">
          {courseRepositories.map((repo) => (
            <p key={repo.id}>
              &gt; {repo.title} —{' '}
              <a href={repo.repository} target="_blank" rel="noopener noreferrer" className="underline">view pdf</a>
            </p>
          ))}
        </div>
      </section>

      <Analytics />
    </main>
  );
}