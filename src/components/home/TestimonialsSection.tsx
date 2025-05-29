'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CTO, TechGlobal',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'Pyonet transformed our digital infrastructure completely. Their cloud solutions have increased our efficiency by 40% and significantly reduced downtime.',
  },
  {
    id: 2,
    name: 'Michael Chang',
    position: 'CEO, InnovateCorp',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'The AI integration services provided by Pyonet have revolutionized our customer service operations. We\'ve seen a 60% increase in customer satisfaction.',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    position: 'COO, DataStream',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'Pyonet\'s data analytics platform has given us insights we never thought possible. Their team\'s expertise and support are unmatched in the industry.',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section ref={ref} className="section bg-dark-900 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-900/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-dark-300">
              Don't just take our word for it. Here's what some of our clients have to say about working with Pyonet.
            </p>
          </motion.div>
        </div>
        
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card p-8 md:p-12 relative">
              <FaQuoteLeft className="text-4xl text-primary-500/30 absolute top-8 left-8" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary-500">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <p className="text-lg md:text-xl italic mb-6">"{testimonials[currentIndex].quote}"</p>
                  <div>
                    <h4 className="text-xl font-semibold">{testimonials[currentIndex].name}</h4>
                    <p className="text-dark-400">{testimonials[currentIndex].position}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full glassmorphism-light flex items-center justify-center hover:bg-dark-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary-500' : 'bg-dark-700'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full glassmorphism-light flex items-center justify-center hover:bg-dark-800 transition-colors"
                aria-label="Next testimonial"
              >
                <FaChevronRight />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}