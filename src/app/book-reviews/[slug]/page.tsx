import { getBookReviewBySlug, getBookReviewContent } from '@/lib/markdown';
import BottomNavigation from '@/components/BottomNavigation';
import { notFound } from 'next/navigation';

interface BookReviewPageProps {
  params: {
    slug: string;
  };
}

export default async function BookReviewPage({ params }: BookReviewPageProps) {
  const bookReview = getBookReviewBySlug(params.slug);
  
  if (!bookReview) {
    notFound();
  }

  const content = await getBookReviewContent(params.slug);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
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
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
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
          {/* Back Button */}
          <div className="mb-6">
            <a
              href="/book-reviews"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              ← Back to Book Reviews
            </a>
          </div>

          {/* Book Header */}
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-4">
              {bookReview.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <p className="text-lg text-navy-600 dark:text-blue-300 mb-2">
                  by {bookReview.author}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">
                    {renderStars(bookReview.rating)}
                  </div>
                  <span className="text-sm text-navy-600 dark:text-blue-300">
                    {bookReview.rating}/5
                  </span>
                </div>
              </div>
              <span className="text-sm text-navy-600 dark:text-blue-300 mt-2 sm:mt-0">
                {bookReview.date}
              </span>
            </div>

            <p className="text-navy-700 dark:text-blue-200 mb-4">
              {bookReview.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {bookReview.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm capitalize"
                >
                  {category.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Book Review Content */}
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6">
            <div 
              className="prose prose-lg max-w-none text-gray-900 dark:text-white prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-200 prose-li:text-gray-700 dark:prose-li:text-gray-200 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-200 prose-code:text-gray-900 dark:prose-code:text-white prose-pre:text-gray-900 dark:prose-pre:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </main>
      <BottomNavigation />
    </>
  );
} 