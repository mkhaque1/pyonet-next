import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus, FaEllipsisH, FaEdit, FaTrash, FaEye, FaFilter } from 'react-icons/fa';

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

interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  projects: number;
  totalSpent: number;
}

interface ProjectManagementProps {
  projects: Project[];
  clients: Client[];
}

export default function ProjectManagement({ projects, clients }: ProjectManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  
  // Filter projects based on search query, status filter, and client filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesClient = clientFilter === 'all' || project.client === clientFilter;
    
    return matchesSearch && matchesStatus && matchesClient;
  });
  
  const toggleActionMenu = (projectId: number) => {
    if (showActionMenu === projectId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(projectId);
    }
  };
  
  // Function to determine the status badge style
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-primary-500/20 text-primary-400';
      case 'Completed':
        return 'bg-success-500/20 text-success-400';
      case 'On Hold':
        return 'bg-warning-500/20 text-warning-400';
      case 'Not Started':
        return 'bg-secondary-500/20 text-secondary-400';
      default:
        return 'bg-dark-700 text-dark-300';
    }
  };
  
  // Get unique clients for the filter
  const uniqueClients = [...new Set(projects.map(project => project.client))];
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Project Management</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-10 pr-4 py-2 w-full sm:w-60 rounded-lg text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            </div>
            
            <button className="btn btn-primary flex items-center">
              <FaPlus className="mr-2" />
              Add Project
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
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Not Started">Not Started</option>
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
                  Project
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Budget
                </th>
                <th className="py-3 text-right text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`${index !== filteredProjects.length - 1 ? 'border-b border-dark-800' : ''}`}
                >
                  <td className="py-4">
                    <div className="font-medium">{project.name}</div>
                    <div className="mt-1 flex items-center">
                      <div className="w-full bg-dark-800 rounded-full h-1.5 mr-2">
                        <div 
                          className="h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" 
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-dark-400">{project.completion}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    {project.client}
                  </td>
                  <td className="py-4">
                    <div className="text-sm">
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 font-medium">
                    ${project.budget.toLocaleString()}
                  </td>
                  <td className="py-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() => toggleActionMenu(project.id)}
                        className="btn btn-sm btn-ghost"
                        aria-label="Actions"
                      >
                        <FaEllipsisH />
                      </button>
                      
                      {showActionMenu === project.id && (
                        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md glassmorphism-strong shadow-lg py-1">
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors">
                            <FaEye className="mr-3 text-dark-400" />
                            View Details
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors">
                            <FaEdit className="mr-3 text-dark-400" />
                            Edit Project
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-dark-800 transition-colors text-error-500">
                            <FaTrash className="mr-3" />
                            Delete Project
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