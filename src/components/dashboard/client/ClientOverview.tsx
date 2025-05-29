'use client';

import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { FaFileInvoiceDollar, FaProjectDiagram, FaExclamationTriangle } from 'react-icons/fa';

interface Invoice {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  project: string;
}

interface Project {
  id: number;
  name: string;
  status: string;
  completion: number;
  startDate: string;
  endDate: string;
}

interface ClientOverviewProps {
  invoices: Invoice[];
  projects: Project[];
}

export default function ClientOverview({ invoices, projects }: ClientOverviewProps) {
  // Calculate total invoices amount
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Calculate pending payment
  const pendingAmount = invoices
    .filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Count active projects
  const activeProjects = projects.filter(project => project.status === 'In Progress').length;
  
  // Data for payment status chart
  const paymentStatusData = [
    { name: 'Paid', value: invoices.filter(invoice => invoice.status === 'paid').length },
    { name: 'Pending', value: invoices.filter(invoice => invoice.status === 'pending').length },
    { name: 'Overdue', value: invoices.filter(invoice => invoice.status === 'overdue').length },
    { name: 'Draft', value: invoices.filter(invoice => invoice.status === 'draft').length },
  ];
  
  const COLORS = ['#00CC52', '#FFC300', '#FF0000', '#6600FF'];
  
  // Monthly spending data
  const monthlySpendingData = [
    { name: 'Jan', amount: 1200 },
    { name: 'Feb', amount: 1900 },
    { name: 'Mar', amount: 1500 },
    { name: 'Apr', amount: 2200 },
    { name: 'May', amount: 1800 },
    { name: 'Jun', amount: 2400 },
    { name: 'Jul', amount: 2100 },
    { name: 'Aug', amount: 1700 },
    { name: 'Sep', amount: 2300 },
    { name: 'Oct', amount: 2500 },
    { name: 'Nov', amount: 2700 },
    { name: 'Dec', amount: 3000 },
  ];
  
  // Project progress data
  const projectProgressData = projects.map(project => ({
    name: project.name,
    completion: project.completion,
  }));
  
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-dark-400 text-sm">Total Invoices</p>
              <h3 className="text-2xl font-semibold mt-1">${totalAmount.toLocaleString()}</h3>
              <p className="text-dark-400 text-sm mt-1">Lifetime spending</p>
            </div>
            <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center">
              <FaFileInvoiceDollar className="text-primary-400 text-xl" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-dark-400 text-sm">Pending Payment</p>
              <h3 className="text-2xl font-semibold mt-1">${pendingAmount.toLocaleString()}</h3>
              <p className="text-dark-400 text-sm mt-1">Across {invoices.filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue').length} invoices</p>
            </div>
            <div className="w-12 h-12 bg-warning-900/30 rounded-lg flex items-center justify-center">
              <FaExclamationTriangle className="text-warning-400 text-xl" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-dark-400 text-sm">Active Projects</p>
              <h3 className="text-2xl font-semibold mt-1">{activeProjects}</h3>
              <p className="text-dark-400 text-sm mt-1">Out of {projects.length} total projects</p>
            </div>
            <div className="w-12 h-12 bg-secondary-900/30 rounded-lg flex items-center justify-center">
              <FaProjectDiagram className="text-secondary-400 text-xl" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Monthly Spending</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlySpendingData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#383838" />
                <XAxis dataKey="name" stroke="#818181" />
                <YAxis stroke="#818181" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#383838' }}
                  formatter={(value) => [`$${value}`, 'Amount']}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#0066FF" 
                  strokeWidth={2}
                  dot={{ stroke: '#0066FF', strokeWidth: 2, fill: '#121212' }}
                  activeDot={{ r: 6, stroke: '#0066FF', strokeWidth: 2, fill: '#FFFFFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectProgressData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 50, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#383838" horizontal={false} />
                <XAxis type="number" stroke="#818181" domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#818181"
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#383838' }}
                  formatter={(value) => [`${value}%`, 'Completion']}
                />
                <Bar 
                  dataKey="completion" 
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                >
                  {projectProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.completion > 75 ? '#00FF66' : entry.completion > 50 ? '#00CCFF' : entry.completion > 25 ? '#FFC300' : '#6600FF'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Invoice status pie chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Invoice Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="h-64 col-span-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#383838' }}
                  formatter={(value, name) => [`${value} invoices`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <div className="space-y-4">
              {paymentStatusData.map((status, index) => (
                <div key={status.name} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{status.name}</span>
                      <span className="text-sm text-dark-400">{status.value} invoices</span>
                    </div>
                    <div className="w-full bg-dark-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${(status.value / invoices.length) * 100}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}