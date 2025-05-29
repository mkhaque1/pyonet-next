'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { FaSearch } from 'react-icons/fa';

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Cloud Computing: Trends to Watch in 2025',
    slug: 'future-of-cloud-computing-2025',
    excerpt: 'Explore the emerging trends in cloud computing that are set to reshape the technology landscape in 2025 and beyond.',
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Cloud Computing',
    date: '2025-01-15',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'Implementing Zero-Trust Security Models for Modern Enterprises',
    slug: 'zero-trust-security-modern-enterprises',
    excerpt: 'Learn how zero-trust security architectures are becoming essential for businesses to protect against sophisticated cyber threats.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Cybersecurity',
    date: '2025-02-03',
    readTime: '10 min read',
  },
  {
    id: 3,
    title: 'How AI is Transforming Data Analytics for Business Intelligence',
    slug: 'ai-transforming-data-analytics',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way businesses analyze data and derive actionable insights.',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'AI & Analytics',
    date: '2025-02-18',
    readTime: '7 min read',
  },
  {
    id: 4,
    title: 'Building Scalable Microservices Architectures for Enterprise Applications',
    slug: 'scalable-microservices-architectures',
    excerpt: 'A comprehensive guide to designing, implementing, and managing microservices architectures that scale with your business.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Software Architecture',
    date: '2025-03-05',
    readTime: '12 min read',
  },
];

// Categories
const categories = [
  'All',
  'Cloud Computing',
  'Cybersecurity',
  'AI & Analytics',
  'Software Architecture',
  'Digital Transformation',
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background design elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-900/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-900/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-lg text-dark-300 mb-8">
                Insights, tutorials, and updates from the Pyonet team on the latest trends in technology.
              </p>
              
              {/* Search bar */}
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input pl-12 pr-4 py-3 w-full rounded-xl"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Category filter */}
        <section className="py-6">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'glassmorphism-light hover:bg-dark-800/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog posts */}
        <section className="py-8">
          <div className="container-custom">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-dark-300 text-lg">No articles found matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 btn btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}