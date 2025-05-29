import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaSearch, FaFilter, FaFileInvoiceDollar } from 'react-icons/fa';

interface Invoice {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  project: string;
}

interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter invoices based on search query and status filter
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Function to determine the status badge style
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success-500/20 text-success-400';
      case 'pending':
        return 'bg-warning-500/20 text-warning-400';
      case 'overdue':
        return 'bg-error-500/20 text-error-400';
      case 'draft':
        return 'bg-secondary-500/20 text-secondary-400';
      default:
        return 'bg-dark-700 text-dark-300';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Your Invoices</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-10 pr-4 py-2 w-full sm:w-60 rounded-lg text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            </div>
            
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="glass-input pl-10 pr-4 py-2 w-full sm:w-40 rounded-lg text-sm appearance-none"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            </div>
          </div>
        </div>
        
        {filteredInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 text-right text-xs font-medium text-dark-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`${index !== filteredInvoices.length - 1 ? 'border-b border-dark-800' : ''}`}
                  >
                    <td className="py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaFileInvoiceDollar className="text-primary-400 mr-2" />
                        <span className="font-medium">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      {invoice.project}
                    </td>
                    <td className="py-4 font-medium">
                      ${invoice.amount.toLocaleString()}
                    </td>
                    <td className="py-4">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="btn btn-sm btn-ghost text-primary-400">
                        <FaDownload className="mr-1" />
                        Download
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <FaFileInvoiceDollar className="text-4xl text-dark-600 mx-auto mb-3" />
            <p className="text-dark-400">No invoices match your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="mt-3 btn btn-sm btn-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}