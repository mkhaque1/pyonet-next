'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FaCode, FaMobile, FaCloud, FaPaintBrush, FaWordpress, FaCubes, FaExternalLinkAlt } from 'react-icons/fa';

const services = [
  {
    id: 1,
    icon: <FaCode className="text-4xl" />,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js. We create scalable, performant solutions tailored to your needs.',
    features: [
      'Full-stack Development',
      'Progressive Web Apps',
      'E-commerce Solutions',
      'API Development',
      'Cloud Integration'
    ]
  },
  {
    id: 2,
    icon: <FaMobile className="text-4xl" />,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android platforms.',
    features: [
      'iOS Development',
      'Android Development',
      'React Native Apps',
      'App Store Optimization',
      'Mobile UI/UX Design'
    ]
  },
  {
    id: 3,
    icon: <FaCloud className="text-4xl" />,
    title: 'SaaS Development',
    description: 'End-to-end SaaS solutions that help businesses scale and succeed in the digital marketplace with subscription-based models.',
    features: [
      'Custom SaaS Platforms',
      'Multi-tenant Architecture',
      'Subscription Management',
      'Analytics Integration',
      'Automated Deployment'
    ]
  },
  {
    id: 4,
    icon: <FaPaintBrush className="text-4xl" />,
    title: 'UI/UX Design',
    description: 'User-centered design solutions that combine aesthetics with functionality to create engaging and intuitive digital experiences.',
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Usability Testing'
    ]
  },
  {
    id: 5,
    icon: <FaWordpress className="text-4xl" />,
    title: 'CMS Integration',
    description: 'Seamless integration of content management systems to empower your team with easy content updates and management.',
    features: [
      'WordPress Development',
      'Custom CMS Solutions',
      'Content Migration',
      'Plugin Development',
      'CMS Training'
    ]
  },
  {
    id: 6,
    icon: <FaCubes className="text-4xl" />,
    title: 'Micro SaaS',
    description: 'Specialized, focused software solutions that solve specific problems for niche markets with minimal overhead.',
    features: [
      'Market Research',
      'MVP Development',
      'Feature Optimization',
      'Growth Strategy',
      'Continuous Integration'
    ]
  }
];

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A modern e-commerce solution with advanced features and seamless user experience.',
    image: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
  {
    id: 2,
    title: 'Health & Fitness App',
    description: 'Mobile application for tracking fitness goals and maintaining healthy lifestyle.',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
  {
    id: 3,
    title: 'Financial Dashboard',
    description: 'Comprehensive financial management system with real-time analytics.',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
  {
    id: 4,
    title: 'Social Media Platform',
    description: 'Next-generation social networking platform with advanced features.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
];

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="relative py-16 md:py-24 overflow-hidden">
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
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg text-dark-300">
                We offer comprehensive technology solutions to help businesses thrive in the digital age.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="glass-card p-6 h-full transition-all duration-300 hover:shadow-glow relative z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-lg bg-dark-800 flex items-center justify-center mb-6 group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300">
                        {service.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                      <p className="text-dark-300 mb-6">{service.description}</p>
                      
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={hoveredService === service.id ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="flex items-center text-sm text-dark-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2"></span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section className="py-16 bg-dark-900/50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-dark-300">
                Explore some of our most innovative and impactful projects that showcase our expertise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden rounded-xl aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={hoveredProject === project.id ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-dark-200 mb-4">{project.description}</p>
                          <a
                            href={project.link}
                            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                          >
                            View Project
                            <FaExternalLinkAlt className="ml-2" />
                          </a>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}