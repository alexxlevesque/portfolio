export interface BookReview {
  id: number;
  title: string;
  author: string;
  categories: string[];
  rating: number;
  date: string;
  excerpt: string;
  slug: string;
  fullReview: string;
  coverImage?: string; // Optional path to cover image
}

export const bookReviews: BookReview[] = [
  {
    id: 1,
    title: "An Elementary Introduction to Mathematical Finance",
    author: "Sheldon M. Ross",
    categories: ["finance", "math"],
    rating: 4.5,
    date: "Unfinished",
    excerpt: "An introduction to the basics of financial mathematics, including topics in probability theory, stochastic processes, brownian motion, and options.",
    slug: "sample-finance-book",
    coverImage: "/images/book-covers/mathematical-finance.jpg",
    fullReview: `
      <p>This book was my first attempt at learning about mathematical finance. I read this book on my commute to my freshman internship and it served as a proper introduction to quant finance.</p>
      
      <h3>What I Liked</h3>
      <p>The book uses proofs and examples well to explain the concepts. It also has practice problems at the end of each chapter. In my opinion, these are necessary to solidify the concepts in your mind.</p>
      
      <p>The most memorable chapter for me was the probability theory section, which likely has direct applications to trading/quant interviews. I also wanted to learn this topic effectively before my probability classes.</p>
      
      <h3>Key Insights</h3>
      <p>Once again, one of the most important parts of this book was the practice problems. I would recommend doing them as you are reading the following chapter.</p>

      <h3>Areas for Improvement</h3>
      <p>While proofs are necessary to understand the background of some concepts, some are skippable and unnecessary for the average reader.</p>
    `
  }
];

// Helper function to get a book by slug
export function getBookBySlug(slug: string): BookReview | undefined {
  return bookReviews.find(book => book.slug === slug);
}

// Helper function to get all books
export function getAllBooks(): BookReview[] {
  return bookReviews;
}

// Helper function to get categories with counts
export function getCategories() {
  const categories = [
    { id: 'all', name: 'All Books', count: bookReviews.length },
    { id: 'finance', name: 'Finance', count: bookReviews.filter(b => b.categories.includes('finance')).length },
    { id: 'math', name: 'Math', count: bookReviews.filter(b => b.categories.includes('math')).length },
    { id: 'computer-science', name: 'Computer Science', count: bookReviews.filter(b => b.categories.includes('computer-science')).length },
    { id: 'ai', name: 'AI', count: bookReviews.filter(b => b.categories.includes('ai')).length },
    { id: 'psychology', name: 'Psychology', count: bookReviews.filter(b => b.categories.includes('psychology')).length }
  ];
  
  return categories;
} 