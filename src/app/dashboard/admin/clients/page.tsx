'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientManagement from '@/components/dashboard/admin/ClientManagement';

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

export default function ClientsPage() {
  return (
    <DashboardLayout userType="admin">
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-1">Client Management</h1>
          <p className="text-dark-400">Manage your client relationships</p>
        </motion.div>
      </div>
      
      <ClientManagement clients={clients} />
    </DashboardLayout>
  );
}