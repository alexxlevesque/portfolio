'use client';

import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getBlogPostBySlug, BlogPost } from '@/data/blogPosts';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPost = getBlogPostBySlug(slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <>
        <main className="min-h-screen pb-20 pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <BottomNavigation />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <main className="min-h-screen pb-20 pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">
                Blog Post Not Found
              </h1>
              <p className="text-navy-600 dark:text-blue-300 mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </main>
        <BottomNavigation />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          {/* Blog Post Header */}
          <article className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="flex-grow">
                  <h1 className="text-3xl font-bold text-navy-900 dark:text-blue-100 mb-3">
                    {post.title}
                  </h1>
                </div>
                <span className="text-sm text-navy-600 dark:text-blue-300 mt-2 sm:mt-0">
                  {post.date}
                </span>
              </div>
              
              <p className="text-lg text-navy-700 dark:text-blue-200 mb-4">
                {post.excerpt}
              </p>

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm capitalize"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Full Blog Post Content */}
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6">
            <div 
              className="prose prose-lg max-w-none text-navy-700 dark:text-blue-200"
              dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
            />
          </div>
        </div>
      </main>
      <BottomNavigation />
    </>
  );
} 