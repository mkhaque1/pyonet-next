'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glassmorphism-strong shadow-lg' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <span className="text-2xl font-bold gradient-text">PYONET</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium hover:text-primary-400 transition-colors ${
                  pathname === link.path ? 'text-primary-400' : 'text-dark-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-sm hover:text-primary-400 transition-colors"
                >
                  <FaUserCircle className="text-xl" />
                  <span>{session.user?.name || 'User'}</span>
                </button>
                
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 glassmorphism-strong rounded-md shadow-lg py-1 z-10"
                    >
                      <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-dark-800 transition-colors">
                        Dashboard
                      </Link>
                      <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-dark-800 transition-colors">
                        Profile
                      </Link>
                      <button 
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-dark-800 transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-sm font-medium hover:text-primary-400 transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  href="/auth/register" 
                  className="btn btn-primary btn-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-dark-200 hover:text-primary-400 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glassmorphism-strong shadow-lg"
          >
            <div className="container-custom py-6">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm font-medium hover:text-primary-400 transition-colors ${
                      pathname === link.path ? 'text-primary-400' : 'text-dark-200'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-dark-700">
                  {session ? (
                    <>
                      <Link href="/dashboard" className="block py-2 text-sm hover:text-primary-400 transition-colors">
                        Dashboard
                      </Link>
                      <Link href="/profile" className="block py-2 text-sm hover:text-primary-400 transition-colors">
                        Profile
                      </Link>
                      <button 
                        onClick={() => signOut()}
                        className="block py-2 text-sm hover:text-primary-400 transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/auth/login" 
                        className="block py-2 text-sm font-medium hover:text-primary-400 transition-colors"
                      >
                        Log In
                      </Link>
                      <Link 
                        href="/auth/register" 
                        className="btn btn-primary btn-sm mt-2 w-full"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}