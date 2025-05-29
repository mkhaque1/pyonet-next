'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientOverview from '@/components/dashboard/client/ClientOverview';
import InvoiceList from '@/components/dashboard/client/InvoiceList';
import ProjectList from '@/components/dashboard/client/ProjectList';
import ClientProfile from '@/components/dashboard/client/ClientProfile';
import { FaFileInvoiceDollar, FaProjectDiagram, FaUserCircle } from 'react-icons/fa';

// Mock data
const invoices = [
  {
    id: 'INV-2025-001',
    amount: 2500,
    status: 'paid',
    dueDate: '2025-01-15',
    project: 'Website Redesign',
  },
  {
    id: 'INV-2025-002',
    amount: 1800,
    status: 'pending',
    dueDate: '2025-02-28',
    project: 'Mobile App Development',
  },
  {
    id: 'INV-2025-003',
    amount: 3200,
    status: 'overdue',
    dueDate: '2025-01-30',
    project: 'E-commerce Platform',
  },
  {
    id: 'INV-2025-004',
    amount: 950,
    status: 'draft',
    dueDate: '2025-03-15',
    project: 'SEO Optimization',
  },
];

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    status: 'In Progress',
    completion: 65,
    startDate: '2025-01-10',
    endDate: '2025-03-20',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    status: 'In Progress',
    completion: 40,
    startDate: '2025-01-15',
    endDate: '2025-04-30',
  },
  {
    id: 3,
    name: 'E-commerce Platform',
    status: 'On Hold',
    completion: 85,
    startDate: '2024-11-05',
    endDate: '2025-02-28',
  },
  {
    id: 4,
    name: 'SEO Optimization',
    status: 'Not Started',
    completion: 0,
    startDate: '2025-03-01',
    endDate: '2025-04-15',
  },
];

const clientData = {
  name: 'John Doe',
  company: 'ABC Technologies',
  email: 'john@abctech.com',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Avenue, San Francisco, CA 94107',
  joinDate: '2024-09-15',
};

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ClientOverview invoices={invoices} projects={projects} />;
      case 'invoices':
        return <InvoiceList invoices={invoices} />;
      case 'projects':
        return <ProjectList projects={projects} />;
      case 'profile':
        return <ClientProfile clientData={clientData} />;
      default:
        return <ClientOverview invoices={invoices} projects={projects} />;
    }
  };
  
  return (
    <DashboardLayout userType="client">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-1">Client Dashboard</h1>
            <p className="text-dark-400">Welcome back, {clientData.name}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <button className="btn btn-primary">
              Download Reports
            </button>
          </motion.div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'overview'
                ? 'bg-primary-500 text-white'
                : 'glass-card hover:bg-dark-800/50'
            }`}
          >
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'invoices'
                ? 'bg-primary-500 text-white'
                : 'glass-card hover:bg-dark-800/50'
            }`}
          >
            <FaFileInvoiceDollar className="mr-2" />
            <span>Invoices</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'projects'
                ? 'bg-primary-500 text-white'
                : 'glass-card hover:bg-dark-800/50'
            }`}
          >
            <FaProjectDiagram className="mr-2" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'profile'
                ? 'bg-primary-500 text-white'
                : 'glass-card hover:bg-dark-800/50'
            }`}
          >
            <FaUserCircle className="mr-2" />
            <span>Profile</span>
          </button>
        </div>
      </div>
      
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </DashboardLayout>
  );
}