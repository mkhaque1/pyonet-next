'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaProjectDiagram, FaFileInvoiceDollar, FaUserCircle, FaChartLine, FaCog, FaSignOutAlt, FaBell, FaSearch, FaUsers } from 'react-icons/fa';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'admin' | 'client';
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);
  
  const adminNavItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/dashboard/admin' },
    { name: 'Projects', icon: <FaProjectDiagram />, path: '/dashboard/admin/projects' },
    { name: 'Clients', icon: <FaUsers />, path: '/dashboard/admin/clients' },
    { name: 'Invoices', icon: <FaFileInvoiceDollar />, path: '/dashboard/admin/invoices' },
    { name: 'Analytics', icon: <FaChartLine />, path: '/dashboard/admin/analytics' },
    { name: 'Settings', icon: <FaCog />, path: '/dashboard/admin/settings' },
  ];
  
  const clientNavItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/dashboard/client' },
    { name: 'Projects', icon: <FaProjectDiagram />, path: '/dashboard/client/projects' },
    { name: 'Invoices', icon: <FaFileInvoiceDollar />, path: '/dashboard/client/invoices' },
    { name: 'Profile', icon: <FaUserCircle />, path: '/dashboard/client/profile' },
  ];
  
  const navItems = userType === 'admin' ? adminNavItems : clientNavItems;
  
  const handleSignOut = () => {
    // Implement sign out logic here
    router.push('/');
  };
  
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 z-40 h-screen w-64 glassmorphism-strong border-r border-dark-800 ${
              isMobile ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="px-6 py-6 flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold gradient-text">PYONET</span>
              </Link>
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-dark-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            <div className="px-3 py-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`flex items-center px-3 py-3 rounded-lg text-sm ${
                        pathname === item.path
                          ? 'bg-primary-500 text-white'
                          : 'text-dark-200 hover:bg-dark-800 hover:text-white'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-dark-800 mt-6 pt-6">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-3 py-3 rounded-lg text-sm text-dark-200 hover:bg-dark-800 hover:text-white"
                >
                  <FaSignOutAlt className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main content */}
      <div className={`${isSidebarOpen ? 'md:ml-64' : ''} transition-all duration-300`}>
        {/* Header */}
        <header className="glassmorphism-strong border-b border-dark-800 sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-dark-400 hover:text-white mr-4"
                  aria-label="Open sidebar"
                >
                  <FaBars />
                </button>
              )}
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="glass-input pl-10 pr-4 py-2 w-64 rounded-lg text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
              </div>
            </div>
            
            <div className="flex items-center">
              <button className="p-2 text-dark-400 hover:text-white relative">
                <FaBell />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
              </button>
              <div className="ml-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-dark-700 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:block">
                  {userType === 'admin' ? 'Admin User' : 'Client User'}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}