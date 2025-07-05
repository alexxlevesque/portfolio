'use client';

import BottomNavigation from '@/components/BottomNavigation';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBooks, getCategories } from '@/data/bookReviews';

export default function BookReviews() {
  const [activeCategory, setActiveCategory] = useState('all');

  const bookReviews = getAllBooks();
  const categories = getCategories();

  const filteredBooks = useMemo(() => {
    return bookReviews.filter(book => 
      activeCategory === 'all' || book.categories.includes(activeCategory)
    );
  }, [activeCategory]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <>
      <main className="min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-8 text-center">
            Book Reviews
          </h1>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ease-in-out ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-blue-200 hover:bg-navy-200 dark:hover:bg-navy-700'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
          
          <div className="space-y-6">
            {filteredBooks.map((book) => (
              <article
                key={book.id}
                className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Book Cover */}
                  {book.coverImage && (
                    <div className="flex-shrink-0">
                      <div className="w-32 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                        {/* Debug: Show image path */}
                        <div className="text-xs text-red-500 p-1 bg-white">
                          {book.coverImage}
                        </div>
                        <Image
                          src={book.coverImage}
                          alt={`Cover of ${book.title}`}
                          width={128}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Book Information */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div className="flex-grow">
                        <h2 className="text-xl font-semibold text-navy-900 dark:text-blue-100 mb-2">
                          <Link
                            href={`/book-reviews/${book.slug}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {book.title}
                          </Link>
                        </h2>
                        <p className="text-navy-600 dark:text-blue-300 mb-2">
                          by {book.author}
                        </p>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {renderStars(book.rating)}
                          </div>
                          <span className="text-sm text-navy-600 dark:text-blue-300">
                            {book.rating}/5
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-navy-600 dark:text-blue-300 mt-2 sm:mt-0">
                        {book.date}
                      </span>
                    </div>
                    
                    <p className="text-navy-700 dark:text-blue-200 mb-4">
                      {book.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {book.categories.map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm capitalize"
                          >
                            {category.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={`/book-reviews/${book.slug}`}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        Read review →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <BottomNavigation />
    </>
  );
} 