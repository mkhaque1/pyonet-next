import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus, FaEllipsisH, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  projects: number;
  totalSpent: number;
}

interface ClientManagementProps {
  clients: Client[];
}

export default function ClientManagement({ clients }: ClientManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  
  // Filter clients based on search query
  const filteredClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  const toggleActionMenu = (clientId: number) => {
    if (showActionMenu === clientId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(clientId);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Client Management</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-10 pr-4 py-2 w-full sm:w-60 rounded-lg text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            </div>
            
            <button className="btn btn-primary flex items-center">
              <FaPlus className="mr-2" />
              Add Client
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-dark-800">
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Projects
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="py-3 text-right text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`${index !== filteredClients.length - 1 ? 'border-b border-dark-800' : ''}`}
                >
                  <td className="py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-dark-700 flex items-center justify-center">
                        <span className="text-sm font-medium">{client.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-dark-400">{client.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm">{client.email}</div>
                    <div className="text-sm text-dark-400">{client.phone}</div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-500/20 text-primary-400">
                      {client.projects} projects
                    </span>
                  </td>
                  <td className="py-4 font-medium">
                    ${client.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() => toggleActionMenu(client.id)}
                        className="btn btn-sm btn-ghost"
                        aria-label="Actions"
                      >
                        <FaEllipsisH />
                      </button>
                      
                      {showActionMenu === client.id && (
                        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md glassmorphism-strong shadow-lg py-1">
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors">
                            <FaEye className="mr-3 text-dark-400" />
                            View Details
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors">
                            <FaEdit className="mr-3 text-dark-400" />
                            Edit Client
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors text-error-500">
                            <FaTrash className="mr-3" />
                            Delete Client
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