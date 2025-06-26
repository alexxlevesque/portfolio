import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const bookReviewsDirectory = path.join(process.cwd(), 'content/book-reviews');

export interface BookReview {
  slug: string;
  title: string;
  author: string;
  categories: string[];
  rating: number;
  date: string;
  excerpt: string;
  content: string;
}

export function getAllBookReviews(): BookReview[] {
  const fileNames = fs.readdirSync(bookReviewsDirectory);
  const allBookReviews = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(bookReviewsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        author: data.author,
        categories: data.categories,
        rating: data.rating,
        date: data.date,
        excerpt: data.excerpt,
        content,
      };
    });

  return allBookReviews.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBookReviewBySlug(slug: string): BookReview | null {
  try {
    const fullPath = path.join(bookReviewsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      author: data.author,
      categories: data.categories,
      rating: data.rating,
      date: data.date,
      excerpt: data.excerpt,
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function getBookReviewContent(slug: string): Promise<string> {
  const bookReview = getBookReviewBySlug(slug);
  if (!bookReview) {
    throw new Error(`Book review not found: ${slug}`);
  }

  const processedContent = await remark()
    .use(html)
    .process(bookReview.content);
  
  return processedContent.toString();
} 