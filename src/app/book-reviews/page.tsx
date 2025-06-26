import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';
import { getAllBookReviews } from '@/lib/markdown';
import BookReviewsClient from './BookReviewsClient';

export default function BookReviews() {
  const bookReviews = getAllBookReviews();

  return (
    <>
      <main className="min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-8 text-center">
            Book Reviews
          </h1>
          
          <BookReviewsClient bookReviews={bookReviews} />
        </div>
      </main>
      <BottomNavigation />
    </>
  );
} 