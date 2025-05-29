'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-secondary-900/30"></div>
      
      {/* Background design elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-noise"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary-500/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Your Business?
          </h2>
          <p className="text-dark-300 text-lg mb-8 max-w-2xl mx-auto">
            Join the hundreds of businesses that have accelerated their growth with Pyonet's innovative technology solutions. Let's build your digital future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}