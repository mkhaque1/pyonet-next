'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaGithub, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone 
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark-900 relative">
      {/* Background design elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary-900/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="block mb-6">
                <span className="text-2xl font-bold gradient-text">PYONET</span>
              </Link>
              <p className="text-dark-300 mb-6">
                Delivering innovative technology solutions to transform businesses and drive digital growth.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-dark-400 hover:text-primary-400 transition-colors" aria-label="Twitter">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-dark-400 hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                  <FaLinkedinIn className="text-xl" />
                </a>
                <a href="#" className="text-dark-400 hover:text-primary-400 transition-colors" aria-label="GitHub">
                  <FaGithub className="text-xl" />
                </a>
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-dark-300 hover:text-primary-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-dark-300 hover:text-primary-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-dark-300 hover:text-primary-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-dark-300 hover:text-primary-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-dark-300 hover:text-primary-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
            
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/cloud-solutions" className="text-dark-300 hover:text-primary-400 transition-colors">
                    Cloud Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services/ai-integration" className="text-dark-300 hover:text-primary-400 transition-colors">
                    AI Integration
                  </Link>
                </li>
                <li>
                  <Link href="/services/cybersecurity" className="text-dark-300 hover:text-primary-400 transition-colors">
                    Cybersecurity
                  </Link>
                </li>
                <li>
                  <Link href="/services/data-analytics" className="text-dark-300 hover:text-primary-400 transition-colors">
                    Data Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/services/custom-development" className="text-dark-300 hover:text-primary-400 transition-colors">
                    Custom Development
                  </Link>
                </li>
              </ul>
            </motion.div>
            
            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="text-primary-500 mt-1 mr-3" />
                  <span className="text-dark-300">
                    123 Innovation Drive<br />
                    San Francisco, CA 94107
                  </span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="text-primary-500 mr-3" />
                  <span className="text-dark-300">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="text-primary-500 mr-3" />
                  <a href="mailto:info@pyonet.com" className="text-dark-300 hover:text-primary-400 transition-colors">
                    info@pyonet.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass-card p-6 mt-16 mb-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              <div className="lg:col-span-3">
                <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                <p className="text-dark-300">
                  Subscribe to our newsletter to receive the latest news and updates.
                </p>
              </div>
              <div className="lg:col-span-2">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="glass-input px-4 py-2 flex-1"
                    aria-label="Email address"
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-dark-800 text-center">
            <p className="text-dark-400 text-sm">
              &copy; {new Date().getFullYear()} Pyonet Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}