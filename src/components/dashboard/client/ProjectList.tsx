import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaProjectDiagram, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface Project {
  id: number;
  name: string;
  status: string;
  completion: number;
  startDate: string;
  endDate: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter projects based on search query and status filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
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
  
  // Function to calculate days remaining
  const calculateDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          
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
            
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="glass-input pl-10 pr-4 py-2 w-full sm:w-40 rounded-lg text-sm appearance-none"
              >
                <option value="all">All Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
                <option value="Not Started">Not Started</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            </div>
          </div>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <FaProjectDiagram className="text-primary-400 mr-2" />
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(project.status)}`}>
                        {project.status}
                      </span>
                      
                      <div className="flex items-center text-xs text-dark-400">
                        <FaCalendarAlt className="mr-1" />
                        <span>
                          {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {project.status !== 'Completed' && (
                        <div className="flex items-center text-xs text-dark-400">
                          <FaClock className="mr-1" />
                          <span>
                            {calculateDaysRemaining(project.endDate)} days remaining
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.completion}%</span>
                    </div>
                    <div className="w-full bg-dark-800 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" 
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaProjectDiagram className="text-4xl text-dark-600 mx-auto mb-3" />
            <p className="text-dark-400">No projects match your search criteria.</p>
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