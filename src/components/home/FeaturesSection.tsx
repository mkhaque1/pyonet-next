'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    id: 1,
    title: 'Intuitive Dashboard',
    description: 'Our easy-to-use dashboard gives you complete visibility into your projects and performance metrics.',
  },
  {
    id: 2,
    title: 'Advanced Analytics',
    description: 'Gain valuable insights with our powerful analytics tools that transform data into actionable information.',
  },
  {
    id: 3,
    title: 'Secure Infrastructure',
    description: 'Enterprise-grade security protocols ensure your data and systems are protected at all times.',
  },
  {
    id: 4,
    title: 'Seamless Integration',
    description: 'Our solutions integrate effortlessly with your existing technology stack for a smooth transition.',
  },
  {
    id: 5,
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to assist with any issues or questions.',
  },
  {
    id: 6,
    title: 'Scalable Architecture',
    description: 'Our technology grows with your business, ensuring you never outgrow your solutions.',
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <section className="section bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-noise"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powerful Features for Your <span className="gradient-text">Digital Success</span>
            </h2>
            <p className="text-dark-300 mb-12">
              Our platform is designed with cutting-edge features to ensure your business thrives in the digital landscape. Discover how our technology can transform your operations.
            </p>
            
            <motion.div 
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature) => (
                <motion.div 
                  key={feature.id} 
                  variants={itemVariants}
                  className="glass-card p-5 transition-all duration-300 hover:shadow-glow"
                >
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-dark-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
                <div className="glassmorphism p-1 rounded-2xl relative">
                  <img 
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Pyonet Dashboard" 
                    className="rounded-xl w-full h-auto"
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 glassmorphism p-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                    <span className="text-xs font-medium">System Online</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 right-12 glassmorphism p-3 rounded-lg shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-xs font-medium">Data Processing</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Background design elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-900/30 rounded-full filter blur-2xl"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-900/30 rounded-full filter blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}