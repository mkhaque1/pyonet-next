'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'With over 15 years of experience in tech leadership, Sarah drives our vision and strategy.',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    id: 2,
    name: 'Michael Chang',
    role: 'CTO',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'A tech visionary with expertise in cloud architecture and scalable systems.',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Lead Designer',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Award-winning designer passionate about creating intuitive user experiences.',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Lead Developer',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Full-stack developer with a love for clean code and innovative solutions.',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  }
];

const stats = [
  { id: 1, value: '500+', label: 'Clients Worldwide' },
  { id: 2, value: '1000+', label: 'Projects Completed' },
  { id: 3, value: '50+', label: 'Team Members' },
  { id: 4, value: '15+', label: 'Years Experience' }
];

export default function AboutPage() {
  const [currentMember, setCurrentMember] = useState(0);
  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMember((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
                About <span className="gradient-text">Pyonet</span>
              </h1>
              <p className="text-lg text-dark-300">
                We're a team of passionate technologists dedicated to transforming businesses through innovative solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-dark-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section ref={timelineRef} className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-dark-700"></div>
              
              {[2010, 2015, 2020, 2025].map((year, index) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
                >
                  <div className={`w-5 h-5 rounded-full bg-primary-500 absolute left-1/2 transform -translate-x-1/2 z-10`}></div>
                  <div className={`glass-card p-6 max-w-lg ${index % 2 === 0 ? 'mr-auto pr-12' : 'ml-auto pl-12'}`}>
                    <div className="text-xl font-bold mb-2">{year}</div>
                    <p className="text-dark-300">
                      {index === 0 && 'Founded with a vision to transform digital landscapes'}
                      {index === 1 && 'Expanded globally with offices in 5 countries'}
                      {index === 2 && 'Launched innovative SaaS solutions'}
                      {index === 3 && 'Leading the future of technology solutions'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: `-${currentMember * 100}%` }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                {teamMembers.map((member) => (
                  <div key={member.id} className="w-full flex-shrink-0">
                    <div className="max-w-3xl mx-auto">
                      <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-48 h-48 rounded-full overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                          <p className="text-primary-400 mb-4">{member.role}</p>
                          <p className="text-dark-300 mb-6">{member.bio}</p>
                          
                          <div className="flex justify-center md:justify-start space-x-4">
                            <a href={member.social.linkedin} className="text-dark-400 hover:text-primary-400 transition-colors">
                              <FaLinkedinIn className="text-xl" />
                            </a>
                            <a href={member.social.github} className="text-dark-400 hover:text-primary-400 transition-colors">
                              <FaGithub className="text-xl" />
                            </a>
                            <a href={member.social.twitter} className="text-dark-400 hover:text-primary-400 transition-colors">
                              <FaTwitter className="text-xl" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
              
              <div className="flex justify-center mt-8 space-x-2">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMember(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentMember === index ? 'bg-primary-500' : 'bg-dark-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}