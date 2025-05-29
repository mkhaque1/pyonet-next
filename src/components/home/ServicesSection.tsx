'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaCloudUploadAlt, 
  FaRobot, 
  FaShieldAlt, 
  FaChartLine 
} from 'react-icons/fa';

const services = [
  {
    id: 1,
    icon: <FaCloudUploadAlt className="text-4xl text-primary-500" />,
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure designed for your business needs with 24/7 monitoring.',
  },
  {
    id: 2,
    icon: <FaRobot className="text-4xl text-secondary-500" />,
    title: 'AI Integration',
    description: 'Cutting-edge artificial intelligence solutions to automate and optimize your business processes.',
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-4xl text-accent-500" />,
    title: 'Cybersecurity',
    description: 'Comprehensive security services to protect your data and systems from evolving threats.',
  },
  {
    id: 4,
    icon: <FaChartLine className="text-4xl text-success-500" />,
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights with our advanced analytics solutions.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section className="section bg-dark-900 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-900/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary-900/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-dark-300">
            We offer a comprehensive range of technology services tailored to meet your business objectives and drive digital transformation.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="glass-card p-6 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-dark-800 group-hover:bg-gradient-to-r group-hover:from-primary-900 group-hover:to-secondary-900 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-dark-300">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <a href="/services" className="btn btn-outline btn-lg">
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}