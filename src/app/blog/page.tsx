'use client';

import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';
import { getAllBlogPosts } from '@/data/blogPosts';

export default function Notes() {
  const courseRepositories = [
    {
      id: 1,
      title: "APSC 221 - Economics and Business Practice for Engineers",
      repository: "/documents/APSC 221 Economics and Business Practice_lectures.pdf"
    }
  ];

  const blogPosts = getAllBlogPosts();

  return (
    <>
      <main className="min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-8 text-center">
            Notes
          </h1>
          
          {/* Course Note Repositories Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-navy-900 dark:text-white mb-6">
              Course Note Repositories
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courseRepositories.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-navy-200 dark:border-navy-700"
                >
                  <h3 className="text-lg font-semibold text-navy-900 dark:text-blue-100 mb-4">
                    {repo.title}
                  </h3>
                  <a
                    href={repo.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-navy-800 hover:bg-navy-900 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View Notes
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Blog Posts Section */}
          <section>
            <h2 className="text-2xl font-semibold text-navy-900 dark:text-white mb-6">
              Blog Posts
            </h2>
            <div className="space-y-6">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-semibold text-navy-900 dark:text-blue-100 mb-2 sm:mb-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <span className="text-sm text-navy-600 dark:text-blue-300">
                      {post.date}
                    </span>
                  </div>
                  
                  <p className="text-navy-700 dark:text-blue-200 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <BottomNavigation />
    </>
  );
} 