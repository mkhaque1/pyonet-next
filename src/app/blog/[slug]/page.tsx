'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaCopy, FaCheck } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Sample blog posts data (in a real app, this would come from an API/database)
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Cloud Computing: Trends to Watch in 2025',
    slug: 'future-of-cloud-computing-2025',
    excerpt: 'Explore the emerging trends in cloud computing that are set to reshape the technology landscape in 2025 and beyond.',
    content: `
      <p>Cloud computing continues to evolve at a rapid pace, transforming how businesses operate and innovate. As we look ahead to 2025, several key trends are emerging that will shape the future of cloud technology.</p>
      
      <h2>1. Edge Computing Integration</h2>
      <p>The integration of edge computing with cloud infrastructure is becoming increasingly important as organizations seek to process data closer to its source. This hybrid approach enables faster response times and reduced bandwidth usage.</p>
      
      <h2>2. AI-Driven Cloud Operations</h2>
      <p>Artificial Intelligence is revolutionizing how cloud systems are managed and optimized. AI-powered tools are automating routine tasks, predicting system failures, and optimizing resource allocation in real-time.</p>
      
      <h2>3. Sustainable Cloud Computing</h2>
      <p>Environmental concerns are driving the adoption of green cloud computing practices. Data centers are increasingly powered by renewable energy sources and designed for maximum energy efficiency.</p>
    `,
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Cloud Computing',
    date: '2025-01-15',
    readTime: '8 min read',
    author: {
      name: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Cloud Architect'
    }
  },
  {
    id: 2,
    title: 'Implementing Zero-Trust Security Models for Modern Enterprises',
    slug: 'zero-trust-security-modern-enterprises',
    excerpt: 'Learn how zero-trust security architectures are becoming essential for businesses to protect against sophisticated cyber threats.',
    content: `
      <p>As cyber threats become more sophisticated, traditional security models are no longer sufficient. Zero-trust security has emerged as a crucial framework for protecting modern enterprises.</p>
      
      <h2>Understanding Zero-Trust</h2>
      <p>Zero-trust security operates on the principle of "never trust, always verify." Every access request is treated as if it originates from an untrusted network.</p>
      
      <h2>Key Components</h2>
      <p>A comprehensive zero-trust architecture includes identity verification, device validation, and access control at multiple levels throughout the network.</p>
      
      <h2>Implementation Strategies</h2>
      <p>Successful implementation requires a phased approach, starting with critical assets and gradually expanding across the organization's infrastructure.</p>
    `,
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Cybersecurity',
    date: '2025-02-03',
    readTime: '10 min read',
    author: {
      name: 'Michael Chang',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Security Expert'
    }
  },
  {
    id: 3,
    title: 'How AI is Transforming Data Analytics for Business Intelligence',
    slug: 'ai-transforming-data-analytics',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way businesses analyze data and derive actionable insights.',
    content: `
      <p>Artificial Intelligence is revolutionizing how businesses analyze and interpret data, leading to more accurate insights and better decision-making.</p>
      
      <h2>AI-Powered Analytics</h2>
      <p>Machine learning algorithms can process vast amounts of data quickly, identifying patterns and trends that might be missed by traditional analysis methods.</p>
      
      <h2>Predictive Analytics</h2>
      <p>AI enables businesses to move from descriptive to predictive analytics, forecasting future trends and potential outcomes with greater accuracy.</p>
      
      <h2>Automated Insights</h2>
      <p>Natural Language Processing (NLP) allows systems to generate automated reports and insights, making data analytics more accessible to non-technical users.</p>
    `,
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'AI & Analytics',
    date: '2025-02-18',
    readTime: '7 min read',
    author: {
      name: 'Emily Rodriguez',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Data Scientist'
    }
  }
];

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find(post => post.slug === slug);
    setPost(currentPost);
    
    // Find related posts (same category, excluding current post)
    if (currentPost) {
      const related = blogPosts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [slug]);
  
  if (!post) {
    return <div>Loading...</div>;
  }
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = (platform: string) => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(shareUrl);
    
    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-900/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-900/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-sm text-dark-400 mb-4">
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span>{post.category}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={post.author.image} 
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-sm text-dark-400">{post.author.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-dark-400">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Content */}
        <section className="py-8">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="glass-card overflow-hidden mb-8">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                
                <div className="prose prose-dark max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
                
                {/* Share buttons */}
                <div className="mt-12 pt-8 border-t border-dark-800">
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary-900/50 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary-900/50 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary-900/50 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedinIn />
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary-900/50 transition-colors"
                      aria-label="Copy link"
                    >
                      {copied ? <FaCheck className="text-success-500" /> : <FaCopy />}
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Author card */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">About the Author</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={post.author.image} 
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-sm text-dark-400">{post.author.role}</div>
                    </div>
                  </div>
                </div>
                
                {/* Related posts */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id} 
                        href={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedPost.image} 
                              alt={relatedPost.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium line-clamp-2 group-hover:text-primary-400 transition-colors">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-dark-400 mt-1">
                              {relatedPost.readTime}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Categories */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Cloud Computing', 'Cybersecurity', 'AI & Analytics', 'Software Architecture'].map((category) => (
                      <Link
                        key={category}
                        href={`/blog?category=${encodeURIComponent(category)}`}
                        className="px-3 py-1 text-sm rounded-full glass-card hover:bg-primary-900/50 transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}