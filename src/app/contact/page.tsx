'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
 FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheck,
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
} from 'react-icons/fa';

// Define the form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });
  
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form data:', data);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully!');
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background design elements */}
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
                Get in <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-lg text-dark-300 mb-8">
                Have a question or ready to start your next project? Reach out to us and our team will get back to you as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Contact section */}
        <section className="py-8 md:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass-card p-8 md:p-10 h-full">
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-8"
                    >
                      <div className="w-16 h-16 bg-success-500/20 rounded-full flex items-center justify-center mb-4">
                        <FaCheck className="text-success-500 text-2xl" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-dark-300 text-center mb-4">
                        Thank you for contacting us. We'll get back to you shortly.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="btn btn-primary"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            id="name"
                            type="text"
                            {...register('name')}
                            className={`glass-input w-full px-4 py-2 ${errors.name ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                            placeholder="John Doe"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-error-500">{errors.name.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className={`glass-input w-full px-4 py-2 ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                            placeholder="john@example.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-error-500">{errors.email.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="text"
                            {...register('phone')}
                            className="glass-input w-full px-4 py-2"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2">
                            Company
                          </label>
                          <input
                            id="company"
                            type="text"
                            {...register('company')}
                            className="glass-input w-full px-4 py-2"
                            placeholder="Your Company Ltd."
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <input
                          id="subject"
                          type="text"
                          {...register('subject')}
                          className={`glass-input w-full px-4 py-2 ${errors.subject ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                          placeholder="How can we help you?"
                        />
                        {errors.subject && (
                          <p className="mt-1 text-sm text-error-500">{errors.subject.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          {...register('message')}
                          rows={5}
                          className={`glass-input w-full px-4 py-2 ${errors.message ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                          placeholder="Tell us about your project or inquiry..."
                        ></textarea>
                        {errors.message && (
                          <p className="mt-1 text-sm text-error-500">{errors.message.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary w-full py-3"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                              Sending...
                            </span>
                          ) : (
                            'Send Message'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-card p-8 md:p-10 h-full">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                        <FaMapMarkerAlt className="text-primary-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Our Location</h3>
                        <p className="text-dark-300">
                          123 Innovation Drive<br />
                          San Francisco, CA 94107<br />
                          United States
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-secondary-900/30 rounded-lg flex items-center justify-center mr-4">
                        <FaPhone className="text-secondary-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Phone Number</h3>
                        <p className="text-dark-300">
                          Main: +1 (555) 123-4567<br />
                          Support: +1 (555) 987-6543
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-accent-900/30 rounded-lg flex items-center justify-center mr-4">
                        <FaEnvelope className="text-accent-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Email Address</h3>
                        <p className="text-dark-300">
                          General: info@pyonet.com<br />
                          Support: support@pyonet.com<br />
                          Sales: sales@pyonet.com
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                    <ul className="space-y-2 text-dark-300">
                      <li className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary-900/50 transition-colors"
                        aria-label="Twitter"
                      >
                        <FaTwitter className="text-primary-400" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary-900/50 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedinIn className="text-primary-400" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary-900/50 transition-colors"
                        aria-label="GitHub"
                      >
                        <FaGithub className="text-primary-400" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Map section */}
        <section className="py-8 md:py-16">
          <div className="container-custom">
            <div className="glass-card p-1 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.7203969673103!2d-122.39953082356964!3d37.78178901259043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807abad77c31%3A0x3f10590e3a9c25c0!2sFinancial%20District%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1710184338861!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pyonet Location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}