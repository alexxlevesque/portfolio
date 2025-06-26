'use client';

import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Sample Blog Post Title",
      date: "January 15, 2025",
      excerpt: "This is a placeholder for a blog post. You can add your random writeups here.",
      slug: "sample-blog-post"
    },
    {
      id: 2,
      title: "Another Interesting Topic",
      date: "January 10, 2025",
      excerpt: "Another placeholder blog post that you can replace with your actual content.",
      slug: "another-interesting-topic"
    },
    // Add more blog posts as needed
  ];

  return (
    <>
      <main className="min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-8 text-center">
            Blog
          </h1>
          
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-xl font-semibold text-navy-900 dark:text-blue-100 mb-2 sm:mb-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <span className="text-sm text-navy-600 dark:text-blue-300">
                    {post.date}
                  </span>
                </div>
                
                <p className="text-navy-700 dark:text-blue-200 mb-4">
                  {post.excerpt}
                </p>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <BottomNavigation />
    </>
  );
} 