import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="glass-card overflow-hidden h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-primary-500 text-white rounded-full">
              {post.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center text-sm text-dark-400 mb-3">
            <time dateTime={post.date}>{formattedDate}</time>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
          <p className="text-dark-300 mb-4 line-clamp-3">{post.excerpt}</p>
          
          <div className="mt-auto">
            <span className="text-primary-400 text-sm font-medium inline-flex items-center group">
              Read More
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}