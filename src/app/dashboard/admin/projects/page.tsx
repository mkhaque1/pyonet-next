'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProjectManagement from '@/components/dashboard/admin/ProjectManagement';

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
];

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
];

export default function ProjectsPage() {
  return (
    <DashboardLayout userType="admin">
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-1">Projects Management</h1>
          <p className="text-dark-400">Manage and track all your projects</p>
        </motion.div>
      </div>
      
      <ProjectManagement projects={projects} clients={clients} />
    </DashboardLayout>
  );
}