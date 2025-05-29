'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminOverview from '@/components/dashboard/admin/AdminOverview';
import ClientManagement from '@/components/dashboard/admin/ClientManagement';
import ProjectManagement from '@/components/dashboard/admin/ProjectManagement';
import InvoiceManagement from '@/components/dashboard/admin/InvoiceManagement';
import { FaUsers, FaProjectDiagram, FaFileInvoiceDollar, FaPlusCircle } from 'react-icons/fa';

// Mock data
const clients = [
  {
    id: 1,
    name: 'John Doe',
    company: 'ABC Technologies',
    email: 'john@abctech.com',
    phone: '+1 (555) 123-4567',
    projects: 3,
    totalSpent: 8500,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'Johnson & Co',
    email: 'sarah@johnsonco.com',
    phone: '+1 (555) 987-6543',
    projects: 2,
    totalSpent: 12000,
  },
  {
    id: 3,
    name: 'Michael Chang',
    company: 'Chang Enterprises',
    email: 'michael@changent.com',
    phone: '+1 (555) 456-7890',
    projects: 1,
    totalSpent: 5000,
  },
  {
    id: 4,
    name: 'Emily Wilson',
    company: 'Wilson Solutions',
    email: 'emily@wilsonsolutions.com',
    phone: '+1 (555) 789-0123',
    projects: 4,
    totalSpent: 15000,
  },
];

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    client: 'ABC Technologies',
    status: 'In Progress',
    completion: 65,
    startDate: '2025-01-10',
    endDate: '2025-03-20',
    budget: 7500,
  },
  {
    id: 2,
    name: 'Mobile App Development',
    client: 'Johnson & Co',
    status: 'In Progress',
    completion: 40,
    startDate: '2025-01-15',
    endDate: '2025-04-30',
    budget: 12000,
  },
  {
    id: 3,
    name: 'E-commerce Platform',
    client: 'ABC Technologies',
    status: 'On Hold',
    completion: 85,
    startDate: '2024-11-05',
    endDate: '2025-02-28',
    budget: 9000,
  },
  {
    id: 4,
    name: 'SEO Optimization',
    client: 'Wilson Solutions',
    status: 'Not Started',
    completion: 0,
    startDate: '2025-03-01',
    endDate: '2025-04-15',
    budget: 3500,
  },
  {
    id: 5,
    name: 'Marketing Campaign',
    client: 'Wilson Solutions',
    status: 'In Progress',
    completion: 25,
    startDate: '2025-02-15',
    endDate: '2025-05-10',
    budget: 5000,
  },
  {
    id: 6,
    name: 'Custom CRM Integration',
    client: 'Chang Enterprises',
    status: 'In Progress',
    completion: 30,
    startDate: '2025-02-01',
    endDate: '2025-04-15',
    budget: 8000,
  },
];

const invoices = [
  {
    id: 'INV-2025-001',
    client: 'ABC Technologies',
    project: 'Website Redesign',
    amount: 2500,
    status: 'paid',
    issuedDate: '2025-01-01',
    dueDate: '2025-01-15',
  },
  {
    id: 'INV-2025-002',
    client: 'Johnson & Co',
    project: 'Mobile App Development',
    amount: 4000,
    status: 'pending',
    issuedDate: '2025-01-15',
    dueDate: '2025-01-30',
  },
  {
    id: 'INV-2025-003',
    client: 'ABC Technologies',
    project: 'Website Redesign',
    amount: 2500,
    status: 'overdue',
    issuedDate: '2025-01-10',
    dueDate: '2025-01-25',
  },
  {
    id: 'INV-2025-004',
    client: 'Wilson Solutions',
    project: 'SEO Optimization',
    amount: 1500,
    status: 'draft',
    issuedDate: '2025-02-01',
    dueDate: '2025-02-15',
  },
  {
    id: 'INV-2025-005',
    client: 'Johnson & Co',
    project: 'Mobile App Development',
    amount: 3000,
    status: 'paid',
    issuedDate: '2025-02-05',
    dueDate: '2025-02-20',
  },
  {
    id: 'INV-2025-006',
    client: 'Chang Enterprises',
    project: 'Custom CRM Integration',
    amount: 3500,
    status: 'pending',
    issuedDate: '2025-02-10',
    dueDate: '2025-02-25',
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview clients={clients} projects={projects} invoices={invoices} />;
      case 'clients':
        return <ClientManagement clients={clients} />;
      case 'projects':
        return <ProjectManagement projects={projects} clients={clients} />;
      case 'invoices':
        return <InvoiceManagement invoices={invoices} clients={clients} projects={projects} />;
      default:
        return <AdminOverview clients={clients} projects={projects} invoices={invoices} />;
    }
  };
  
  return (
    <DashboardLayout userType="admin">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-dark-400">Welcome back, Admin</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0 flex items-center gap-3"
          >
            <button className="btn btn-outline">
              Export Data
            </button>
            <button className="btn btn-primary flex items-center">
              <FaPlusCircle className="mr-2" />
              Create New
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
            onClick={() => setActiveTab('clients')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'clients'
                ? 'bg-primary-500 text-white'
                : 'glass-card hover:bg-dark-800/50'
            }`}
          >
            <FaUsers className="mr-2" />
            <span>Clients</span>
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