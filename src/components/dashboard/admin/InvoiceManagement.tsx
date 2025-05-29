import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus, FaEllipsisH, FaEdit, FaTrash, FaEye, FaFilter, FaFileInvoiceDollar, FaDownload } from 'react-icons/fa';

interface Invoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  status: string;
  issuedDate: string;
  dueDate: string;
}

interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  projects: number;
  totalSpent: number;
}

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  completion: number;
  startDate: string;
  endDate: string;
  budget: number;
}

interface InvoiceManagementProps {
  invoices: Invoice[];
  clients: Client[];
  projects: Project[];
}

export default function InvoiceManagement({ invoices, clients, projects }: InvoiceManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  
  // Filter invoices based on search query, status filter, and client filter
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesClient = clientFilter === 'all' || invoice.client === clientFilter;
    
    return matchesSearch && matchesStatus && matchesClient;
  });
  
  const toggleActionMenu = (invoiceId: string) => {
    if (showActionMenu === invoiceId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(invoiceId);
    }
  };
  
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
  
  // Get unique clients for the filter
  const uniqueClients = [...new Set(invoices.map(invoice => invoice.client))];
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Invoice Management</h2>
          
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
            
            <button className="btn btn-primary flex items-center">
              <FaPlus className="mr-2" />
              Create Invoice
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-input pl-10 pr-4 py-2 w-full md:w-40 rounded-lg text-sm appearance-none"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
          </div>
          
          <div className="relative">
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="glass-input pl-10 pr-4 py-2 w-full md:w-60 rounded-lg text-sm appearance-none"
            >
              <option value="all">All Clients</option>
              {uniqueClients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-dark-800">
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Due Date
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
                    {invoice.client}
                  </td>
                  <td className="py-4">
                    {invoice.project}
                  </td>
                  <td className="py-4 font-medium">
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() => toggleActionMenu(invoice.id)}
                        className="btn btn-sm btn-ghost"
                        aria-label="Actions"
                      >
                        <FaEllipsisH />
                      </button>
                      
                      {showActionMenu === invoice.id && (
                        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md glassmorphism-strong shadow-lg py-1">
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors">
                            <FaEye className="mr-3 text-dark-400" />
                            View Details
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors">
                            <FaEdit className="mr-3 text-dark-400" />
                            Edit Invoice
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors">
                            <FaDownload className="mr-3 text-dark-400" />
                            Download PDF
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors text-error-500">
                            <FaTrash className="mr-3" />
                            Delete Invoice
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}