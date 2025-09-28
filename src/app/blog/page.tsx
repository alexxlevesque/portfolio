'use client';

export default function Notes() {
  const courseRepositories = [
    {
      id: 1,
      title: 'APSC 221 — Economics and Business Practice for Engineers',
      repository: '/documents/APSC 221 Economics and Business Practice_lectures.pdf',
    },
  ];

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">notes</h1>
        <p className="mt-2 text-sm text-ultra-violet">course materials and notes from my undergraduate studies.</p>
      </header>

      <section className="mb-10">
        <h2 className="text-sm uppercase tracking-widest text-ultra-violet">course repositories</h2>
        <div className="mt-3 space-y-3 text-[15px] leading-7">
          {courseRepositories.map((repo) => (
            <p key={repo.id}>
              &gt; {repo.title} —{' '}
              <a href={repo.repository} target="_blank" rel="noopener noreferrer" className="underline">view pdf</a>
            </p>
          ))}
        </div>
      </section>

    </main>
  );
}