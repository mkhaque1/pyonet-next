'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900/95 to-dark-900 z-0"></div>
      
      {/* Animated background using Spline */}
      <div className="absolute inset-0 z-0 opacity-60">
        {!isMobile && !splineError && (
          <>
            {!isSplineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <Spline 
              scene="https://prod.spline.design/TRovpEUlcrWNlqhn/scene.splinecode" 
              onLoad={() => setIsSplineLoaded(true)}
              onError={() => setSplineError(true)}
            />
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 pt-20 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Innovative <span className="gradient-text">Tech Solutions</span> for Tomorrow&apos;s Challenges
            </h1>
            <p className="text-lg md:text-xl text-dark-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Pyonet delivers cutting-edge technology services to transform your business and drive growth in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link href="/services" className="btn btn-outline btn-lg">
                Explore Services
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-dark-800 overflow-hidden">
                    <img 
                      src={`https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600`} 
                      alt="Client" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-dark-300 text-sm">Trusted by <span className="text-primary-400 font-medium">500+</span> clients</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
              <div className="glassmorphism-strong p-1 rounded-2xl relative">
                <img 
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Pyonet Technology" 
                  className="rounded-xl w-full h-auto"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 glassmorphism p-4 rounded-xl animate-float shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  <span className="text-sm font-medium">100% Uptime</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 glassmorphism p-4 rounded-xl animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Clients or tech logos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 py-8 border-t border-dark-800"
        >
          <p className="text-center text-dark-400 text-sm mb-6">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Google', 'Microsoft', 'Amazon', 'IBM', 'Oracle'].map((company) => (
              <div key={company} className="text-dark-400 text-lg font-mono">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}